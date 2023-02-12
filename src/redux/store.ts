import {combineReducers, configureStore} from '@reduxjs/toolkit'
import filterSlice from "./slices/filterSlice";
import cartSlice from "./slices/cartSlice";

const rootReducer = combineReducers({
    filter: filterSlice,
    cart: cartSlice
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']