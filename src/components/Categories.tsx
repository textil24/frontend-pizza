import React, {useState} from 'react';

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

export const Categories = () => {
    const [activeCategory, setActiveCategory] = useState(0)

    const onClickCategory = (index: number): void => {
        setActiveCategory(index)
    }

    return (
        <div className="categories">
            <ul>
                {categories.map((categoryName, index) => (
                    <li key={index}
                        onClick={() => onClickCategory(index)}
                        className={activeCategory === index ? "active" : ""}
                    >
                        {categoryName}
                    </li>
                ))}
            </ul>
        </div>
    );
};
