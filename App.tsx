
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { ConfigForm } from './components/ConfigForm';
import { GenerateButton } from './components/GenerateButton';
import { StatusDisplay } from './components/StatusDisplay';
import { ResultsGrid } from './components/ResultsGrid';
import { CostInfo } from './components/CostInfo';
import type { Config, RenderRequest, Status } from './types';
import { generateRenders } from './services/api';
import { CONFIG_OPTIONS, MAX_FILE_SIZE_BYTES, MAX_FILE_SIZE_MB } from './constants';

const App: React.FC = () => {
    const [uploadedImage, setUploadedImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [config, setConfig] = useState<Config>({
        roomType: CONFIG_OPTIONS.roomTypes[0].value,
        wallColor: CONFIG_OPTIONS.wallColors[0].value,
        flooringType: CONFIG_OPTIONS.flooringTypes[0].value,
        style: CONFIG_OPTIONS.designStyles[0].value,
        numVariations: 3,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<Status | null>(null);
    const [results, setResults] = useState<string[]>([]);

    const handleImageChange = (file: File | null) => {
        if (file) {
            if (file.size > MAX_FILE_SIZE_BYTES) {
                setStatus({
                    type: 'error',
                    message: `Image file is too large. Please upload an image smaller than ${MAX_FILE_SIZE_MB}MB.`
                });
                setUploadedImage(null);
                setPreviewUrl(null);
                return;
            }

            setStatus(null); // Clear previous errors
            setUploadedImage(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewUrl(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setUploadedImage(null);
            setPreviewUrl(null);
        }
    };
    
    const handleConfigChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setConfig(prev => ({ ...prev, [name]: name === 'numVariations' ? parseInt(value) : value }));
    };

    const handleGenerateClick = useCallback(async () => {
        if (!uploadedImage || !previewUrl) {
            setStatus({ type: 'error', message: 'Please upload a floorplan image first.' });
            return;
        }

        setIsLoading(true);
        setResults([]);
        setStatus({
            type: 'loading',
            message: `Generating ${config.numVariations} render${config.numVariations > 1 ? 's' : ''} with Gemini...`,
        });

        try {
            const request: RenderRequest = {
                image_url: previewUrl,
                image_file: uploadedImage,
                ...config
            };

            const response = await generateRenders(request);

            if (response.success && response.renders && response.renders.length > 0) {
                setResults(response.renders);
                setStatus({
                    type: 'success',
                    message: `Generated ${response.renders.length} renders successfully in ${response.generation_time}s!`,
                });
            } else {
                 setStatus({ type: 'error', message: `Error: ${response.error || 'Failed to generate renders. Please try again.'}` });
            }
        } catch (error) {
            console.error('API Request Failed:', error);
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
            setStatus({ type: 'error', message: `API Error: ${errorMessage}` });
        } finally {
            setIsLoading(false);
        }
    }, [previewUrl, uploadedImage, config]);

    return (
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 min-h-screen p-4 sm:p-6 lg:p-8">
            <div className="container mx-auto max-w-6xl bg-white rounded-2xl shadow-2xl shadow-indigo-200/50 p-6 sm:p-10">
                <Header />
                <main>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        <div className="flex flex-col space-y-8">
                            <ImageUploader 
                                previewUrl={previewUrl} 
                                onImageChange={handleImageChange} 
                            />
                             {status && status.type === 'error' && !isLoading && <StatusDisplay status={status} />}
                            <ConfigForm 
                                config={config}
                                onConfigChange={handleConfigChange}
                            />
                        </div>
                        <div className="flex flex-col space-y-6">
                           <div className="flex-grow">
                                <GenerateButton 
                                    onClick={handleGenerateClick}
                                    disabled={!previewUrl || isLoading}
                                    isLoading={isLoading}
                                />
                                {status && (status.type !== 'error' || isLoading) && <StatusDisplay status={status} />}
                                {results.length > 0 && !isLoading && <ResultsGrid renders={results} />}
                            </div>
                            <CostInfo />
                        </div>
                    </div>
                </main>
            </div>
             <footer className="text-center text-sm text-gray-500 mt-8">
                <p>Powered by Google Gemini. Designed for architects and dreamers.</p>
            </footer>
        </div>
    );
};

export default App;