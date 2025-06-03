import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import * as ScreenRegistry from '../navigation/screenRegistry';
import {Ionicons} from "@expo/vector-icons";
import Colors from "../theme/colors";

const HomeScreen = () => {
    const navigation = useNavigation();
    const screens = Object.values(ScreenRegistry.screens);

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Ionicons name="heart" size={24} color={Colors.title}/>
                <Text style={styles.title}>Love Lounge</Text>
                <Ionicons name="heart" size={24} color={Colors.title}/>
            </View>

            {screens.map((screen) => (
                <TouchableOpacity
                    key={screen.name}
                    style={styles.button}
                    // @ts-ignore
                    onPress={() => navigation.navigate(screen.name)}
                >
                    <Text style={styles.buttonText}>{screen.title}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.background,

    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: "20%",
        gap: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: "center",
        color: Colors.title,
    },
    button: {
        backgroundColor: Colors.title,
        padding: 16,
        borderRadius: 8,
        marginVertical: 8,
    },
    buttonText: {
        color: Colors.background,
        textAlign: 'center',
        fontWeight: '600',
    },
});

export default HomeScreen;
