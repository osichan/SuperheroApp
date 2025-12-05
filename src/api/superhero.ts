import { apiRequest } from "./client";
import {
  SuperheroApiResponseSchema,
  SearchResponseSchema,
  Superhero,
  SearchResponse
} from "@models/superhero";

export const superheroApi = {
  getById: async (id: string): Promise<Superhero> => {
    return apiRequest({
      method: "GET",
      url: `/${id}`,
      schema: SuperheroApiResponseSchema,
      stripResponseField: true,
    });
  },

  search: async (query: string): Promise<SearchResponse> => {
    return apiRequest({
      method: "GET",
      url: `/search/${query}`,
      schema: SearchResponseSchema,
    });
  },
};
