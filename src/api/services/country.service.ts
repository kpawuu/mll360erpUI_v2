import feathersClient from "../feathers.ts";
import type { Country } from "../models/country.model.ts";

export const countriesService = feathersClient.service('countries') as {
    find(): Promise<Country[]>;
    get(id: string): Promise<Country>;
    create(data: Partial<Country>): Promise<Country>;
    update(id: string, data: Country): Promise<Country>;
    patch(id: string, data: Partial<Country>): Promise<Country>;
    remove(id: string): Promise<Country>;
}