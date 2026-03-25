import { useState } from 'react';
import { Card, Image, Text, Flex } from '@mantine/core';
import { useAppDispatch } from '../../store/hooks/redux';
import { addToCart } from '../../store/slices/cartSlice';
import Stepper from '../Stepper/Stepper';
import type { Product } from '../../types/product';
import styles from './ProductCard.module.css';

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity }));
    setQuantity(1);
  };

  return (
    <Card className={styles.card} padding="lg" radius="md">
      <Card.Section>
        <Image
          src={product.image}
          height={200}
          alt={product.name}
          fit="cover"
          className={styles.image}
        />
      </Card.Section>

      <Text className={styles.title}>
        {product.name}
      </Text>
      
      <Text className={styles.price}>
        {product.price} ₽
      </Text>

      <Flex justify="space-between" align="center" mt="md">
        <Stepper value={quantity} onChange={setQuantity} />
      </Flex>

      <button className={styles.addButton} onClick={handleAddToCart}>
        Add to cart
      </button>
    </Card>
  );
}