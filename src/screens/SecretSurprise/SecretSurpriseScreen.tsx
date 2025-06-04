import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {ScratchCard} from '@components/ScratchCard';
import {getRandomBackgroundImage} from '../../assets/ScratchCardImages';
import Colors from "../../theme/colors";

const SecretSurpriseScreen = () => {
    const {name, image} = getRandomBackgroundImage();

    const [key, setKey] = useState(0);

    const handleReload = () => {
        setKey(prev => prev + 1);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.reloadButton} onPress={handleReload}>
                <Ionicons name="refresh" size={24} backgroundColor={Colors.title}/>
            </TouchableOpacity>

            <View style={styles.mainContainer}>
                <Text style={styles.label}>Scratch the field with your finger</Text>

                <ScratchCard
                    key={key}
                    foregroundImage={Image.resolveAssetSource(
                        require('../../assets/scratch-pattern.jpg')
                    )}
                    backgroundImage={image}
                    positionName={name}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: Colors.background,
    },
    mainContainer: {
        flex: 1, justifyContent: 'center', alignItems: 'center', gap: 32
    },
    label: {
        fontSize: 20, fontWeight: 'bold', color: Colors.title, textAlign: "center"
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
