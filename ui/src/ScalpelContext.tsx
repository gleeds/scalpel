import React,{ createContext } from "react";
import { ScalpelContextType, ServiceItem } from "./DataInterfaces";

export const ScalpelContext = createContext<ScalpelContextType>({
    services: [],
    addService: (service: ServiceItem) => {},
    setServices: (services: ServiceItem[]) => {},
    updateAddServiceModalOpen: (open: boolean) => {},
    addServiceModalOpen: false,
    findService: (serviceName: string) => {return undefined;}
});

type ScalpelProviderProps ={
    children: React.ReactNode;
}


export const ScalpelProvider: React.FC<ScalpelProviderProps> = ({ children }) => {
    const [services, setAllServices] = React.useState<ServiceItem[]>([]);
    const [addServiceModalOpen, setAddServiceModalOpen] = React.useState(false);
    // const [schemaFlowDropHandler, setInternalSchemaFlowDropHandler] = React.useState(()=>{});

    const addService = (service: ServiceItem) => {
        setAllServices([...services, service]);
    }

    const setServices = (services: ServiceItem[]) => {
        setAllServices(services);
    }

    const updateAddServiceModalOpen = (open: boolean) => {
        setAddServiceModalOpen(open);
    }

    const findService = (serviceName: string) => {
        return services.find(service => service.name === serviceName);
    }


    return <ScalpelContext.Provider value={{ services, addService, setServices,addServiceModalOpen,updateAddServiceModalOpen,findService }}>{children}</ScalpelContext.Provider>;
};
