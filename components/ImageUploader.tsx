
import React, { useCallback, useState } from 'react';
import { UploadIcon, XCircleIcon } from './icons/Icons';

interface ImageUploaderProps {
    previewUrl: string | null;
    onImageChange: (file: File | null) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ previewUrl, onImageChange }) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleFile = useCallback((file: File | null) => {
        if (file && file.type.startsWith('image/')) {
            onImageChange(file);
        }
    }, [onImageChange]);

    const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    }, [handleFile]);

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    if (previewUrl) {
        return (
            <div className="relative group">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">📷 Uploaded Floorplan</h3>
                <img src={previewUrl} alt="Floorplan Preview" className="w-full h-auto rounded-xl border-2 border-gray-200 object-contain max-h-80" />
                <button
                    onClick={() => onImageChange(null)}
                    className="absolute top-2 right-2 p-1.5 bg-white/70 rounded-full text-gray-600 hover:bg-white hover:text-red-500 transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100"
                    aria-label="Remove image"
                >
                    <XCircleIcon className="h-7 w-7" />
                </button>
            </div>
        );
    }

    return (
        <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-3">1. Upload your Floorplan</h3>
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50'}`}
                onClick={() => document.getElementById('file-input')?.click()}
            >
                <input type="file" id="file-input" accept="image/jpeg, image/png" className="hidden" onChange={handleFileInput} />
                <div className="flex flex-col items-center text-gray-500">
                    <UploadIcon className="h-12 w-12 mb-3 text-gray-400" />
                    <p className="font-semibold">Drag & drop your floorplan here</p>
                    <p className="text-sm mt-1">or click to browse (JPG, PNG)</p>
                </div>
            </div>
        </div>
    );
};
