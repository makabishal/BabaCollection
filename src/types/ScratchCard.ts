// types/ScratchCard.ts
export interface ScratchCardProps {
    foregroundImageUri: string;
    backgroundImageUri: string;
    width?: number;
    height?: number;
    scratchRadius?: number;
    completionThreshold?: number;
    onComplete?: () => void;
    style?: any;
}

export interface ScratchPosition {
    x: number;
    y: number;
}
