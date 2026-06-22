import { PublicAxiosInstance, PrivateAxiosInstance } from "@/utils/axios";

export async function getAllFoods(): Promise<FoodResponse[]> {
  const { data } = await PublicAxiosInstance.get<ApiResponse<FoodResponse[]>>('foods');
  return data.data
}

export async function getFoodsByCategory(category: string): Promise<FoodResponse[]> {
  const { data } = await PublicAxiosInstance.get<ApiResponse<FoodResponse[]>>(`foods/category/${category}`);
  return data.data;
}

export async function getCategories(): Promise<string[]> {
  const { data } = await PublicAxiosInstance.get<ApiResponse<string[]>>(`foods/categories`);
  return data.data;
}

export async function searchFood(q: string): Promise<FoodResponse[]> {
  const { data } = await PublicAxiosInstance.get<ApiResponse<FoodResponse[]>>(`foods/search?q=${q}`);
  return data.data;
}

export async function predictFoodPrice(body: PredictFoodSchema): Promise<PredictFoodPriceResponse> {
  const { data } = await PublicAxiosInstance.post<ApiResponse<PredictFoodPriceResponse>>(`predict`, body);
  return data.data;
}

export async function recordCommodityClick(id: string): Promise<void> {
  await PublicAxiosInstance.post(`foods/${id}/click`);
}

export async function logHelpfulnessFeedback(id: string, useful: boolean): Promise<void> {
  await PublicAxiosInstance.post(`foods/${id}/feedback`, { useful });
}

export async function getAdminStats(): Promise<AdminStatsResponse> {
  const { data } = await PrivateAxiosInstance.get<ApiResponse<AdminStatsResponse>>('admin/stats');
  return data.data;
}

export async function submitSuggestion(message: string, sentiment?: string): Promise<void> {
  await PublicAxiosInstance.post('foods/suggestions', { message, sentiment });
}