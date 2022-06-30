import { configureStore } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import _ from 'lodash'
     
const difficultReducer = createSlice({
    name: 'difficult',
    initialState: {
      value: 3,
    },
    reducers: {
      setBy: (state, action) => {
        state.value = _.clamp(action.payload, 1, 5)
      },
    },
  })
  
export const { setBy } = difficultReducer.actions

export default configureStore({
    reducer: {
        difficult: difficultReducer.reducer,
    },
})