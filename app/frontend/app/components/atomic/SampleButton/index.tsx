import React, { CSSProperties } from 'react';
import styles from './index.module.css';

interface SampleButtonProps {
  primary?: boolean;
  backgroundColor?: CSSProperties['backgroundColor'];
  size?: 'small' | 'medium' | 'large';
  label: string;
  onClick?: () => void;
}

export default function SampleButton({
  primary,
  backgroundColor,
  size,
  label,
  ...props
}: SampleButtonProps) {
  const mode = primary ? styles.primary : styles.secondary;
  const sizeClass = size ? styles[size]: undefined;

  return (
    <button
      type="button"
      className={[`${styles.button}`, `${sizeClass}`, `${mode}`].join(' ') }
      style={backgroundColor ? { backgroundColor } : undefined}
      {...props}
    >
      {label}
    </button>
  );
};