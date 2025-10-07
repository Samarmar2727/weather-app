import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 result: "empty",
}

export const weatherApiSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    
     
  },
})

// Action creators are generated for each case reducer function
export const {} = weatherApiSlice.actions

export default weatherApiSlice.reducer