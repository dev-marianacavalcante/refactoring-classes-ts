import { createRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';
import { FormHandles } from '@unform/core';

interface modalEditFoodProps {
  isOpen: boolean;
  editingFood: editingFoodProps;
  handleUpdateFood: (data: handleSubmitProps) => {};
  setIsOpen: () => void;
}

interface handleSubmitProps {
  id: number;
  image: string;
  name: string;
  description: string;
  price: string;
  available: boolean;
}

interface editingFoodProps {
  id?: number;
  image?: string;
  name?: string;
  description?: string;
  price?: string;
}

export const ModalEditFood = (props: modalEditFoodProps) => {
  const formRef = createRef<FormHandles>();

  function handleSubmit(data: handleSubmitProps) {

    const { setIsOpen, handleUpdateFood } = props;

    handleUpdateFood(data);
    setIsOpen();
  }

  const { isOpen, setIsOpen, editingFood } = props;

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};
