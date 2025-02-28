import axios from "axios";



const directionsApi = axios.create({
    baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving/',
    params:{
        alternatives: false,
        geometries: 'geojson',
        overview: 'simplified',
        steps: false,
        access_token: 'pk.eyJ1IjoibHBzYWx2YWRvcmgiLCJhIjoiY2xtdGl6czZpMDJ2NzJqcXduNXR4MzhkbyJ9.OcJdlRhvQP8LaP9Sf1RsIQ'
    }    
})





export default directionsApi;