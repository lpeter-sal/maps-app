import axios from "axios";



const searchApi = axios.create({
    baseURL: 'https://api.mapbox.com/search/geocode/v6/forward?q=',
    params:{
        limit: 5,
        language: 'en',
        access_token: 'pk.eyJ1IjoibHBzYWx2YWRvcmgiLCJhIjoiY2xtdGl6czZpMDJ2NzJqcXduNXR4MzhkbyJ9.OcJdlRhvQP8LaP9Sf1RsIQ'
    }    
})





export default searchApi;