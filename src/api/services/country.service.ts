import feathersClient from "../feathers.ts";
import type { Country } from "../models/country.model.ts";

export const countryService = feathersClient.service('country') as {
    find(params?: any): Promise<Country[] | { data: Country[]; total: number }>;
    get(id: number): Promise<Country>;
    create(data: Partial<Country>): Promise<Country>;
    update(id: number, data: Country): Promise<Country>;
    patch(id: number, data: Partial<Country>): Promise<Country>;
    remove(id: number): Promise<Country>;
}