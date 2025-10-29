// Example component using SCSS modules
// This demonstrates the hybrid approach: Tailwind + SCSS modules

import styles from './ExampleButton.module.scss';

interface ExampleButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'default' | 'large';
  onClick?: () => void;
}

export default function ExampleButton({
  children,
  variant = 'primary',
  size = 'default',
  onClick,
}: ExampleButtonProps) {
  const buttonClasses = [
    styles.button,
    styles[variant],
    size !== 'default' && styles[size],
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button onClick={onClick} className={buttonClasses}>
      {children}
    </button>
  );
}
