import { FC, SVGProps } from 'react';

export const SvgMinus: FC<SVGProps<string>> = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width='50'
      height='50'
      viewBox='0 0 50 50'
      fill='none'
    >
      <circle cx='25' cy='25' r='25' fill='currentColor' />
      <rect x='17' y='23' width='16' height='4' fill='white' />
    </svg>
  );
};
