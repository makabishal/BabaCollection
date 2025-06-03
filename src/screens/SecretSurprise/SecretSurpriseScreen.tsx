import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScratchCard } from '@components/ScratchCard';
import { getRandomBackgroundImage } from '../../assets/ScratchCardImages';
import Colors from "../../theme/colors";

const SecretSurpriseScreen = () => {
    const { name, image } = getRandomBackgroundImage();

    const [key, setKey] = useState(0);

    const handleReload = () => {
        setKey(prev => prev + 1);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.reloadButton} onPress={handleReload}>
                <Ionicons name="refresh" size={24} backgroundColor={Colors.title}/>
            </TouchableOpacity>

            <ScratchCard
                key={key}
                foregroundImage={require('../../assets/scratch-pattern.jpg')}
                backgroundImage={image}
                positionName={name}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: Colors.background,
    },
    reloadButton: {
        position: 'absolute',
        top: 80,
        right: 20,
        zIndex: 10,
        backgroundColor: Colors.title,
        padding: 8,
        borderRadius: 24,
        elevation: 5,
    },
});

export default SecretSurpriseScreen;
