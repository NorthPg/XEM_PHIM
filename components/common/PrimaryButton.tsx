import React from 'react';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'md' | 'lg';
  icon?: React.ReactNode;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  variant = 'primary',
  size = 'lg',
  icon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed select-none shadow-sm cursor-pointer";

  const sizeStyles =
    size === 'lg'
      ? "px-7 py-3.5 text-base md:text-lg min-h-[48px]"
      : "px-5 py-2.5 text-sm md:text-base min-h-[40px]";

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-[#C9829B] to-[#d893ab] text-white hover:brightness-105 hover:shadow-md hover:shadow-[#C9829B]/25 border border-white/30",
    secondary:
      "bg-[#FFF9F1] text-[#51433F] hover:bg-[#F5DDE5]/50 border border-[#C9829B]/30 hover:border-[#C9829B]/60",
    ghost:
      "bg-transparent text-[#51433F]/80 hover:text-[#51433F] hover:bg-[#F5DDE5]/30 border border-transparent",
  }[variant];

  return (
    <button
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      disabled={disabled}
      {...props}
    >
      <span>{children}</span>
      {icon && <span className="ml-2 inline-flex items-center">{icon}</span>}
    </button>
  );
};

export default PrimaryButton;
