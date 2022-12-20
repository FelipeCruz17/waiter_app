import { Modal } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { CheckCircle } from '../Icons/CheckCircle';
import { Text } from '../Text';
import { Container, OkButton } from './styles';

interface OrderConfirmedModelProps {
  visible: boolean;
  onOk: () => void;
}

export function OrderConfirmedModel({ visible, onOk }: OrderConfirmedModelProps) {
  return (
    <Modal
      visible={visible}
      animationType='fade'
    >
      <StatusBar style='light' />
      <Container>
        <CheckCircle />
        <Text
          size={20}
          weight='600'
          color='#fff'
          style={{ marginTop: 12 }}
        >
          Pedido confirmado
        </Text>
        <Text
          color='#fff'
          opacity={0.9}
          style={{ marginTop: 4 }}
        >
          Pedido entrou na fila de produção
        </Text>

        <OkButton onPress={onOk}>
          <Text color='#d73035' weight='600'>OK</Text>
        </OkButton>
      </Container>
    </Modal>
  );
}
