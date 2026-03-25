import styles from './Stepper.module.css';

type StepperProps = {
  value: number;
  onChange: (newValue: number) => void;
  min?: number;
  max?: number;
};

export default function Stepper({ value, onChange, min = 0, max = 99 }: StepperProps) {
  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  return (
    <div className={styles.stepper} data-testid="stepper">
      <button
        className={styles.button}
        data-testid="stepper-image-minus"
        onClick={handleDecrement}
        disabled={value <= min}
      >
        –
      </button>
      
      <div className={styles.value} data-testid="stepper-value">
        {value}
      </div>
      
      <button
        className={styles.button}
        data-testid="stepper-image-plus"
        onClick={handleIncrement}
        disabled={value >= max}
      >
        +
      </button>
    </div>
  );
}