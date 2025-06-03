import 'expo-dev-client';
import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Navigation from './src/navigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView} from "react-native-safe-area-context";
import { StatusBar } from 'expo-status-bar';
import Colors from './src/theme/colors';



const windowInitial = Dimensions.get('window');

export default function App() {
    const [dimensions, setDimensions] = useState({window: windowInitial});

    useEffect(() => {
        const subscription = Dimensions.addEventListener('change', ({window}) => {
            setDimensions({window});
        });
        return () => subscription?.remove();
    }, []);

    return (
        <GestureHandlerRootView style={styles.root}>
            <SafeAreaView style={{flex: 1, backgroundColor: Colors.background}} edges={['top', 'right', 'left']}>
                <StatusBar translucent backgroundColor="transparent" style="light" />
                <Navigation/>
            </SafeAreaView>
        </GestureHandlerRootView>
    );
}


const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
});
