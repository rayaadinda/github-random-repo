import React from 'react';

const LoadingState = () => {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      <span className="ml-2 text-gray-600 dark:text-gray-300">Loading, please wait...</span>
    </div>
  );
};

export default LoadingState;
