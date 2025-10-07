import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const weatherApi = createApi({
  reducerPath: 'weatherApi', 
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.openweathermap.org/data/2.5/',
  }),
  endpoints: (builder) => ({
    getWeather: builder.query({
  
      query: () =>
        `weather?lat=30.044420&lon=31.235712&appid=2605a582f805a3f5d0d757c43e065b16`,
    }),
  }),
});

export const { useGetWeatherQuery } = weatherApi;
