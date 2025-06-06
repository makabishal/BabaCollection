import {useRef, useState} from 'react';
import {GestureResponderEvent} from 'react-native';
import {Skia} from '@shopify/react-native-skia';
import * as Haptics from 'expo-haptics';

export const useScratchPath = (canvasSize: { width: number; height: number }) => {
    const path = useRef(Skia.Path.Make());
    const touchStartRef = useRef<boolean>(false);
    const [progress, setProgress] = useState(0);
    const [isScratched, setIsScratched] = useState(false);

    // Check if touch is inside circle
    const isPointInCircle = (x: number, y: number): boolean => {
        const radius = canvasSize.width / 2;
        const centerX = radius;
        const centerY = radius;

        const dx = x - centerX;
        const dy = y - centerY;
        return dx * dx + dy * dy <= radius * radius;
    };

    const handleTouchStart = (event: GestureResponderEvent) => {
        const {locationX, locationY} = event.nativeEvent;
        if (locationX !== undefined && locationY !== undefined && isPointInCircle(locationX, locationY)) {
            touchStartRef.current = true;
            path.current.moveTo(locationX, locationY);
        }
    };

    let ticking = false;

    const handleTouchMove = (event: GestureResponderEvent) => {
        const {locationX, locationY} = event.nativeEvent;
        if (!touchStartRef.current || locationX === undefined || locationY === undefined) return;

        if (!isPointInCircle(locationX, locationY)) return;

        path.current.lineTo(locationX, locationY);

        // Throttle expensive operations using RAF
        if (!ticking) {
            requestAnimationFrame(() => {
                updateScratchCoverage();
                ticking = false;
            });
            ticking = true;
        }
    };

    const updateScratchCoverage = () => {
        const bounds = path.current.getBounds();

        if (!bounds || bounds.width === 0 || bounds.height === 0) {
            setProgress(0);
            return;
        }

        const totalArea = canvasSize.width * canvasSize.height;
        const coveredArea = bounds.width * bounds.height;
        const coverage = Math.min((coveredArea / totalArea) * 100, 100);
        const roundedProgress = Math.floor(coverage);

        if (roundedProgress !== progress) {
            setProgress(roundedProgress);
        }

        if (roundedProgress >= 60 && !isScratched) {
            setIsScratched(true);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).then(() => {})        }
    };

    const handleTouchEnd = () => {
        touchStartRef.current = false;
    };

    const resetPath = () => {
        path.current.reset();
        setIsScratched(false);
        setProgress(0);
    };

    return {
        path,
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
        isScratched,
        progress,
        resetPath,
    };
};