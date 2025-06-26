import React from 'react';

interface AnimatedTitleProps {
  text: string;
}

export function AnimatedTitle({ text }: AnimatedTitleProps) {
  return (
    <h3 className="text-xl font-bold">
      <span className="animate-wave-text bg-gradient-to-r from-white via-lumen-gold to-white bg-[length:300%_auto] bg-clip-text text-transparent">
        {text}
      </span>
    </h3>
  );
} 