import { useState } from 'react';
import { Modal, TouchableOpacity, Platform } from 'react-native';
import { Text } from '../Text';
import { Overlay, ModalBody, ModalHeader, ModalForm, FormInput } from './styles';
import { Close } from '../Icons/Close';
import { Button } from '../Button';

interface TableModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (table: string) => void;
}

export function TableModal({ visible, onClose, onSave }: TableModalProps) {
  const [table, setTable] = useState('');

  function handleSave() {
    setTable('');
    onSave(table);
    onClose();
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType='fade'
    >
      <Overlay behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
        <ModalBody>
          <ModalHeader>
            <Text weight='600'>Informe a mesa</Text>

            <TouchableOpacity onPress={onClose}>
              <Close color='#666'/>
            </TouchableOpacity >
          </ModalHeader>

          <ModalForm>
            <FormInput
              placeholder='Número da mesa'
              placeholderTextColor='#666'
              keyboardType='number-pad'
              onChangeText={value => setTable(value)}
            />

            <Button onPress={handleSave} disabled={table.length === 0}>
              Salvar
            </Button>
          </ModalForm>

        </ModalBody>
      </Overlay>
    </Modal>
  );
}
