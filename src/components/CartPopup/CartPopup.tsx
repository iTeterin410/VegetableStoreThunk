import { Box, Flex, Text, Image, Group } from '@mantine/core';
import { useAppSelector, useAppDispatch } from '../../store/hooks/redux';
import { updateQuantity } from '../../store/slices/cartSlice';
import Stepper from '../Stepper/Stepper';
import emptyCart from '../../assets/cart_empty.svg';
import { useEffect } from 'react';
import styles from './CartPopup.module.css';

type Props = {
  opened: boolean;
  onClose: () => void;
};

export default function CartPopup({ opened, onClose }: Props) {
  const { items: cart, totalPrice } = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && opened) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [opened, onClose]);

  if (!opened) return null;

  // Пустая корзина
  if (cart.length === 0) {
    return (
      <div className={styles.emptyPopup} onClick={onClose}>
        <Image src={emptyCart} w={118} h={107} mb={24} />
        <Text c="#868E96">Your cart is empty!</Text>
      </div>
    );
  }

  // Корзина с товарами
  return (
    <div className={styles.popup}>
      {cart.map((item, index) => (
        <div key={item.id} className={styles.item}>
          <Flex h={64} align="center" justify="space-between">
            <Flex gap={12}>
              <Image w={64} h={64} src={item.image} />
              <Flex direction="column">
                <Group gap={12} justify="space-between">
                  <Text fw={600} size="md">{item.name.split(' - ')[0]}</Text>
                  <Text c="#868E96" size="sm">
                    {item.name.includes('-') ? item.name.split('-')[1] : ''}
                  </Text>
                </Group>
                <Text className={styles.price}>
                  {item.price * item.quantity} ₽
                </Text>
              </Flex>
            </Flex>
            <Stepper
              value={item.quantity}
              onChange={(newQty) => dispatch(updateQuantity({ id: item.id, quantity: newQty }))}
              min={0}
            />
          </Flex>
          {index < cart.length - 1 && <div className={styles.divider} />}
        </div>
      ))}
      
      <div className={styles.total}>
        <Text fw={600}>Total</Text>
        <Text className={styles.price}>{totalPrice} ₽</Text>
      </div>
    </div>
  );
}