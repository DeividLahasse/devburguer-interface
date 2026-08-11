// import { useState } from 'react';
// import Carousel from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';

// import { useEffect } from 'react';
// import { CardProduct } from '../../components/CardProduct';
// import { api } from '../../services/api';
// import { formatPrice } from '../../utils/formatPrice';
// import { Container, Title } from './styles';

// export function OfferCarousel() {
//   const [offer, setOfffers] = useState([]);

//   useEffect(() => {
//     async function loadProducts() {
//       const response = await api.get('/products');

//       const onlyOffers = response.data
//         .filter((product) => product.offer)
//         .map((product) => ({
//           currencyValue: formatPrice(product.price),
//           ...product,
//         }));

//       setOfffers(onlyOffers);
//     }

//     loadProducts();
//   }, []);

//   const responsive = {
//     superpoint: {
//       breakpoint: { max: 4000, min: 300 },
//       items: 4,
//     },
//     desktop: {
//       breakpoint: { max: 3000, min: 1200 },
//       items: 4,
//     },
//     tablet: {
//       breakpoint: { max: 1200, min: 600 },
//       items: 3,
//     },
//     mobile: {
//       breakpoint: { max: 690, min: 0 },
//       items: 2,
//     },
//   };

//   return (
//     <Container>
//       <Title>Ofertas do Dia</Title>
//       <Carousel
//         responsive={responsive}
//         infinite={true}
//         partialVisbile={false}
//         itemClass='carousel-item'
//       >
//         {offer.map((product) => (
//           <CardProduct key={product.id} product={product} />
//         ))}
//       </Carousel>
//     </Container>
//   );
// }

import { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { CardProduct } from '../../components/CardProduct';
import { api } from '../../services/api';
import { formatPrice } from '../../utils/formatPrice';
import { Container, Title } from './styles';

export function OfferCarousel() {
  const [offer, setOffers] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await api.get('/products');
        console.log('Produtos que vieram da API:', response.data); // Olhe o F12 depois disso

        const onlyOffers = response.data
          .filter((product) => product.offer === true)
          .map((product) => ({
            ...product,
            currencyValue: formatPrice(product.price),
            url: product.url?.startsWith('http')
              ? product.url
              : `https://dev-burguer-api-fuoy.onrender.com/uploads/${product.url}`,
          }));

        console.log('Produtos filtrados como oferta:', onlyOffers);
        setOffers(onlyOffers);
      } catch (error) {
        console.log('Erro ao carregar ofertas:', error);
      }
    }

    loadProducts();
  }, []);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Container>
      <Title>Ofertas do Dia</Title>
      {offer.length === 0 ? (
        <p style={{ color: '#fff', textAlign: 'center', padding: '20px' }}>
          Carregando ofertas ou nenhuma oferta encontrada...
        </p>
      ) : (
        <Carousel
          responsive={responsive}
          infinite={true}
          partialVisible={false}
          itemClass='carousel-item'
        >
          {offer.map((product) => (
            <CardProduct key={product.id} product={product} />
          ))}
        </Carousel>
      )}
    </Container>
  );
}
