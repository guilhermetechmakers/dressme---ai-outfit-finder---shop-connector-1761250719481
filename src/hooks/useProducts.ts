import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import type { 
  Product, 
  ProductMatch, 
  ProductFilter,
  AddToCartInput 
} from '@/types';

// Query keys
export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (filters: ProductFilter) => [...productKeys.lists(), { filters }] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
  matches: (itemId: string) => [...productKeys.all, 'matches', itemId] as const,
};

// Get products with filters
export const useProducts = (filters: ProductFilter = {}) => {
  return useQuery({
    queryKey: productKeys.list(filters),
    queryFn: () => api.get<Product[]>('/products', { params: filters }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Get product by ID
export const useProduct = (id: string) => {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => api.get<Product>(`/products/${id}`),
    enabled: !!id,
  });
};

// Get product matches for a detected item
export const useProductMatches = (itemId: string) => {
  return useQuery({
    queryKey: productKeys.matches(itemId),
    queryFn: () => api.get<ProductMatch[]>(`/products/matches/${itemId}`),
    enabled: !!itemId,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

// Add to cart mutation
export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AddToCartInput) => 
      api.post('/cart/items', data),
    onSuccess: () => {
      // Invalidate cart queries
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      
      toast.success('Added to cart!');
    },
    onError: (error: any) => {
      toast.error(`Failed to add to cart: ${error.message}`);
    },
  });
};

// Search products
export const useSearchProducts = (query: string, filters: ProductFilter = {}) => {
  return useQuery({
    queryKey: [...productKeys.lists(), 'search', query, filters],
    queryFn: () => api.get<Product[]>(`/products/search?q=${encodeURIComponent(query)}`, { params: filters }),
    enabled: !!query && query.length > 2,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};
