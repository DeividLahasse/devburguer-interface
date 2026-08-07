import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../../hooks/CartContext';
import { api } from '../../services/api';
import { formatPrice } from '../../utils/formatPrice';
import { Button } from '../Button';
import { Container } from './styles';

export function CartResume() {
  const [finalprice, setFinalprice] = useState(0);

  const [deliveryTax] = useState(500);

  const navigate = useNavigate();

  const { cartProducts, clearCart } = useCart();

  useEffect(() => {
    const somaAllItems = (cartProducts ?? []).reduce((acc, current) => {
      return current.price * current.quantity + acc;
    }, 0);
    setFinalprice(somaAllItems);
    return () => {};
  }, [cartProducts]);

  const submitOrder = async () => {
    const products = cartProducts.map((product) => {
      return {
        id: product.id,
        quantity: product.quantity,
        price: product.price,
      };
    });

    try {
      const { data } = await api.post('/create-payment-intent', { products });
      console.log('resposta da API:', data);

      navigate('/checkout', {
        state: data,
      });
    } catch (_err) {
      toast('❌ Error tente novamente!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    }
  };

  //
  return (
    <div>
      <Container>
        <div className='container-top'>
          <h2 className='title'>Resumo do pedido</h2>
          <p className='items'>Item</p>
          <p className='items-price'>{formatPrice(finalprice)}</p>
          <p className='delivery-tax'>Taxa de Entrega</p>
          <p className='delivery-tax-price'>{formatPrice(deliveryTax)}</p>
        </div>
        <div className='container-bottom'>
          <p>Total</p>
          <p>{formatPrice(finalprice + deliveryTax)}</p>
        </div>
      </Container>
      <Button onClick={submitOrder}>Finalizar Pedido</Button>
    </div>
  );
}

// import { Button } from '../Button';
// import { Container } from './styles';

// export function CartResume() {
//   return (
//     <div>
//       <Container>
//         <div className='container-top'>
//           <h2 className='title'>Resumo do pedido</h2>
//           <p className='items'>Iem</p>
//           <p className='items-price'>R$ 20,00</p>
//           <p className='delivery-tax'>Taxde Entrega</p>
//           <p className='delivery-tax-price'>R$ 5,00</p>
//         </div>
//         <div className='container-botton'>
//           <p>Total</p>
//           <p>R$ 25,00</p>
//         </div>
//       </Container>
//       <Button>Finalizar Pedido</Button>
//     </div>
//   );
// }
