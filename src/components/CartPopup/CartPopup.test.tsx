import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MantineProvider } from '@mantine/core';
import { BasketProvider } from '../../context/BasketContext';
import CartPopup from './CartPopup';

describe('CartPopup', () => {
  it('показывает сообщение о пустой корзине, когда cart пустой', () => {
    render(
      <MantineProvider>
        <BasketProvider>
          <CartPopup opened={true} onClose={() => {}} />
        </BasketProvider>
      </MantineProvider>
    );
    
    expect(screen.getByText('Your cart is empty!')).toBeInTheDocument();
  });

  it('не отображается, когда opened=false', () => {
    render(
      <MantineProvider>
        <BasketProvider>
          <CartPopup opened={false} onClose={() => {}} />
        </BasketProvider>
      </MantineProvider>
    );
    
    expect(screen.queryByText('Your cart is empty!')).not.toBeInTheDocument();
  });
});