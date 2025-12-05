import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { z } from "zod";

const ACCESS_TOKEN = process.env.EXPO_PUBLIC_ACCESS_TOKEN;
const BASE_URL = "https://superheroapi.com/api";

export const apiClient = axios.create({
  baseURL: `${BASE_URL}/${ACCESS_TOKEN}`,
  headers: {
    "Content-Type": "application/json",
  },
});
interface ApiRequestConfig<T> extends AxiosRequestConfig {
  schema: z.ZodSchema<T>;
  stripResponseField?: boolean;
}

export async function apiRequest<T>(config: ApiRequestConfig<T>): Promise<T> {
  try {
    const response: AxiosResponse = await apiClient.request(config);

    const validationResult = config.schema.safeParse(response.data);

    if (!validationResult.success) {
      console.error("Validation error:", validationResult.error);
      throw new Error("Validation failed");
    }

    let data = validationResult.data;

    if (
      config.stripResponseField &&
      typeof data === "object" &&
      data !== null &&
      "response" in data
    ) {
      const { response: _, ...rest } = data as any;
      data = rest as T;
    }

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("API error:", error.message);
    }
    throw error;
  }
}
