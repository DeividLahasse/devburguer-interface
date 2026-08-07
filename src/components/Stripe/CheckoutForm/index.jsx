import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../../../hooks/CartContext';
import { api } from '../../../services/api';
import './styles.css';

export function CheckoutForm() {
  const { cartProducts, clearCart } = useCart();
  const navigate = useNavigate(); // ← corrigido: useNavigateNavigate → useNavigate()
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [elementReady, setElementReady] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || !elementReady) return;

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    });

    if (error) {
      if (error.type === 'card_error' || error.type === 'validation_error') {
        setMessage(error.message);
      } else {
        setMessage('Ocorreu um erro inesperado, tente novamente.');
      }
    } else if (paymentIntent?.status === 'succeeded') {
      setMessage('Pagamento realizado com sucesso! ✅');

      try {
        const products = cartProducts.map((product) => ({
          id: product.id,
          quantity: product.quantity,
          price: product.price,
        }));
console.log('Token no header:', api.defaults.headers.common);
        const { status } = await api.post(
          '/orders',
          { products },
          { validateStatus: () => true },
        );
        console.log('Status da resposta:', status);

        if (status === 201 || status === 200) {
          toast.success('Pedido realizado com sucesso! ✅');
          clearCart();
           // ← removido duplicado
          setTimeout(
            () =>
              navigate(
                `/complete?payment_intent_client_secret=${paymentIntent.client_secret}`,
              ),

            2000,
          );
        } else if (status === 409) {
          toast.error('Falha ao realizar seu pedido');
        } else {
          throw new Error();
          
          
        }
        
        
      } catch (_error) {
        console.log('Erro ao criar pedido:', _error);
        toast.error('❌ Falha no sistema, tente novamente');
      }
    } else {
      navigate(
        `/complete?payment_intent_client_secret=${paymentIntent.client_secret}`,
      );
    }

    setIsLoading(false); // ← movido para dentro da função
  };

  return (
    // ← return movido para dentro do componente
    <div className='checkout-wrapper'>
      <form className='checkout-container' onSubmit={handleSubmit}>
        <h2 className='checkout-title'>Dados de pagamento</h2>
        <PaymentElement
          options={{ layout: 'tabs' }}
          onReady={() => setElementReady(true)}
        />
        {message && (
          <p
            className={`checkout-message ${message.includes('sucesso') ? 'success' : ''}`}
          >
            {message}
          </p>
        )}
        <button
          className='checkout-button'
          type='submit'
          disabled={!stripe || isLoading || !elementReady}
        >
          {isLoading
            ? 'Processando...'
            : !elementReady
              ? 'Carregando...'
              : 'Finalizar pagamento'}
        </button>
      </form>
    </div>
  );
}
