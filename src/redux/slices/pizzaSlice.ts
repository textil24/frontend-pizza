import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

interface IFetchPizzas {
    currentPage: number
    sortBy: string
    order: string
    category: string
    search: string
}

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchByIdStatus',
    async (params: IFetchPizzas, thunkApi) => {
        const {currentPage, sortBy, order, category, search} = params
        const {data} = await axios.get(`https://63e4aefa4474903105ef68c6.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)

        return data
    }
)

interface IPizza {
    items: any[]
    status: 'loading' | 'success' | 'error'
}

const initialState: IPizza = {
    items: [],
    status: 'loading'
}

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state) => {
            state.status = 'loading'
            state.items = []
        })
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            console.log(action, 'fulfiled')
            state.items = action.payload
            state.status = 'success'
        })
        builder.addCase(fetchPizzas.rejected, (state, action) => {
            console.log(action, 'rejected')
            state.status = 'error'
            state.items = []
        })
    }
})

export const {setItems} = pizzaSlice.actions

export default pizzaSlice.reducer
