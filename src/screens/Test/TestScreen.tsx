import {StyleSheet, View, Text, Button, Vibration} from 'react-native';

import { useAudioPlayer } from 'expo-audio';
import {useEffect} from "react";

const audioSource = require('../../assets/alarm-sound.mp3');

export default function TestScreen() {
    const player = useAudioPlayer(audioSource);

    return (
        <View style={styles.container}>
            <Button title="Play Sound" onPress={() => player.play()} />
            <Button
                title="Replay Sound"
                onPress={() => {
                    player.seekTo(0);
                    player.play();
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        padding: 10,
    },
});

// // Play sound or vibrate on complete
// useEffect(() => {
//     if (status === 'done') {
//         try {
//             player.seekTo(0);
//             player.play();
//             const stopTimeout = setTimeout(() => {
//                 player.pause();
//             }, 3000);
//             return () => clearTimeout(stopTimeout);
//         } catch (e) {
//             console.warn('Audio failed, falling back to vibration');
//             Vibration.vibrate([0, 500, 500, 500]);
//         }
//     }
// }, [status]);