import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addPizza} from "../../redux/slices/cartSlice";
import {useAppSelector} from "../../redux/hooks/reduxHooks";

type TPizzaBlock = {
    id: number
    imageUrl: string
    name: string
    types: number[]
    sizes: number[]
    price: number
    category: number
    rating: number

}

const typesNames = ['традиционное', 'тонкое']

export const PizzaBlock = ({id, imageUrl, name, types, sizes, price, rating, category}: TPizzaBlock) => {

    const dispatch = useDispatch()
    const cartItem = useAppSelector(state => state.cart.pizzas.find(obj => obj.id === id))

    const addedCount = cartItem ? cartItem.count : 0

    const [typeIndex, setTypeIndex] = useState<number>(0)
    const [sizeIndex, setSizeIndex] = useState<number>(0)

    const onClickAdd = () => {
        const pizza = {
            id,
            name,
            price,
            imageUrl,
            type: typesNames[typeIndex],
            size: sizes[sizeIndex]
        }
        dispatch(addPizza(pizza))
    }

    const onClickType = (index: number) => {
        setTypeIndex(index)
    }

    const onClickSize = (index: number) => {
        setSizeIndex(index)
    }

    return (
        <div className="pizza-block-wrapper">
            <div className="pizza-block">
                <img className="pizza-block__image" src={imageUrl} alt="Pizza"/>
                <h4 className="pizza-block__title">{name}</h4>
                <div className="pizza-block__selector">
                    <ul>
                        {types.map((typeId, index) =>
                            <li
                                key={typeId}
                                onClick={() => onClickType(index)}
                                className={typeIndex === index ? "active" : ""}
                            >
                                {typesNames[typeId]}
                            </li>
                        )}
                    </ul>
                    <ul>
                        {sizes.map((size, index) =>
                            <li
                                key={size}
                                onClick={() => onClickSize(index)}
                                className={sizeIndex === index ? "active" : ""}
                            >{size} см.</li>
                        )}
                    </ul>
                </div>
                <div className="pizza-block__bottom">
                    <div className="pizza-block__price">от {price} ₽</div>
                    <button onClick={onClickAdd} className="button button--outline button--add">
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                                fill="white"
                            />
                        </svg>
                        <span>Добавить</span>
                        {addedCount > 0 && <i>{addedCount}</i>}
                    </button>
                </div>
            </div>
        </div>
    );
};