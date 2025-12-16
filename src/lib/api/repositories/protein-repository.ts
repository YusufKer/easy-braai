import { API_URL } from "@/config/env";
import { authenticatedFetch } from "@/lib/api/client";
import type { ApiResponse, MeatOptions } from "@/lib/api/types";

export class ProteinRepository {
  async get(): Promise<MeatOptions> {
    const response = await authenticatedFetch(`${API_URL}/protein/complete`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch proteins");
    }

    const result: ApiResponse<MeatOptions> = await response.json();

    if (!result.success) {
      throw new Error(result.message);
    }

    return result.data;
  }
}

export const proteinRepository = new ProteinRepository();
