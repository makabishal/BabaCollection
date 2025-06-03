import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {Canvas, Group, Image as SkiaImage, Mask, Path, Rect,} from '@shopify/react-native-skia';
import {useImageLoader} from './useImageLoader';
import {useScratchPath} from './useScratchPath';
import {ScratchCardProps} from './types';

import {useStyles} from './styles';


interface Props extends ScratchCardProps {
    width?: number;
    height?: number;
    threshold?: number;
    positionName: string;
}

export const ScratchCardComponent: React.FC<Props> = ({
                                                          foregroundImage,
                                                          backgroundImage,
                                                          width = 300,
                                                          height = 300,
    positionName
                                                      }) => {

    const styles = useStyles();
    const [canvasSize, setCanvasSize] = useState({width: 0, height: 0});
    const {foregroundSkImage, backgroundSkImage} = useImageLoader(foregroundImage, backgroundImage);
    const {path, handleTouchStart, handleTouchMove, handleTouchEnd, isScratched, progress} =
        useScratchPath(canvasSize);

    return (
        <View style={styles.container}>
            {/* Canvas Wrapper */}
            <View
                style={[styles.canvasWrapper, {width, height}]}
                onLayout={(e) => {
                    const {width, height} = e.nativeEvent.layout;
                    setCanvasSize({width, height});
                }}
            >
                <Canvas
                    style={styles.canvas}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    {/* Background Image */}
                    <SkiaImage image={backgroundSkImage} x={0} y={0} width={width} height={height}/>

                    {/* Masked Foreground Image */}
                    {!isScratched && (
                        <Mask
                            mode="luminance"
                            mask={
                                <Group>
                                    <Rect x={0} y={0} width={width} height={height} color="white"/>
                                    <Path
                                        path={path.current}
                                        color="black"
                                        style="stroke"
                                        strokeWidth={25}
                                        strokeCap="round"
                                        strokeJoin="round"
                                    />
                                </Group>
                            }
                        >
                            <SkiaImage image={foregroundSkImage} x={0} y={0} width={width} height={height}/>
                        </Mask>
                    )}
                </Canvas>
            </View>

            {/* Progress Bar */}
            {!isScratched && (
                <View style={styles.progressContainer}>
                    <Text style={styles.progressText}>Scratched: {Math.round(progress)}%</Text>
                    <View style={styles.progressBar}>
                        <View style={[styles.progressFill, {width: `${progress}%`}]}/>
                    </View>
                </View>
            )}

            {/* Congratulations Message */}
            {isScratched && <Text style={styles.congratsText}>{positionName}</Text>}

        </View>
    );
};