import {createSlice} from "@reduxjs/toolkit";

interface IFilterSort {
    name: string
    sortProperty: string
}

interface IFilter {
    categoryId: number
    currentPage: number
    sort: IFilterSort
}

const initialState: IFilter = {
    categoryId: 0,
    currentPage: 1,
    sort: {
        name: 'популярности',
        sortProperty: 'rating'
    }
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId(state, action) {
            state.categoryId = action.payload
        },
        setSortType(state, action) {
            state.sort = action.payload
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload
        },
        setFilters(state, action) {
            state.sort = action.payload.sort
            state.currentPage = Number(action.payload.currentPage)
            state.categoryId = Number(action.payload.categoryId)
        }
    }
})

export const { setCategoryId, setSortType, setCurrentPage, setFilters } = filterSlice.actions

export default filterSlice.reducer
