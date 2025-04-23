import React, { useState } from "react";

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
  glowEffect = true,
  animated = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    xs: "px-3 py-1.5 text-xs",
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-3.5 text-lg",
  };

  // Custom styles for the button
  const buttonStyle = {
    backgroundColor: variant === "primary" ? color : "transparent",
    color: textColor,
    position: "relative",
  };

  // The hover effects will be handled by Tailwind classes and inline styles
  const glowStyles =
    isHovered && glowEffect
      ? {
          boxShadow: `0 0 20px 5px ${textColor}30`,
        }
      : {};

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{ ...buttonStyle, ...glowStyles }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
      {/* Background glow and noise texture */}
      <span className="absolute inset-0 bg-gradient-to-br from-[#2b7fff]/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></span>

      {/* Animated gradient border */}
      {animated && (
        <span className="absolute inset-0 rounded-lg overflow-hidden">
          <span className="absolute inset-0 rounded-lg border border-[#2b7fff]/30 opacity-0 group-hover:opacity-100"></span>
          <span
            className="absolute -top-1 -bottom-1 -left-1 -right-1 bg-gradient-to-r from-[#2b7fff] via-purple-500 to-[#2b7fff] opacity-0 group-hover:opacity-100 blur-md"
            style={{
              backgroundSize: "300% 100%",
              animation: isHovered ? "shimmer 3s infinite" : "none",
            }}
          ></span>
        </span>
      )}

      <style jsx="true">{`
        @keyframes shimmer {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        @keyframes pulse {
          0% {
            transform: scale(0.95);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(0.95);
          }
        }
      `}</style>

      {/* Content wrapper with ripple effect */}
      <span className="relative flex items-center space-x-3 z-10">
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

        {/* Bottom line animation */}
        <span className="absolute -bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-[#2b7fff] to-purple-500 group-hover:w-3/4 group-hover:-translate-x-1/2 transition-all duration-300"></span>

        {/* Ripple effect on click - would require JavaScript implementation */}
      </span>
    </button>
  );
};

export default Button;
