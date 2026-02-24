import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MantineProvider } from '@mantine/core';
import { BasketProvider } from '../../context/BasketContext';
import ProductCard from './ProductCard';

const mockProduct = {
  id: '1',
  name: 'potato',
  price: 100,
  image: 'test.jpg',
  category: 'Category',
};

describe('ProductCard', () => {
  it('рендерит карточку с названием и ценой', () => {
    render(
      <MantineProvider>
        <BasketProvider>
          <ProductCard product={mockProduct} />
        </BasketProvider>
      </MantineProvider>
    );
    
    expect(screen.getByText('potato')).toBeInTheDocument();
    expect(screen.getByText('100 ₽')).toBeInTheDocument();
  });
});