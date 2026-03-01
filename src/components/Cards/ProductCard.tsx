import { useState } from 'react';
import { Card, Image, Text, Button, Flex } from '@mantine/core';
import { useAppDispatch } from '../../store/hooks/redux';
import { addToCart } from '../../store/slices/cartSlice';
import Stepper from '../Stepper/Stepper';
import type { Product } from '../../types/product';

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity }));
    setQuantity(1); // сбрасываем счётчик после добавления
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={product.image}
          height={200}
          alt={product.name}
          fit="cover"
        />
      </Card.Section>

      <Text fw={600} size="lg" mt="md">
        {product.name}
      </Text>
      
      <Text size="xl" fw={700} c="green" mt="xs">
        {product.price} ₽
      </Text>

      <Flex justify="space-between" align="center" mt="md">
        <Stepper value={quantity} onChange={setQuantity} />
        <Button color="green" size="sm" onClick={handleAddToCart}>
          Add to cart
        </Button>
      </Flex>
    </Card>
  );
}