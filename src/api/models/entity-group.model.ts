export interface EntityGroup {
    id: number;
    group_name: string;
    group_description: string;
    date_created: string;
    date_updated?: string;
    date_deleted?: string;
}

export interface CreateEntityGroup {
    group_name: string;
    group_description: string;
}

export interface UpdateEntityGroup {
    group_name?: string;
    group_description?: string;
} 