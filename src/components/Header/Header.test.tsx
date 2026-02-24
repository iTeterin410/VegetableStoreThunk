import { MantineProvider } from '@mantine/core';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BasketProvider } from '../../context/BasketContext';
import Header from './Header';
import userEvent from '@testing-library/user-event';

describe('Header', () => {
  it('рендерит шапку с логотипом и кнопкой Cart', () => {
    render(
      <MantineProvider>
        <BasketProvider>
          <Header />
        </BasketProvider>
      </MantineProvider>
    );
    
    expect(screen.getByText('Vegatable')).toBeInTheDocument();
    expect(screen.getByText('SHOP')).toBeInTheDocument();
    expect(screen.getByText('Cart')).toBeInTheDocument();
  });

  it('открывает и закрывает попап при клике на кнопку Cart', async () => {
    render(
      <MantineProvider>
        <BasketProvider>
          <Header />
        </BasketProvider>
      </MantineProvider>
    );
    
    const cartButton = screen.getByText('Cart').closest('button')!;
    
    // Открываем попап
    await userEvent.click(cartButton);
    expect(screen.getByText('Your cart is empty!')).toBeInTheDocument();
    
    // Закрываем попап
    await userEvent.click(cartButton);
    expect(screen.queryByText('Your cart is empty!')).not.toBeInTheDocument();
  });
});