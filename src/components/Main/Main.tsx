import { Box, Space, Group, Center, Title } from '@mantine/core';
import useProducts from '../../services/getProductsAPI';
import ProductCard from '../Cards/ProductCard';

export default function Main() {
  const { catalog, loading } = useProducts();

  return (
    <Center>
      <Box component="main" bg="#F3F5FA" maw={1440} mb={100}>
        <Box ml={80} mr={80}>
          <Space h={60} />
          <Title component="h2" fz={32} fw={600}>
            Catalog
          </Title>
          <Space h={49} />
          
          {loading ? (
            <div>Загрузка...</div>
          ) : (
            <Group wrap="wrap" gap={24}>
              {catalog.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </Group>
          )}
        </Box>
      </Box>
    </Center>
  );
}