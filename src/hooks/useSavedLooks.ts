import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { 
  SavedLook, 
  CreateSavedLookInput, 
  UpdateSavedLookInput, 
  SavedLookFilter 
} from '@/types';

// Query keys
const SAVED_LOOKS_KEYS = {
  all: ['savedLooks'] as const,
  lists: () => [...SAVED_LOOKS_KEYS.all, 'list'] as const,
  list: (filters: SavedLookFilter) => [...SAVED_LOOKS_KEYS.lists(), filters] as const,
  details: () => [...SAVED_LOOKS_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...SAVED_LOOKS_KEYS.details(), id] as const,
};

// Fetch saved looks with filters
export function useSavedLooks(filters: SavedLookFilter = {}) {
  return useQuery({
    queryKey: SAVED_LOOKS_KEYS.list(filters),
    queryFn: async () => {
      const params = new URLSearchParams();
      
      if (filters.tags?.length) {
        params.append('tags', filters.tags.join(','));
      }
      if (filters.isPublic !== undefined) {
        params.append('isPublic', filters.isPublic.toString());
      }
      if (filters.dateRange) {
        params.append('startDate', filters.dateRange.start);
        params.append('endDate', filters.dateRange.end);
      }
      if (filters.availability) {
        params.append('availability', filters.availability);
      }
      if (filters.priceRange) {
        params.append('minPrice', filters.priceRange.min.toString());
        params.append('maxPrice', filters.priceRange.max.toString());
      }

      const queryString = params.toString();
      const endpoint = queryString ? `/saved-looks?${queryString}` : '/saved-looks';
      
      return api.get<SavedLook[]>(endpoint);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Fetch single saved look
export function useSavedLook(id: string) {
  return useQuery({
    queryKey: SAVED_LOOKS_KEYS.detail(id),
    queryFn: () => api.get<SavedLook>(`/saved-looks/${id}`),
    enabled: !!id,
  });
}

// Create saved look mutation
export function useCreateSavedLook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSavedLookInput) => 
      api.post<SavedLook>('/saved-looks', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SAVED_LOOKS_KEYS.all });
    },
  });
}

// Update saved look mutation
export function useUpdateSavedLook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateSavedLookInput }) =>
      api.put<SavedLook>(`/saved-looks/${id}`, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: SAVED_LOOKS_KEYS.all });
      queryClient.invalidateQueries({ queryKey: SAVED_LOOKS_KEYS.detail(id) });
    },
  });
}

// Delete saved look mutation
export function useDeleteSavedLook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.delete(`/saved-looks/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SAVED_LOOKS_KEYS.all });
    },
  });
}

// Get saved looks for dashboard (recent 6)
export function useDashboardSavedLooks() {
  return useQuery({
    queryKey: [...SAVED_LOOKS_KEYS.all, 'dashboard'],
    queryFn: () => api.get<SavedLook[]>('/saved-looks?limit=6&sort=createdAt:desc'),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}