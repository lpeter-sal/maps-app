import { JSX, useReducer } from "react";
import { Map, Marker, Popup } from "maplibre-gl";
import { mapReducer } from "./mapReducer";
import { MapContext } from "./MapContext";



export interface MapState {
    isMapReady: boolean;
    map?: Map
}

const INITIAL_STATE: MapState = {
    isMapReady: false,
    map: undefined
}


interface Props {
    children: JSX.Element | JSX.Element[];
}



export const MapProvider = ( {children }: Props ) => {

    const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);


    const setMap = ( map: Map ) => {

        const myLocationPopup = new Popup()
            .setHTML(`
            <h4> I'm Here </h4>
            <p>Some place in the world</p>
        `);

        new Marker({
            color: '#61DAFB'
        })
        .setLngLat( map.getCenter() )
        .setPopup( myLocationPopup )
        .addTo( map );


        dispatch({ type: 'setMap', payload: map })

    }

  return (
    <MapContext.Provider value={{
        ...state,

        //Methods
        setMap,
    }}>
        { children }
    </MapContext.Provider>
  )
}
