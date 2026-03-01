import { ActionIcon, Flex, Text } from '@mantine/core';

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
    <Flex 
      align="center" 
      gap={4}
      data-testid="stepper"  
    >
      <ActionIcon
        data-testid="stepper-image-minus"  
        onClick={handleDecrement}
        disabled={value <= min}
        bg="#DEE2E6"
        size={30}
        radius={8}
      >
        –
      </ActionIcon>
      
      <Flex w={30} justify="center" align="center">
        <Text 
          data-testid="stepper-value" 
          fw={600}
        >
          {value}
        </Text>
      </Flex>
      
      <ActionIcon
        data-testid="stepper-image-plus"
        onClick={handleIncrement}
        disabled={value >= max}
        bg="#DEE2E6"
        size={30}
        radius={8}
      >
        +
      </ActionIcon>
    </Flex>
  );
}