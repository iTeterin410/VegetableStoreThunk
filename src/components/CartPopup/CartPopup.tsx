import { Box, Flex, Text, Image, Divider, Group } from '@mantine/core';
import { useBasket } from '../../context/BasketContext';
import Stepper from '../Stepper/Stepper';
import emptyCart from '../../assets/cart_empty.svg';

export default function CartPopup({ opened }: { opened: boolean }) {
  const { cart, updateQuantity, totalPrice } = useBasket();

  if (!opened) return null;

  if (cart.length === 0) {
    return (
      <Flex
        w={301}
        h={227}
        bg="white"
        style={{ 
          boxShadow: '0px 4px 14px rgba(0,0,0,0.1)',
          borderRadius: 16,
          position: 'absolute',
          right: 0,
          top: 'calc(100% + 8px)',
          zIndex: 101
        }}
        direction="column"
        justify="center"
        align="center"
      >
        <Image src={emptyCart} w={118} h={107} mb={24} />
        <Text c="#868E96">Your cart is empty!</Text>
      </Flex>
    );
  }

  return (
    <Box
      bg="white"
      style={{
        boxShadow: '0px 4px 14px rgba(0,0,0,0.1)',
        borderRadius: 16,
        position: 'absolute',
        right: 0,
        top: 'calc(100% + 8px)',
        width: 444,
        zIndex: 101,
        padding: 24
      }}
    >
      {cart.map((item, index) => (
        <Box key={item.id}>
          <Flex h={64} align="center" justify="space-between">
            <Flex gap={12}>
              <Image w={64} h={64} src={item.image} />
              <Flex direction="column">
                <Group gap={12} justify="space-between">
                  <Text fw={600} size="md">{item.name.split(' - ')[0]}</Text>
                  <Text c="#868E96" size="sm">{item.name.includes('-') ? item.name.split('-')[1] : ''}</Text>
                </Group>
                <Text fw={600} size="xl">$ {item.price * item.quantity}</Text>
              </Flex>
            </Flex>
            <Stepper
              value={item.quantity}
              onChange={(newQty) => updateQuantity(item.id, newQty)}
              min={0}
            />
          </Flex>
          {index < cart.length - 1 && (
            <Divider my={14} />
          )}
        </Box>
      ))}
      
      <Flex mt={12} pt={12} justify="space-between" style={{ borderTop: '1px solid #DEE2E6' }}>
        <Text fw={600}>Total</Text>
        <Text fw={600}>$ {totalPrice}</Text>
      </Flex>
    </Box>
  );
}