import { PublicAxiosInstance } from "@/utils/axios";

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