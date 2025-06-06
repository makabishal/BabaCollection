import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import {dares, truths} from "../../data/truth-or-dare-gameData";
import Colors from "../../theme/colors";

type SelectedCategory = 'truth' | 'dare' | null;

const TruthOrDareGameScreen: React.FC = () => {
    const [statement, setStatement] = useState<string>('');
    const [category, setCategory] = useState<SelectedCategory>(null);

    const getRandomItem = (array: string[]) => {
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    };

    const handlePress = (type: 'truth' | 'dare') => {
        const item = type === 'truth' ? getRandomItem(truths) : getRandomItem(dares);
        setStatement(item);
        setCategory(type);
    };

    const handleReload = () => {
        setStatement('');
        setCategory(null);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.reloadButton} onPress={handleReload}>
                <Ionicons name="refresh" size={24} backgroundColor={Colors.title}/>
            </TouchableOpacity>
            <Text style={styles.title}>Truth or Dare</Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, category === 'truth' && styles.selectedButton]}
                    onPress={() => handlePress('truth')}
                >
                    <Text style={styles.buttonText}>Truth</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, category === 'dare' && styles.selectedButton]}
                    onPress={() => handlePress('dare')}
                >
                    <Text style={styles.buttonText}>Dare</Text>
                </TouchableOpacity>
            </View>

            {statement !== '' && (
                <View style={styles.outputBox}>
                    <Text style={styles.outputText}>{statement}</Text>
                </View>
            )}


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: Colors.background,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
        color: Colors.title,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 30,
    },
    button: {
        backgroundColor: Colors.title,
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
    },
    selectedButton: {
        borderColor: '#fff',
        borderWidth: 2,
        backgroundColor: '#66bb6a',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    outputBox: {
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        minHeight: 100,
        justifyContent: 'center',
    },
    outputText: {
        fontSize: 18,
        textAlign: 'center',
        color: '#333',
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

export default TruthOrDareGameScreen;