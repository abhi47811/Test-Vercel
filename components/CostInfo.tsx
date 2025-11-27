
import React from 'react';

const InfoCard: React.FC<{ value: string; label: string }> = ({ value, label }) => (
    <div className="bg-white p-4 rounded-lg text-center border-l-4 border-indigo-500 shadow-sm">
        <div className="text-2xl font-bold text-indigo-600">{value}</div>
        <div className="text-sm text-gray-500 mt-1">{label}</div>
    </div>
);


export const CostInfo: React.FC = () => {
    return (
        <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">✨ Generation Details</h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
                <InfoCard value="Gemini Pro" label="AI Model" />
                <InfoCard value="768px" label="Resolution" />
                <InfoCard value="~25s" label="Avg. Time" />
                <InfoCard value="AI-Powered" label="Technology" />
            </div>
        </div>
    );
};