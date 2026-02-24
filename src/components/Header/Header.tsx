import { Box, Text, Button, Flex, Badge, Group, Center } from '@mantine/core';
import { useBasket } from '../../context/BasketContext';
import { useState } from 'react';
import CartPopup from '../CartPopup/CartPopup';
import basketIcon from '../../assets/basket2.svg';  // ← импорт!

export default function Header() {
  const { totalItems } = useBasket();
  const [opened, setOpened] = useState(false);

  return (
    <Center>
      <Flex
        component="header"
        justify="space-between"
        w="100%"
        maw={1440}
        px={20}
        h={59}
        align="center"
        bg="white"
        pos="fixed"
        top={0}
        style={{ zIndex: 100, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
      >
        <Group bg="#F7F7F7" px={12} h={33} style={{ borderRadius: 31 }}>
          <Text fz={22} fw={600}>Vegatable</Text>
          <Badge bg="#54B46A" c="white" size="lg">SHOP</Badge>
        </Group>

        <Box>
  <Button
    onClick={() => setOpened(o => !o)}
    color="#54B46A"
    w={144}
    h={44}
    leftSection={
      totalItems > 0 ? (
        <Flex w={20} h={20} bg="white" style={{ borderRadius: '50%' }} align="center" justify="center">
          <Text c="black" fw={600} size="xs">{totalItems}</Text>
        </Flex>
      ) : null
    }
    rightSection={<img src={basketIcon} alt="basket" />}
  >
    <Text fw={600}>Cart</Text>
  </Button>
  
</Box>
      </Flex>
      
      <CartPopup opened={opened} onClose={() => setOpened(false)} />
    </Center>
  );
}