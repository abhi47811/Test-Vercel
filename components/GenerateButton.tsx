
import React from 'react';
import { SparklesIcon } from './icons/Icons';

interface GenerateButtonProps {
    onClick: () => void;
    disabled: boolean;
    isLoading: boolean;
}

export const GenerateButton: React.FC<GenerateButtonProps> = ({ onClick, disabled, isLoading }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="w-full flex items-center justify-center p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-indigo-400/50 transition-all duration-300 transform hover:-translate-y-0.5 disabled:bg-gray-400 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
        >
            {isLoading ? (
                <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                </>
            ) : (
                <>
                    <SparklesIcon className="h-6 w-6 mr-2" />
                    Generate Shell Renders
                </>
            )}
        </button>
    );
};
