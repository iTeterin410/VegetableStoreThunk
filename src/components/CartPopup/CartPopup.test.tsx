import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../../store/slices/cartSlice';
import CartPopup from './CartPopup';

const renderWithRedux = (component: React.ReactElement, preloadedState = {}) => {
  const store = configureStore({
    reducer: { cart: cartReducer },
    preloadedState,
  });
  
  return render(
    <Provider store={store}>
      <MantineProvider>
        {component}
      </MantineProvider>
    </Provider>
  );
};

describe('CartPopup', () => {
  const mockOnClose = vi.fn();

  it('показывает пустую корзину', () => {
    renderWithRedux(<CartPopup opened={true} onClose={mockOnClose} />);
    expect(screen.getByText('Your cart is empty!')).toBeInTheDocument();
  });

  it('показывает товары в корзине', () => {
    const preloadedState = {
      cart: {
        items: [
          { id: '1', name: 'Product 1', price: 100, quantity: 2, image: 'img1.jpg' },
          { id: '2', name: 'Product 2', price: 50, quantity: 1, image: 'img2.jpg' },
        ],
        totalQuantity: 3,
        totalPrice: 250
      }
    };

    renderWithRedux(<CartPopup opened={true} onClose={mockOnClose} />, preloadedState);
    
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getByText(/\$\s*250/)).toBeInTheDocument();
  });
});