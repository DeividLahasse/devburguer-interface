import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CardProduct } from '../../components/CardProduct';
import { api } from '../../services/api';
import { formatPrice } from '../../utils/formatPrice';
import logo from '../../assets/logo.png';
import {
  Banner,
  CategoryButton,
  CategoryMenu,
  Container,
  ProductsContainer,
  VoltarButton,
} from './styles';
export function Menu() {
  const [categories, setCategories] = useState([]);
  const [products, setproducts] = useState([]);
  const [filteredProdutc, setFilteredProducts] = useState([]);

  const navigate = useNavigate();

  const { search } = useLocation();

  const queryParams = new URLSearchParams(search);

  const [activeCategory, setActiveCategory] = useState(() => {
    const categoryId = +queryParams.get('categoria');

    if (categoryId) {
      return categoryId;
    }

    return 0;
  });

  useEffect(() => {
    async function loadCategories() {
      const { data } = await api.get('/categories');

      const newCategories = [{ id: 0, name: 'Todas' }, ...data];

      setCategories(newCategories);
    }

    async function loadProducts() {
      const { data } = await api.get('/products');
       

      const newProducts = data.map((product) => ({
        currencyValue: formatPrice(product.price),
        ...product,
      }));

      setproducts(newProducts);
    }

    loadCategories();
    loadProducts();
  }, []);

  useEffect(() => {
    if (activeCategory === 0) setFilteredProducts(products);
    else {
      const newFilteredProducts = products.filter(
        (product) => product.category_id === activeCategory,
      );
      setFilteredProducts(newFilteredProducts);
    }
  }, [products, activeCategory]);

  return (
    <Container>
      <Banner>
        <h1>
          O MELHORB <br />
          HAMBURGUER <br />
          ESTÁ AQUI <img src={logo} alt="imagem/hamgurguer" />
          <span>Esse cardá!está inresistivel</span>
        </h1>
      </Banner>

      <CategoryMenu>
        <VoltarButton type='button' onClick={() => navigate(-1)}>
          <span>Voltar ao Menu</span>
        </VoltarButton>
        {categories.map((category) => (
          <CategoryButton
            key={category.id}
            $isActiveCategory={category.id === activeCategory}
            onClick={() => {
              navigate(
                {
                  pathname: '/cardapio',
                  search: `?categoria=${category.id}`,
                },
                {
                  replace: true,
                },
              );
              setActiveCategory(category.id);
            }}
          >
            {category.name}
          </CategoryButton>
        ))}
      </CategoryMenu>

      <ProductsContainer>
        {filteredProdutc.map((product) => {
          return <CardProduct product={product} key={product.id} />;
        })}
      </ProductsContainer>
    </Container>
  );
}
