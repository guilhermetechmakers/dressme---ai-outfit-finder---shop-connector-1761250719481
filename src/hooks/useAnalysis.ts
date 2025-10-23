import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import type { 
  Analysis, 
  CreateAnalysisInput, 
  UpdateAnalysisInput,
  AnalysisFilter,
  DetectedItem,
  UserFeedback
} from '@/types';

// Query keys
export const analysisKeys = {
  all: ['analyses'] as const,
  lists: () => [...analysisKeys.all, 'list'] as const,
  list: (filters: AnalysisFilter) => [...analysisKeys.lists(), { filters }] as const,
  details: () => [...analysisKeys.all, 'detail'] as const,
  detail: (id: string) => [...analysisKeys.details(), id] as const,
};

// Get all analyses
export const useAnalyses = (filters: AnalysisFilter = {}) => {
  return useQuery({
    queryKey: analysisKeys.list(filters),
    queryFn: () => api.get<Analysis[]>('/analyses', { params: filters }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Get analysis by ID
export const useAnalysis = (id: string) => {
  return useQuery({
    queryKey: analysisKeys.detail(id),
    queryFn: () => api.get<Analysis>(`/analyses/${id}`),
    enabled: !!id,
  });
};

// Create analysis mutation
export const useCreateAnalysis = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAnalysisInput) => 
      api.post<Analysis>('/analyses', data),
    onSuccess: (newAnalysis) => {
      // Invalidate and refetch analyses list
      queryClient.invalidateQueries({ queryKey: analysisKeys.lists() });
      
      // Add the new analysis to the cache
      queryClient.setQueryData(analysisKeys.detail(newAnalysis.id), newAnalysis);
      
      toast.success('Analysis started! We\'ll notify you when it\'s complete.');
    },
    onError: (error: any) => {
      toast.error(`Failed to start analysis: ${error.message}`);
    },
  });
};

// Update analysis mutation
export const useUpdateAnalysis = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: UpdateAnalysisInput }) =>
      api.put<Analysis>(`/analyses/${id}`, updates),
    onSuccess: (updatedAnalysis) => {
      // Update the analysis in the cache
      queryClient.setQueryData(analysisKeys.detail(updatedAnalysis.id), updatedAnalysis);
      
      // Invalidate analyses list to ensure consistency
      queryClient.invalidateQueries({ queryKey: analysisKeys.lists() });
      
      toast.success('Analysis updated successfully!');
    },
    onError: (error: any) => {
      toast.error(`Failed to update analysis: ${error.message}`);
    },
  });
};

// Delete analysis mutation
export const useDeleteAnalysis = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.delete(`/analyses/${id}`),
    onSuccess: (_, deletedId) => {
      // Remove the analysis from the cache
      queryClient.removeQueries({ queryKey: analysisKeys.detail(deletedId) });
      
      // Invalidate analyses list
      queryClient.invalidateQueries({ queryKey: analysisKeys.lists() });
      
      toast.success('Analysis deleted successfully!');
    },
    onError: (error: any) => {
      toast.error(`Failed to delete analysis: ${error.message}`);
    },
  });
};

// Update detected item mutation
export const useUpdateDetectedItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ 
      analysisId, 
      itemId, 
      updates 
    }: { 
      analysisId: string; 
      itemId: string; 
      updates: Partial<DetectedItem> 
    }) =>
      api.put<DetectedItem>(`/analyses/${analysisId}/items/${itemId}`, updates),
    onSuccess: (updatedItem, { analysisId }) => {
      // Update the analysis in the cache
      const analysis = queryClient.getQueryData<Analysis>(analysisKeys.detail(analysisId));
      if (analysis) {
        const updatedAnalysis = {
          ...analysis,
          detectedItems: analysis.detectedItems.map(item => 
            item.id === updatedItem.id ? updatedItem : item
          ),
        };
        queryClient.setQueryData(analysisKeys.detail(analysisId), updatedAnalysis);
      }
      
      toast.success('Item updated successfully!');
    },
    onError: (error: any) => {
      toast.error(`Failed to update item: ${error.message}`);
    },
  });
};

// Submit feedback mutation
export const useSubmitFeedback = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ 
      analysisId, 
      itemId, 
      feedback 
    }: { 
      analysisId: string; 
      itemId: string; 
      feedback: UserFeedback 
    }) =>
      api.post(`/analyses/${analysisId}/items/${itemId}/feedback`, feedback),
    onSuccess: (_, { analysisId }) => {
      // Invalidate the analysis to refetch with updated feedback
      queryClient.invalidateQueries({ queryKey: analysisKeys.detail(analysisId) });
      
      toast.success('Feedback submitted! Thank you for helping us improve.');
    },
    onError: (error: any) => {
      toast.error(`Failed to submit feedback: ${error.message}`);
    },
  });
};
