import {StyleSheet} from 'react-native';

export const useStyles = () =>
    StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
        },
        canvasWrapper: {
            width: 300,
            height: 300,
            borderRadius: 150,
            overflow: 'hidden',
            backgroundColor: '#ccc',
        },
        canvas: {
            flex: 1,
        },
        congratsText: {
            marginTop: 30,
            fontSize: 20,
            fontWeight: 'bold',
            color: '#FFA500',
        },
        resetButton: {
            marginTop: 20,
            paddingVertical: 10,
            paddingHorizontal: 20,
            backgroundColor: '#007AFF',
            borderRadius: 8,
        },
        resetButtonText: {
            color: 'white',
            fontSize: 16,
        },
        progressContainer: {
            marginTop: 20,
            alignItems: 'center',
        },
        progressText: {
            fontSize: 14,
            color: '#FFA500',
            marginBottom: 8,
        },
        progressBar: {
            width: 200,
            height: 8,
            backgroundColor: '#e5e7eb',
            borderRadius: 4,
        },
        progressFill: {
            height: '100%',
            backgroundColor: '#FFA500',
            borderRadius: 4,
        },
    });