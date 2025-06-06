import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Pressable, StyleSheet, Text, Vibration, View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import Colors from "../../theme/colors";
import {useAudioPlayer} from "expo-audio";

interface RouteParams {
    option: string;
}

const DURATIONS = [60, 120, 300]; // in seconds => 1, 2, 5 minutes

const alarmSound = require('../../assets/alarm-sound.mp3');

export default function OptionScreen() {
    const {params} = useRoute<any>();
    const {option} = params as RouteParams;

    const [selectedDuration, setSelectedDuration] = useState<number>(60);
    const [remaining, setRemaining] = useState<number>(0);
    const [status, setStatus] = useState<'idle' | 'running' | 'done'>('idle');
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const player = useAudioPlayer(alarmSound);

    useEffect(() => {
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    const startTimer = () => {
        if (status === 'done') {
            setRemaining(0);
            setStatus('idle');
            return;
        }

        if (status === 'running') return;

        setRemaining(selectedDuration);
        setStatus('running');
    };

    useEffect(() => {
        if (status === 'running') {
            intervalRef.current = setInterval(() => {
                setRemaining((prev) => {
                    if (prev <= 1) {
                        clearInterval(intervalRef.current as any);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [status]);

    useEffect(() => {
        if (status === 'running' && remaining === 0) {
            setStatus('done');
        }
    }, [remaining, status]);

    useEffect(() => {
        if (status === 'done') {
            try {
                player.seekTo(0).then(() => {
                });
                player.play();
                const stopTimeout = setTimeout(() => {
                    player.pause();
                }, 3000);
                return () => clearTimeout(stopTimeout);
            } catch (e) {
                console.warn('Audio failed, falling back to vibration');
                Vibration.vibrate([0, 500, 500, 500]);
            }
        }
    }, [status]);

    const formatTime = useCallback((sec: number) => {
        const m = Math.floor(sec / 60)
            .toString()
            .padStart(2, '0');
        const s = (sec % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.optionTitle}>{option}</Text>

            <View style={styles.durationRow}>
                {DURATIONS.map((d) => {
                    const isSelected = selectedDuration === d;
                    const disabled = status === 'running';
                    return (
                        <Pressable
                            key={d}
                            onPress={() => !disabled && setSelectedDuration(d)}
                            style={({pressed}) => [
                                styles.durationBtn,
                                {marginRight: 16},
                                isSelected && styles.durationSelected,
                                disabled && {opacity: 0.5},
                                pressed && !disabled && {opacity: 0.7},
                            ]}
                        >
                            <Text style={styles.durationText}>{Math.floor(d / 60)} min</Text>
                        </Pressable>
                    );
                })}
            </View>

            <Pressable
                onPress={startTimer}
                style={({pressed}) => [styles.startBtn, pressed && {opacity: status !== 'running' ? 0.7 : 1}]}
                disabled={status === 'running'}
            >
                <Text style={styles.startText}>
                    {status === 'idle' && 'Start'}
                    {status === 'running' && 'Running…'}
                    {status === 'done' && 'Restart'}
                </Text>
            </Pressable>

            <Text style={styles.timerDisplay}>{formatTime(remaining)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 80,
        backgroundColor: Colors.background,
    },
    optionTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 40,
        color: Colors.title,
    },
    durationRow: {
        flexDirection: 'row',
        marginBottom: 32,
    },
    durationBtn: {
        backgroundColor: Colors.title,
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 10,
    },
    durationSelected: {
        backgroundColor: '#66bb6a',
    },
    durationText: {
        color: Colors.text,
        fontWeight: 'bold',
        fontSize: 16,
    },
    startBtn: {
        backgroundColor: Colors.title,
        paddingVertical: 16,
        paddingHorizontal: 64,
        borderRadius: 14,
        marginBottom: 24,
    },
    startText: {
        color: Colors.text,
        fontSize: 18,
        fontWeight: 'bold',
    },
    timerDisplay: {
        fontSize: 48,
        fontVariant: ['tabular-nums'],
        color: Colors.text,
        marginBottom: 32,
    },
});