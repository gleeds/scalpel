export interface TableItem {
    name: string;
    service_name: string;
}

export interface Column {
    table_name:string;
    column_name:string;
    data_type:string;
    is_primary_key:boolean;
}

export interface Relationship {
    source_table:string;
    source_column: string;
    target_table: string;
    target_column: string;
}

export interface TableDetails {
    name: string;
    service_name: string;
    columns: Column[];
    one_to_many_relationships: Relationship[];
    many_to_one_relationships: Relationship[];
}
