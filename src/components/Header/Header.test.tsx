import { render, screen } from '@testing-library/react';
import { describe, it, expect} from 'vitest';
import { MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../../store/slices/cartSlice';
import Header from './Header';
import userEvent from '@testing-library/user-event';

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

describe('Header', () => {
  it('рендерит шапку с логотипом и кнопкой Cart', () => {
    renderWithRedux(<Header />);
    expect(screen.getByText('Vegatable')).toBeInTheDocument();
    expect(screen.getByText('SHOP')).toBeInTheDocument();
    expect(screen.getByText('Cart')).toBeInTheDocument();
  });

  it('показывает количество товаров', () => {
    renderWithRedux(<Header />, {
      cart: {
        items: [{ id: '1', quantity: 3 }],
        totalQuantity: 3,
        totalPrice: 300
      }
    });
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('открывает и закрывает попап при клике на кнопку Cart', async () => {
    const user = userEvent.setup();
    renderWithRedux(<Header />);
    
    const cartButton = screen.getByText('Cart').closest('button')!;
    await user.click(cartButton);
    
    // Проверяем, что попап открылся
    expect(screen.getByText('Your cart is empty!')).toBeInTheDocument();
    
    await user.click(cartButton);
    expect(screen.queryByText('Your cart is empty!')).not.toBeInTheDocument();
  });
});