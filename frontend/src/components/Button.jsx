import React from "react";

const Button = ({
  children,
  onClick,
  className = "",
  color = "#031d2e",
  textColor = "#2b7fff",
  disabled = false,
  type = "button",
  size = "md",
  variant = "primary",
  icon = null,
  iconPosition = "right",
}) => {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-3.5 text-lg",
  };

  // Custom styles for the button
  const buttonStyle = {
    backgroundColor: variant === "primary" ? color : "transparent",
    color: textColor,
  };

  // The hover effects will be handled by Tailwind classes

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={buttonStyle}
      className={`
        group relative inline-flex items-center justify-center overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300
        ${
          variant === "primary"
            ? "border border-opacity-20 hover:border-opacity-50"
            : ""
        }
        ${
          variant === "outline"
            ? "border border-opacity-50 hover:border-opacity-100"
            : ""
        }
        ${variant === "ghost" ? "" : ""}
        ${sizeClasses[size]}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
    >
      <span className="absolute inset-0 bg-gradient-to-br from-[#2b7fff]/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></span>
      <span className="relative flex items-center space-x-3">
        {icon && iconPosition === "left" && (
          <span className="transform group-hover:translate-x-0.5 transition-all duration-300 ease-out">
            {icon}
          </span>
        )}

        {children && (
          <span className="font-medium transition-colors">{children}</span>
        )}

        {icon && iconPosition === "right" && (
          <span className="transform group-hover:translate-x-0.5 transition-all duration-300 ease-out">
            {icon}
          </span>
        )}

        {!icon && !children && icon}

        <span className="absolute -bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-[#2b7fff] to-purple-500 group-hover:w-3/4 group-hover:-translate-x-1/2 transition-all duration-300"></span>
      </span>
    </button>
  );
};

export default Button;
