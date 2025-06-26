import { Check } from "lucide-react";

interface ButtonConfig {
  text: string;
  variant: "primary" | "outline";
  icon?: "check";
  onClick?: () => void;
}

interface ActionButtonsProps {
  leftButton?: ButtonConfig;
  rightButtons: ButtonConfig[];
}

export function ActionButtons({ leftButton, rightButtons }: ActionButtonsProps) {
  const getButtonClasses = (variant: string) => {
    if (variant === "primary") {
      return "px-4 py-2 bg-lumen-blue text-white rounded-md hover:bg-lumen-blue/90 font-medium transition-colors";
    }
    return "px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium transition-colors";
  };

  const getOutlineButtonClasses = (variant: string) => {
    if (variant === "outline") {
      return "px-4 py-2 border border-lumen-blue text-lumen-blue rounded-md hover:bg-gray-50 font-medium transition-colors";
    }
    return getButtonClasses(variant);
  };

  return (
    <div className="flex justify-between items-center mt-8 mb-12">
      {leftButton && (
        <button 
          className={getButtonClasses(leftButton.variant)}
          onClick={leftButton.onClick}
        >
          {leftButton.text}
        </button>
      )}
      
      <div className="flex space-x-4">
        {rightButtons.map((button, index) => (
          <button 
            key={index}
            className={index === 0 ? getOutlineButtonClasses(button.variant) : getButtonClasses(button.variant)}
            onClick={button.onClick}
          >
            <div className="flex items-center">
              {button.icon === "check" && <Check className="w-5 h-5 mr-2" />}
              {button.text}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
