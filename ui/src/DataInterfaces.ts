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

export interface ServiceItem {
    name: string;
    color: string;
}

export enum DraggedDataType{Service, Table}

export interface DraggedData {
    type: DraggedDataType;
    service: ServiceItem;
    table: TableItem;
}

export type ScalpelContextType = {
    services: ServiceItem[];
    addService: (service: ServiceItem) => void;
    setServices: (services: ServiceItem[]) => void;
    addServiceModalOpen: boolean;
    updateAddServiceModalOpen: (open: boolean) => void;
    findService: (serviceName: string) => ServiceItem | undefined;
    // setSchemaFlowDropHandler: (callback:()=>void) => void;
    // invokeSchemaFlowDropHandler: () => void;

}
