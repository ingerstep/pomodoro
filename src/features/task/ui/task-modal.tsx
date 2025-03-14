'use client';

import { FC } from 'react';
import { createPortal } from 'react-dom';

import { SvgExit } from '@/shared/ui/icons';
import { Button } from '@/shared/ui/button';

import { TaskModalProps } from './types';
import { useTaskModalActions } from '../lib/use-task-modal-actions';

export const TaskModal: FC<TaskModalProps> = ({ removeItem }) => {
  const { ref, setModalOpen, handleClick } = useTaskModalActions({ removeItem });
  const node = document.querySelector('#modal');

  if (!node) return;

  return createPortal(
    <div className='absolute w-full h-full top-0 flex justify-center items-center bg-black/50 z-30'>
      <div
        ref={ref}
        className='relative flex flex-col items-center py-6 px-20 bg-white dark:bg-[#2C3E50]'
      >
        <div className='mb-6 text-[#333] dark:text-[#ECF0F1] text-2xl font-normal'>
          Удалить задачу?
        </div>
        <Button size='default' variant='red' onClick={handleClick}>
          Удалить
        </Button>
        <button onClick={() => setModalOpen(false)}>
          <span className='pb-1 text-base text-[#333] dark:text-[#ECF0F1] dark:hover:border-[#ECF0F1] font-light hover:border-b hover:border-[#333] transition-all'>
            Отмена
          </span>
        </button>
        <button
          onClick={() => setModalOpen(false)}
          className='absolute top-3 right-3 text-[#C4C4C4] hover:text-[#DC3E22] transition-colors'
        >
          <SvgExit />
        </button>
      </div>
    </div>,
    node,
  );
};
