import { useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { CartegoryButton, Container, ContainerItem, Title } from './styles';

export function CategoriesCarousel() {
  const [categories, setCategories] = useState([]);

  // const navigate = useNavigate();

  useEffect(() => {
    async function loadCategories() {
      const response = await api.get('/categories');

      setCategories(response.data);
    }

    loadCategories();
  }, []);

  const responsive = {
    superpoint: {
      breakpoint: { max: 4000, min: 300 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1200 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1200, min: 600 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 690, min: 0 },
      items: 2,
    },
  };

  return (
    <Container>
      <Title>Categorias</Title>
      <Carousel
        responsive={responsive}
        infinite={true}
        partialVisbile={false}
        itemClass='carousel-item'
      >
        {categories.map((category) => (
          <ContainerItem key={category.id} imageUrl={category.url}>
            <CartegoryButton to={`/cardapio?categoria=${category.id}`}>
              {category.name}
            </CartegoryButton>
          </ContainerItem>
        ))}
      </Carousel>
    </Container>
  );
}
