import { Map } from "mapbox-gl";
import { createContext } from "react";


interface MapContextProps {
    isMapReady: boolean;
    map?: Map,



    //Methods
    setMap: (map: Map) => void;
    getRouteBetweenPoints: (start: [number, number], ends: [number, number]) => Promise<void>
}





export const MapContext = createContext<MapContextProps>({} as MapContextProps);