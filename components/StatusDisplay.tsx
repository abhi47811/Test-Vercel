
import React from 'react';
import type { Status } from '../types';
import { CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon } from './icons/Icons';

interface StatusDisplayProps {
    status: Status;
}

const statusStyles = {
    loading: {
        bg: 'bg-blue-50',
        border: 'border-blue-500',
        text: 'text-blue-800',
        icon: <InformationCircleIcon className="h-5 w-5 text-blue-500" />
    },
    success: {
        bg: 'bg-green-50',
        border: 'border-green-500',
        text: 'text-green-800',
        icon: <CheckCircleIcon className="h-5 w-5 text-green-500" />
    },
    error: {
        bg: 'bg-red-50',
        border: 'border-red-500',
        text: 'text-red-800',
        icon: <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
    },
};

export const StatusDisplay: React.FC<StatusDisplayProps> = ({ status }) => {
    const styles = statusStyles[status.type];

    return (
        <div className={`mt-6 p-4 border-l-4 rounded-r-lg ${styles.bg} ${styles.border}`} role="alert">
            <div className="flex">
                <div className="py-1">{styles.icon}</div>
                <div className="ml-3">
                    <p className={`text-sm ${styles.text}`}>
                        {status.message}
                    </p>
                </div>
            </div>
        </div>
    );
};
