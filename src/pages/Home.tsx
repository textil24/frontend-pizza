import React, {useEffect, useRef, useState} from 'react';
import {Categories} from "../components/Categories";
import {Sort, sortList} from "../components/Sort";
import {Skeleton} from "../components/PizzaBlock/Skeleton";
import {PizzaBlock} from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import {useAppDispatch, useAppSelector} from "../redux/hooks/reduxHooks";
import {setCategoryId, setCurrentPage, setFilters} from "../redux/slices/filterSlice";
import axios from "axios";
import qs from 'qs';
import {useNavigate} from "react-router-dom";
import {fetchPizzas, setItems} from "../redux/slices/pizzaSlice";

interface IPizza {
    id: number
    imageUrl: string
    name: string
    types: number[]
    sizes: number[]
    price: number
    category: number
    rating: number
}

const Home = ({searchValue}: { searchValue: string }) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const isSearch = useRef(false)
    const isMounted = useRef(false)

    const {categoryId, sort, currentPage} = useAppSelector(state => state.filter)
    const {items, status} = useAppSelector(state => state.pizza)

    const getPizzas = async () => {

        const sortBy = sort.sortProperty.replace('-', '')
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const search = searchValue ? `&search=${searchValue}` : ''

        dispatch(
            fetchPizzas({
                currentPage,
                sortBy,
                order,
                category,
                search
            })
        )

    }

    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))

            const sort = sortList.find(obj => obj.sortProperty === params.sortProperty)

            dispatch(
                setFilters({
                    ...params,
                    sort
                })
            )
            isSearch.current = true
        }
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0)

        if (!isSearch.current) {
            console.log('Отработал')
            getPizzas()
        }

        isSearch.current = false

    }, [categoryId, searchValue, sort.sortProperty, currentPage])

    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                currentPage
            })

            navigate(`?${queryString}`)
        }
        isMounted.current = true

    }, [categoryId, sort.sortProperty, currentPage])

    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>)
    const pizzaList = items.filter(obj => {
            if (obj.name.toLowerCase().includes(searchValue.toLowerCase())) {
                return true
            }
            return false
        }
    ).map(pizza =>
        <PizzaBlock key={pizza.id} {...pizza} />
    )

    const onChangePage = (page: number) => {
        dispatch(setCurrentPage(page))
    }

    const onClickCategoryId = (id: number) => {

        dispatch(setCategoryId(id))
    }

    return (
        <div className="container">
            <div className="content__top">
                <Categories categoryId={categoryId} onClickCategoryId={onClickCategoryId}/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {status === 'error'
                ? <div className="content__error-info">
                    <h2>Произошла ошибка 😕</h2>
                    <p>К сожалению, не удалось получить питсы. Попробуйте повторить попытку позже.</p>
                </div>
                : <div className="content__items">
                    {status === 'loading'
                        ? skeletons
                        : pizzaList
                    }
                </div>
            }
            <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
        </div>
    );
};

export default Home;