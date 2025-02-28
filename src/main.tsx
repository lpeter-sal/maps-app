import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MapsApp } from './MapsApp';


if( !navigator.geolocation ) {
    alert('Geolocation is not available');
    throw new Error('Geolocation is not available');
}


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MapsApp />
  </StrictMode>,
)
