import TrashIcon from '../../assets/trash.svg';
import { useCart } from '../../hooks/CartContext';
import { formatPrice } from '../../utils/formatPrice';
import { Table } from '../index';
import {
  ButtonGroup,
  EmptyCart,
  ProductToralPrice,
  TrashImage,
} from './styles';

export function CartItems() {
  const { cartProducts, decreaseProduct, increaseProduct, deleteProduct } =
    useCart();
  console.log(cartProducts);
  return (
    <Table.Root>
      <Table.Header>
        <Table.Tr>
          <Table.Th></Table.Th>
          <Table.Th>Item</Table.Th>
          <Table.Th>Preço</Table.Th>
          <Table.Th>Quantidade</Table.Th>
          <Table.Th>Total</Table.Th>
          <Table.Th></Table.Th>
        </Table.Tr>
      </Table.Header>

      <Table.Body>
        {cartProducts?.length ? (
          cartProducts.map((product) => (
            <Table.Tr key={product.id}>
              <Table.Td>
                <img src={product.url} alt='imagem do produto' />
              </Table.Td>

              <Table.Td>{product.name}</Table.Td>

              <Table.Td>{product.currencyValue}</Table.Td>

              <Table.Td>
                <ButtonGroup>
                  <button
                    type='button'
                    onClick={() => decreaseProduct(product.id)}
                  >
                    -
                  </button>

                  <button
                    type='button'
                    onClick={() => increaseProduct(product.id)}
                  >
                    +
                  </button>
                </ButtonGroup>
              </Table.Td>

              <Table.Td>
                <TrashImage
                  src={TrashIcon}
                  alt='lixeira'
                  onClick={() => deleteProduct(product.id)}
                ></TrashImage>
              </Table.Td>

              <Table.Td>
                <ProductToralPrice>
                  {formatPrice(product.quantity * product.price)}
                </ProductToralPrice>
              </Table.Td>
            </Table.Tr>
          ))
        ) : (
          <Table.Tr>
            <Table.Td colSpan={6}>
              <EmptyCart>Carrinho vazio</EmptyCart>
            </Table.Td>
          </Table.Tr>
        )}
      </Table.Body>
    </Table.Root>
  );
}
