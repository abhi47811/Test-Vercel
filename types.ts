
// FIX: Import ReactNode to resolve the 'Cannot find namespace React' error.
import type { ReactNode } from 'react';

export interface Config {
    roomType: string;
    wallColor: string;
    flooringType: string;
    style: string;
    numVariations: number;
}

export interface RenderRequest extends Config {
    image_url: string; // Kept for preview URL management
    image_file: File;
}

export interface RenderResponse {
    success: boolean;
    renders?: string[];
    generation_time?: number;
    error?: string;
}

export interface Status {
    type: 'loading' | 'success' | 'error';
    message: string | ReactNode;
}