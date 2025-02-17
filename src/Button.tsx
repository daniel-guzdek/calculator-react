import React from "react";

interface IButtonProps {
  label: string | React.ReactNode;
  value?: string | number | null | undefined;
  className: string;
  handler: (value: string | number | null | undefined) => void;
}

const Button: React.FC<IButtonProps> = ({
  label,
  value,
  className,
  handler,
}) => {
  return (
    <div className={className} onClick={() => handler(value)}>
      {label}
    </div>
  );
};

export default Button;
