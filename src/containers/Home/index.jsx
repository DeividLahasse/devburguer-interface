import { CategoriesCarousel,OfferCarousel } from '../../components';
import { useUser } from '../../hooks/UserContext';
import { Banner, Container, Content } from './styled';

export function Home() {
  console.log(useUser);
  return (
    <main>
      <Banner>
        <h1>Bem-Vindo!</h1>
      </Banner>
      <Container>
        <Content>
          <CategoriesCarousel />
          <OfferCarousel />
        </Content>
      </Container>
    </main>
  );
}

