import { DrinkModel } from "./drink.model";

export interface DrinkAPIResponse {
  status: number;
  results: DrinkModel[];
  resultsLength: number;
}
