
import React from 'react';

interface LoadingIndicatorProps {
  isUpdating: boolean;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ isUpdating }) => {
  if (!isUpdating) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-lumen-blue text-white px-4 py-2 rounded-lg shadow-lg">
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        <span>Salvando alterações...</span>
      </div>
    </div>
  );
};

export default LoadingIndicator;
