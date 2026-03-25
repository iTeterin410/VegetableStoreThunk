import { useEffect } from 'react';
import { Container, SimpleGrid, Center, Loader, Text, Title } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { fetchProducts } from '../../store/slices/productsSlice';
import ProductCard from '../Cards/ProductCard';
import styles from './Main.module.css';

export default function Main() {
  const dispatch = useAppDispatch();
  const { items: products, loading, error } = useAppSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return (
      <Center h={200}>
        <Loader size="lg" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h={200}>
        <Text c="red">Error: {error}</Text>
      </Center>
    );
  }

  return (
    <Container size="xl" pt={149}>
      <Title order={2} className={styles.catalogTitle}>
        Catalog
      </Title>
      <SimpleGrid cols={4} spacing="lg" verticalSpacing="xl">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </SimpleGrid>
    </Container>
  );
}