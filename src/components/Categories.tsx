import React from 'react';

interface ICategoryProps {
    categoryId: number
    onClickCategoryId: Function
}

export const Categories = ({ categoryId, onClickCategoryId }: ICategoryProps) => {

    const onClickCategory = (index: number): void => {
        onClickCategoryId(index)
    }

    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

    return (
        <div className="categories">
            <ul>
                {categories.map((categoryName, index) => (
                    <li key={index}
                        onClick={() => onClickCategory(index)}
                        className={categoryId === index ? "active" : ""}
                    >
                        {categoryName}
                    </li>
                ))}
            </ul>
        </div>
    );
};
