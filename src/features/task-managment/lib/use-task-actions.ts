import { tasksStore } from '@/entities/task';
import { useState } from 'react';

export const useTaskActions = (id: number, initialText: string) => {
  const { tasksArray, actions, modalOpen, setModalOpen } = tasksStore();
  const [isEditing, setIsEditing] = useState(false);
  const [disable, setDisable] = useState(false);

  const handleTextChange = (value: string) => {
    actions.updateTask(id, { value });
  };

  const handleEdit = () => {
    setIsEditing(false);
    // Дополнительная логика редактирования
  };

  return {
    task: tasksArray[id],
    modalOpen,
    disable,
    actions: {
      handleTextChange,
      handleEdit,
      handleDisable: () => setDisable(true),
      handleModalOpen: () => setModalOpen(true),
      handleRemove: () => actions.removeTask(id),
      handleIncrease: () => actions.updateTask(id, { pomodoros: tasksArray[id].pomodoros + 1 }),
      handleDecrease: () =>
        actions.updateTask(id, { pomodoros: Math.max(1, tasksArray[id].pomodoros - 1) }),
    },
  };
};
