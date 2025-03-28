import clsx from 'clsx';

import { getTimerData } from '../lib/get-timer-data';

export const TimerHeader = () => {
  const { isRunning, isStarted, pomodorosDone, tasksArray, isActivePause } = getTimerData();

  return (
    <div
      className={clsx(
        'flex justify-between items-center py-5 px-10 w-full h-14 dark:bg-[#2C3E50]',
        isStarted
          ? isRunning
            ? 'bg-[#A8B64F] dark:bg-[rgb(33,90,128)]'
            : 'bg-[#DC3E22] dark:bg-[#3498DB]'
          : 'bg-[#C4C4C4]',
      )}
    >
      <div className='text-white text-base font-bold'>
        {isActivePause ? 'Перерыв' : tasksArray[0] && tasksArray[0].value}
      </div>

      <div className='text-white text-base font-normal'>Выполнено помидор: {pomodorosDone}</div>
    </div>
  );
};
