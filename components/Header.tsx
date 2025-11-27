
import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="text-center mb-10">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 tracking-tight">
                <span className="text-indigo-600">Houspire</span> Shell Render Generator
            </h1>
            <p className="mt-3 text-lg text-gray-500 max-w-3xl mx-auto">
                Transform 2D floorplans into photorealistic 3D room renders—bare shell, no furniture.
            </p>
        </header>
    );
};
