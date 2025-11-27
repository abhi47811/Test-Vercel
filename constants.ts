
export const MAX_FILE_SIZE_MB = 5;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export const POSITIVE_PROMPT_TEMPLATE = `Photorealistic 8k architectural render of an empty {style} {room_type} with {wall_color} painted walls and a {flooring_type} floor finish. The image should be based on the provided floorplan layout. The room must be completely empty, with no furniture, decorations, or clutter. Focus on realistic lighting from large windows, creating soft shadows and highlighting detailed wall and floor textures. The style should be clean, spacious, with high ceilings, suitable for an interior design magazine.`;

export const NEGATIVE_PROMPT = `furniture, sofa, chair, table, bed, desk, decorations, plants, artwork, people, clutter, items, objects, accessories, curtains, rugs, lamps, low quality, blurry, distorted, deformed walls, unrealistic proportions, cartoon, anime, painting, sketch, drawing, watermark, text, signature`;


export const CONFIG_OPTIONS = {
    roomTypes: [
        { value: "living room", label: "Living Room" },
        { value: "bedroom", label: "Bedroom" },
        { value: "kitchen", label: "Kitchen" },
        { value: "bathroom", label: "Bathroom" },
        { value: "dining room", label: "Dining Room" },
        { value: "home office", label: "Home Office" },
        { value: "balcony", label: "Balcony" },
    ],
    wallColors: [
        { value: "white", label: "White" },
        { value: "off-white", label: "Off-White" },
        { value: "light grey", label: "Light Grey" },
        { value: "soft beige", label: "Soft Beige" },
        { value: "cream", label: "Cream" },
        { value: "light blue", label: "Light Blue" },
    ],
    flooringTypes: [
        { value: "wooden", label: "Wooden" },
        { value: "light oak wooden", label: "Light Oak Wooden" },
        { value: "dark walnut wooden", label: "Dark Walnut Wooden" },
        { value: "marble", label: "Marble" },
        { value: "polished marble", label: "Polished Marble" },
        { value: "ceramic tiles", label: "Ceramic Tiles" },
        { value: "porcelain tiles", label: "Porcelain Tiles" },
        { value: "polished concrete", label: "Polished Concrete" },
    ],
    designStyles: [
        { value: "modern minimalist", label: "Modern Minimalist" },
        { value: "contemporary", label: "Contemporary" },
        { value: "luxury modern", label: "Luxury Modern" },
        { value: "scandinavian", label: "Scandinavian" },
        { value: "industrial", label: "Industrial" },
        { value: "traditional", label: "Traditional" },
    ],
    numVariations: [
        { value: 1, label: "1 Variation" },
        { value: 2, label: "2 Variations" },
        { value: 3, label: "3 Variations" },
        { value: 4, label: "4 Variations" },
    ],
};