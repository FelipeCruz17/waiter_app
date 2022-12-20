import { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { CartItem } from '../../types/CartItems';
import { Actions, Item, ProductContainer, Image, QuantityContainer, ProductDetails, Summary, TotalContainer } from './styles';
import { Text } from '../Text';
import { formatPrice } from '../../utils/formatCurrency';
import { PlusCircle } from '../Icons/PlusCircle';
import { MinusCircle } from '../Icons/MinusCircle';
import { Button } from '../Button';
import { Product } from '../../types/Product';
import { OrderConfirmedModel } from '../OrderConfirmedModel';
import { api } from '../../utils/api';


interface CartProps {
  cartItems: CartItem[]
  selectedTable: string
  onAdd: (product: Product) => void
  onDecrement: (product: Product) => void
  onConfirmOrder: () => void
}

export function Cart({ cartItems, onAdd, onDecrement, onConfirmOrder, selectedTable }: CartProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const total = cartItems.reduce((acc, cartItem) => {
    return acc + cartItem.quantity * cartItem.product.price;
  }, 0);

  async function handleConfirmOrder() {
    setIsLoading(true);

    const payload = {
      table: selectedTable,
      products: cartItems.map(cartItem => ({
        product: cartItem.product._id,
        quantity: cartItem.quantity,

      }))
    };
    await api.post('/orders', payload);
    setIsLoading(true);
    setIsModalVisible(true);
  }

  function handleOk() {
    onConfirmOrder();
    setIsModalVisible(false);
  }

  return (
    <>
      <OrderConfirmedModel
        visible={isModalVisible}
        onOk={handleOk}
      />
      {cartItems.length > 0 && (
        <FlatList
          data={cartItems}
          keyExtractor={cartItem => cartItem.product._id}
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 20, maxHeight: 150 }}
          renderItem={({ item: CartItem }) => (
            <Item>
              <ProductContainer>
                <Image
                  source={{
                    uri: `http://192.168.161.179:3030/uploads/${CartItem.product.imagePath}`,
                  }}
                />

                <QuantityContainer>
                  <Text size={14} color='#666'>
                    {CartItem.quantity}x
                  </Text>
                </QuantityContainer>

                <ProductDetails>
                  <Text size={14} weight='600'>{CartItem.product.name}</Text>
                  <Text size={14} color='#666' style={{ marginTop: 4 }}>{formatPrice(CartItem.product.price)}</Text>
                </ProductDetails>

              </ProductContainer>

              <Actions>
                <TouchableOpacity style={{ marginRight: 20 }} onPress={() => onAdd(CartItem.product)}>
                  <PlusCircle />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onDecrement(CartItem.product)}>
                  <MinusCircle />
                </TouchableOpacity>
              </Actions>
            </Item>
          )}
        />
      )}

      <Summary>
        <TotalContainer>
          {cartItems.length > 0 ? (
            <>
              <Text color='#666'>Total</Text>
              <Text size={20} weight='600'>{formatPrice(total)}</Text>
            </>
          ) : (
            <Text color='#999'>Seu carrinho está vazio</Text>
          )}
        </TotalContainer>

        <Button
          onPress={handleConfirmOrder}
          disabled={cartItems.length === 0}
          loading={isLoading}
        >
         Confirmar pedido
        </Button>
      </Summary>
    </>
  );
}
