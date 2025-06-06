import React from "react";
import SecretSurpriseScreen from "@screens/SecretSurprise/SecretSurpriseScreen";
import TruthOrDareGameScreen from "@screens/TruthOrDare/TruthOrDareGameScreen";
import ThisOrThat from "@screens/ThisOrThat/ThisOrThat";
import ThisOrThatTimerScreen from "@screens/ThisOrThat/ThisOrThatTimerScreen";
import TestScreen from "@screens/Test/TestScreen";

type Screen = {
    name: string;
    component: React.ComponentType<any>;
    title: string;
};

export const screens: Record<string, Screen> = {
    SecretSurprise:{
        name:'Secret Surprise',
        component:SecretSurpriseScreen,
        title:'Secret Surprise',
    },
    DareMeBaby: {
        name: 'Dare Me Baby',
        component: TruthOrDareGameScreen,
        title: 'Dare Me Baby',
    },
    ThisOrThat: {
        name: 'This Or That',
        component: ThisOrThat,
        title: 'This Or That',
    },
    // TestScreen: {
    //     name: 'Test Screen',
    //     component: TestScreen,
    //     title: 'Test Screen',
    // },
    // Add other screens here
};
