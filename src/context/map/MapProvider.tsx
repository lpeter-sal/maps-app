import { JSX, useContext, useEffect, useReducer } from "react";
import { LngLatBounds, Map, Marker, Popup, SourceSpecification } from "mapbox-gl";
import { mapReducer } from "./mapReducer";
import { MapContext } from "./MapContext";
import { PlacesContext } from "../";
import { directionsApi } from "../../apis";
import { DirectionsResponse } from '../../interfaces/directions';



export interface MapState {
    isMapReady: boolean;
    map?: Map,
    markers: Marker[]
}

const INITIAL_STATE: MapState = {
    isMapReady: false,
    map: undefined,
    markers: []
}


interface Props {
    children: JSX.Element | JSX.Element[];
}



export const MapProvider = ( {children }: Props ) => {

    const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);
    const { places } = useContext(PlacesContext);

    useEffect(() => {
        state.markers.forEach( marker => marker.remove() );
        const newMarkers: Marker[] = [];

        for (const place of places) {
            const [ lng, lat ] = place.geometry.coordinates;
            const popup = new Popup()
                .setHTML(`
                    <h4> ${ place.properties.name } </h4>
                    <p> ${ place.properties.name_preferred } </p>
                `)

            const newMarker = new Marker()
                                .setPopup( popup )
                                .setLngLat([ lng, lat ])
                                .addTo( state.map! );
            newMarkers.push( newMarker );
        }
        //TODO: clean polyline
        // I need to clean the polyline when the places change or place is void
        if( state.map?.getLayer('RouteLayer') && places.length === 0 ) {
            state.map?.removeLayer('RouteLayer');
            state.map?.removeSource('RouteString');
        }


        dispatch({ type: 'setMarkers', payload: newMarkers });
    }, [ places ])

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


    const getRouteBetweenPoints = async (start: [number, number ], ends: [number, number]) => {

        const resp = await directionsApi.get<DirectionsResponse>(`${start.join(',')};${ends.join(',')}`);
        const { distance, duration, geometry} = resp.data.routes[0];
        const { coordinates: coords } = geometry;
        let kms = distance / 1000;
            kms = Math.round(kms * 100);
            kms /= 100;

        let minutes =Math.floor( duration / 60)
        
        console.log({ kms, minutes });

        const bounds = new LngLatBounds(
            start,
            start
        );

        for (const coord of coords) {
            const newCoord: [number, number] = [ coord[0], coord[1] ];
            bounds.extend( newCoord );
        }

        state.map?.fitBounds(bounds, {
            padding: 100
        });

        // Polyline
        const sourceData: SourceSpecification = {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [{
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'LineString',
                        coordinates: coords
                    }
                }]
            }
        }

        if(state.map?.getLayer('RouteLayer')) {
            state.map?.removeLayer('RouteLayer');
            state.map?.removeSource('RouteString');
        }


        state.map?.addSource('RouteString', sourceData);
        state.map?.addLayer({
            id: 'RouteLayer',
            type: 'line',
            source: 'RouteString',
            layout: {
                'line-join': 'round',
                'line-cap': 'round'
            },
            paint: {
                'line-color': '#61DAFB',
                'line-width': 3
            }
        });
    }

  return (
    <MapContext.Provider value={{
        ...state,

        //Methods
        setMap,
        getRouteBetweenPoints
    }}>
        { children }
    </MapContext.Provider>
  )
}
