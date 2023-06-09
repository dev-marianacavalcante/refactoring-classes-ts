import { useEffect, useState } from 'react';

import Header from '../../components/Header';
import api from '../../services/api';
import { Food } from '../../components/Food';
import { ModalAddFood } from '../../components/ModalAddFood';
import { ModalEditFood } from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';

interface foodProps {
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
  available?: boolean;
}

export const Dashboard = () => {
  const [foods, setFoods] = useState<foodProps[]>([]);
  const [editingFood, setEditingFood] = useState<editingFoodProps>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  async function getFoods() {
    const response = await api.get('/foods');

    setFoods(response.data);
  }

  useEffect(() => {
    getFoods();
  }, []);

  async function handleAddFood(food: foodProps) {
    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });

      setFoods(oldFoods => [...oldFoods, response.data]);
    } catch (err) {
      console.log(err);
    }
    setModalOpen(false);
  }

  async function handleUpdateFood(food: foodProps) {
    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood.id}`,
        { ...editingFood, ...food },
      );

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );

      setFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteFood(id: number) {
    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => food.id !== id);

    setFoods(foodsFiltered);
  }

  async function toggleModal() {
    setModalOpen(!modalOpen);
  }

  function toggleEditModal() {
    setEditModalOpen(!editModalOpen);
  }

  function handleEditFood(food: foodProps) {
    setEditModalOpen(true);
    setEditingFood(food);
  }

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />
      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
};
