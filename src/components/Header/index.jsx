import { ShoppingCartIcon, UserCircleIcon } from '@phosphor-icons/react';
import { Link, useNavigate, useResolvedPath } from 'react-router-dom';
import { useUser } from '../../hooks/UserContext';
import {
  Container,
  Content,
  HeaderLink,
  LinkContainer,
  Logout,
  Navigation,
  Options,
  Profile,
} from './styles';

export function Header() {
  const navigate = useNavigate();
  const { logout, userInfo } = useUser();

  const { pathname } = useResolvedPath();

  function logoutUser() {
    logout();
    navigate('/');
  }
  return (
    <Container>
      <Content>
        <Navigation>
          <div>
            <HeaderLink to='/' $isActive={pathname === '/'}>
              Home
            </HeaderLink>
            <hr></hr>
            <HeaderLink to='/cardapio' $isActive={pathname === '/cardapio'}>
              Cárdapio
            </HeaderLink>
          </div>
        </Navigation>
        <Options>
          <Link
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              textDecoration: 'none',
              color: '#fff',
            }}
            to='/login'
          >
            <UserCircleIcon color='#fff' size={24} />
            <p>Login</p>
          </Link>
          <Profile>
            <div>
              <p>
                Ola, <span>{userInfo.name}</span>
              </p>
              <Logout onClick={logoutUser}>Sair</Logout>
            </div>
          </Profile>

          <LinkContainer>
            <ShoppingCartIcon color='#fff' size={24} />
            <HeaderLink to={'/carrinho'}>Carrinho</HeaderLink>
          </LinkContainer>
        </Options>
      </Content>
    </Container>
  );
}
