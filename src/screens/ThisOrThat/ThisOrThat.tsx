import React, {useMemo, useState} from 'react';
import {Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ThisOrThatGameData} from '../../data/this-or-that-gameData'
import Colors from "../../theme/colors";
import {Ionicons} from "@expo/vector-icons";

export default function ThisOrThat() {
    const navigation = useNavigation<any>();
    const [refreshKey, setRefreshKey] = useState(0);

    const randomQuestion = useMemo(() => {
        return ThisOrThatGameData[Math.floor(Math.random() * ThisOrThatGameData.length)];
    }, [refreshKey]);

    const handleChoice = (choice: string) => {
        navigation.navigate('ThisOrThatTimerScreen', {option: choice});
    };

    const handleReload = () => {
        setRefreshKey(prev => prev + 1);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.reloadButton} onPress={handleReload}>
                <Ionicons name="refresh" size={24} backgroundColor={Colors.title}/>
            </TouchableOpacity>
            <Text style={styles.gameTitle}>This or That (Love Edition)</Text>
            <Text style={styles.question}>{randomQuestion.question}</Text>

            <View style={styles.choicesRow}>
                {randomQuestion.choices.map((choice) => (
                    <Pressable
                        key={choice}
                        style={({pressed}) => [styles.choiceBtn, pressed && {opacity: 0.7}]}
                        onPress={() => handleChoice(choice)}
                    >
                        <Text style={styles.choiceText}>{choice}</Text>
                    </Pressable>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 12,
        backgroundColor: Colors.background,
    },
    gameTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 32,
        color: Colors.title,
        textAlign: 'center',
    },
    question: {
        fontSize: 22,
        textAlign: 'center',
        marginBottom: 40,
        color: Colors.title,
    },
    choicesRow: {

    },
    choiceBtn: {
        backgroundColor: Colors.title,
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 12,
        minWidth: 120,
        alignItems: 'center',
        marginBottom: 16,
    },
    choiceText: {
        color: Colors.text,
        fontWeight: 'bold',
        fontSize: 18,
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