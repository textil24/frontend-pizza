import React, {useEffect, useState} from 'react';
import {Categories} from "../components/Categories";
import {ISortType, Sort} from "../components/Sort";
import {Skeleton} from "../components/PizzaBlock/Skeleton";
import {PizzaBlock} from "../components/PizzaBlock";

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

const Home = () => {

    const [pizzas, setPizzas] = useState<IPizza[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const [categoryId, setCategoryId] = useState(0)
    const [sortType, setSortType] = useState<ISortType>({
        name: 'популярности',
        sortProperty: 'rating'
    })

    console.log(categoryId, sortType.sortProperty)

    useEffect(() => {
        setIsLoading(true)

        const sortBy = sortType.sortProperty.replace('-', '')
        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'
        const category = categoryId > 0 ? `category=${categoryId}` : ''

        fetch(`https://63e4aefa4474903105ef68c6.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`)
            .then(res => res.json())
            .then(json => {
                    setPizzas(json)
                    setIsLoading(false)
                }
            )
        window.scrollTo(0, 0)
    }, [categoryId, sortType])

    return (
        <div className="container">
            <div className="content__top">
                <Categories categoryId={categoryId} onClickCategoryId={(id: number) => setCategoryId(id)}/>
                <Sort sortType={sortType} onClickSortType={(type: ISortType) => setSortType(type)}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? [...new Array(6)].map((_, index) =>
                        <Skeleton key={index}/>
                    )
                    : pizzas.map(pizza =>
                        <PizzaBlock key={pizza.id} {...pizza} />
                    )
                }
            </div>
        </div>
    );
};

export default Home;