import Hamburguer from '../../assets/hmburguer.png';
import { CartItems, CartResume } from '../../components';
import { Banner, Container, Content, Title } from './styles';

export function Cart() {
  return (
    <Container>
      <Banner>
        <img src={Hamburguer} alt='logo devburger' />
      </Banner>
      <Title>Checkout - Pedido</Title>
      <Content>
        <CartItems />
        <CartResume />
      </Content>
    </Container>
  );
}
