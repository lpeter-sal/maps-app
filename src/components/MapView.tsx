import { useContext, useLayoutEffect, useRef } from "react"
import { PlacesContext, MapContext } from "../context";
import { Loading } from "./Loading";
import { Map, Marker } from 'maplibre-gl';



export const MapView = () => {

  const { isLoading, userLocation } = useContext( PlacesContext );
  const { setMap } = useContext( MapContext)

  const mapDiv = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
      if ( !isLoading ) {
          const map = new Map({
              container: mapDiv.current! , // container ID
              style: 'https://api.maptiler.com/maps/basic-v2/style.json?key=MaZaAHOMUqlmSFZR2cS2', // style URL
              center: userLocation, // starting position [lng, lat]
              zoom: 14 // starting zoom
          });

          setMap( map );
      }
  }, [ isLoading ])


  if ( isLoading ) {
      return ( <Loading /> )
  }


  return (
    <div ref={ mapDiv }
        style={{
            height: '100vh',
            left: 0,
            position: 'fixed',
            top: 0,
            width: '100vw',
        }}
    >
    </div>
  )
}