import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from "../components/Footer";

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    name: string;
    price: number;
  }>();

  const { id } = useParams();
  const navigate = useNavigate();

  console.log(id)

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://63e4aefa4474903105ef68c6.mockapi.io/items?id=' + id);
        console.log(data[0])
        setPizza(data[0]);
      } catch (error) {
        alert('Ошибка при получении пиццы!');
        navigate('/');
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return <>Загрузка...</>;
  }

  return (
        <div className="container">
          <img src={pizza.imageUrl} />
          <h2>{pizza.name}</h2>
          <h4>{pizza.price} ₽</h4>
          <Link to="/">
            <button className="button button--outline button--add">
              <span>Назад</span>
            </button>
          </Link>
        </div>

  );
};

export default FullPizza;
