import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MapsApp } from './MapsApp';

//@ts-ignore
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
 
mapboxgl.accessToken = 'pk.eyJ1IjoibHBzYWx2YWRvcmgiLCJhIjoiY2xtdGl6czZpMDJ2NzJqcXduNXR4MzhkbyJ9.OcJdlRhvQP8LaP9Sf1RsIQ';

if( !navigator.geolocation ) {
    alert('Geolocation is not available');
    throw new Error('Geolocation is not available');
}


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MapsApp />
  </StrictMode>,
)
