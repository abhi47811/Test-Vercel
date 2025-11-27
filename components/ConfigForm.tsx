
import React from 'react';
import type { Config } from '../types';
import { CONFIG_OPTIONS } from '../constants';

interface ConfigFormProps {
    config: Config;
    onConfigChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectInput: React.FC<{
    label: string;
    name: keyof Config;
    value: string | number;
    options: { value: string | number; label: string }[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}> = ({ label, name, value, options, onChange }) => (
    <div className="form-group">
        <label htmlFor={name} className="block text-sm font-medium text-gray-600 mb-1">
            {label}
        </label>
        <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
        >
            {options.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
        </select>
    </div>
);


export const ConfigForm: React.FC<ConfigFormProps> = ({ config, onConfigChange }) => {
    return (
        <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-3">2. Configure your Space</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <SelectInput label="Room Type" name="roomType" value={config.roomType} options={CONFIG_OPTIONS.roomTypes} onChange={onConfigChange} />
                <SelectInput label="Wall Color" name="wallColor" value={config.wallColor} options={CONFIG_OPTIONS.wallColors} onChange={onConfigChange} />
                <SelectInput label="Flooring Type" name="flooringType" value={config.flooringType} options={CONFIG_OPTIONS.flooringTypes} onChange={onConfigChange} />
                <SelectInput label="Design Style" name="style" value={config.style} options={CONFIG_OPTIONS.designStyles} onChange={onConfigChange} />
                <div className="sm:col-span-2">
                    <SelectInput label="Number of Variations" name="numVariations" value={config.numVariations} options={CONFIG_OPTIONS.numVariations} onChange={onConfigChange} />
                </div>
            </div>
        </div>
    );
};
