import { render, screen, within } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';
import cartReducer from '../../store/slices/cartSlice';
import ProductCard from './ProductCard';

// ============================================
// 1. Хелпер для рендера с Redux
// ============================================
const renderWithRedux = (
  component: React.ReactElement,
  preloadedState = {}
) => {
  const store = configureStore({
    reducer: { cart: cartReducer },
    preloadedState,
  });

  return {
    store,
    ...render(
      <Provider store={store}>
        <MantineProvider>{component}</MantineProvider>
      </Provider>
    ),
  };
};

// ============================================
// 2. Моковые данные
// ============================================
const mockProduct = {
  id: '1',
  name: 'Test Product - 1 kg',
  price: 100,
  image: 'test.jpg',
  category: 'test',
};

describe('ProductCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ============================================
  // 3. Тесты на рендер
  // ============================================
  it('рендерит карточку с данными о товаре', () => {
    renderWithRedux(<ProductCard product={mockProduct} />);

    // Ищем по части названия (чтобы не привязываться к точному формату)
    expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
    expect(screen.getByText(/100.*₽/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument();
    
    const stepper = screen.getByTestId('stepper');
    expect(within(stepper).getByTestId('stepper-value')).toHaveTextContent('1');
  });

  // ============================================
  // 4. Функциональные тесты
  // ============================================
  it('изменяет количество при нажатии на "+" и "-"', async () => {
    const user = userEvent.setup();
    renderWithRedux(<ProductCard product={mockProduct} />);

    const stepper = screen.getByTestId('stepper');
    const value = within(stepper).getByTestId('stepper-value');
    const plusButton = within(stepper).getByTestId('stepper-image-plus');
    const minusButton = within(stepper).getByTestId('stepper-image-minus');

    // Начальное значение 1
    expect(value).toHaveTextContent('1');

    // Нажимаем "+" → становится 2
    await user.click(plusButton);
    expect(value).toHaveTextContent('2');

    // Нажимаем "-" → становится 1
    await user.click(minusButton);
    expect(value).toHaveTextContent('1');
  });

  it('добавляет товар в корзину с выбранным количеством', async () => {
    const user = userEvent.setup();
    const { store } = renderWithRedux(<ProductCard product={mockProduct} />);

    const stepper = screen.getByTestId('stepper');
    const plusButton = within(stepper).getByTestId('stepper-image-plus');
    const value = within(stepper).getByTestId('stepper-value');

    // Увеличиваем количество до 3
    await user.click(plusButton); // 2
    await user.click(plusButton); // 3
    expect(value).toHaveTextContent('3');

    // Нажимаем кнопку добавления
    const addButton = screen.getByRole('button', { name: /add to cart/i });
    await user.click(addButton);

    // Проверяем состояние Redux
    const state = store.getState();
    expect(state.cart.items).toHaveLength(1);
    expect(state.cart.items[0]).toEqual({
      ...mockProduct,
      quantity: 3,
    });
    expect(state.cart.totalQuantity).toBe(3);
    expect(state.cart.totalPrice).toBe(300);

    // Проверяем, что счётчик сбросился до 1
    expect(value).toHaveTextContent('1');
  });

  it('увеличивает количество существующего товара при повторном добавлении', async () => {
    const user = userEvent.setup();
    
    // Начальное состояние: товар уже есть в корзине с quantity = 2
    const preloadedState = {
      cart: {
        items: [{ ...mockProduct, quantity: 2 }],
        totalQuantity: 2,
        totalPrice: 200,
      },
    };

    const { store } = renderWithRedux(
      <ProductCard product={mockProduct} />,
      preloadedState
    );

    // Нажимаем кнопку добавления (количество в карточке = 1 по умолчанию)
    const addButton = screen.getByRole('button', { name: /add to cart/i });
    await user.click(addButton);

    // Проверяем, что quantity увеличилось с 2 до 3
    const state = store.getState();
    expect(state.cart.items).toHaveLength(1);
    expect(state.cart.items[0].quantity).toBe(3);
    expect(state.cart.totalPrice).toBe(300);
  });
});