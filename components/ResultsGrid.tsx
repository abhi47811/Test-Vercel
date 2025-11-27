
import React from 'react';
import { DownloadIcon } from './icons/Icons';

interface ResultsGridProps {
    renders: string[];
}

export const ResultsGrid: React.FC<ResultsGridProps> = ({ renders }) => {
    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">✨ Generated Renders</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {renders.map((url, index) => (
                    <div key={index} className="result-card group relative border-2 border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                        <img src={url} alt={`Render ${index + 1}`} className="w-full h-auto object-cover aspect-square" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                            <a 
                                href={url} 
                                download={`houspire_render_${index + 1}.png`} 
                                className="flex items-center bg-white/90 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-white transition-colors"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <DownloadIcon className="h-5 w-5 mr-2" />
                                Download
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
