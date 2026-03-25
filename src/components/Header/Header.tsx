import { useState } from 'react';
import { useAppSelector } from '../../store/hooks/redux';
import CartPopup from '../CartPopup/CartPopup';
import basketIcon from '../../assets/basket2.svg';
import styles from './Header.module.css';

export default function Header() {
  const { totalQuantity } = useAppSelector(state => state.cart);
  const [opened, setOpened] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logo}>
          <span className={styles.logoText}>Vegatable</span>
          <div className={styles.shopBadge}>SHOP</div>
        </div>

        <div style={{ position: 'relative' }}>
          <button 
            className={styles.cartButton}
            onClick={() => setOpened(o => !o)}
          >
            {totalQuantity > 0 && (
              <span className={styles.cartCount}>{totalQuantity}</span>
            )}
            <img src={basketIcon} alt="basket" className={styles.cartIcon} />
            <span>Cart</span>
          </button>
          
          <CartPopup opened={opened} onClose={() => setOpened(false)} />
        </div>
      </div>
    </header>
  );
}