import React from 'react';
import { cn } from '@/lib/utils';

const MobileMenu = () => {
  return (
    <section
      className={cn('right_sidebar h-[calc(100vh-5px)]', {
        'h-[calc(100vh-140px)]': '',
      })}
    ></section>
  );
};

export default MobileMenu;
