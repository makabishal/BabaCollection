import * as FileSystem from 'expo-file-system';
import {Asset} from 'expo-asset';
import {Skia, SkImage} from '@shopify/react-native-skia';
import React from "react";
import {ImageSourcePropType} from "react-native";

export const useImageLoader = (
    foregroundImage: ImageSourcePropType,
    backgroundImage: ImageSourcePropType
) => {
    const [foregroundSkImage, setForegroundSkImage] = React.useState<SkImage | null>(null);
    const [backgroundSkImage, setBackgroundSkImage] = React.useState<SkImage | null>(null);

    React.useEffect(() => {
        const loadImages = async () => {
            const fg = await loadLocalImage(foregroundImage);
            const bg = await loadLocalImage(backgroundImage);
            setForegroundSkImage(fg);
            setBackgroundSkImage(bg);
        };
        loadImages();
    }, [foregroundImage, backgroundImage]);

    return {foregroundSkImage, backgroundSkImage};
};

const loadLocalImage = async (source: ImageSourcePropType): Promise<SkImage | null> => {
    try {
        // @ts-ignore
        const asset = Asset.fromModule(source);
        await asset.downloadAsync();

        if (!asset.localUri) {
            throw new Error('Asset localUri not found');
        }

        const base64 = await FileSystem.readAsStringAsync(asset.localUri, {
            encoding: FileSystem.EncodingType.Base64,
        });

        const buffer = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
        const skData = Skia.Data.fromBytes(buffer);
        return Skia.Image.MakeImageFromEncoded(skData);
    } catch (error) {
        console.error('Error loading local image:', error);
        return null;
    }
};