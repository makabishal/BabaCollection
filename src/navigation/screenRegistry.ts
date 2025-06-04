import React from "react";
import SecretSurpriseScreen from "@screens/SecretSurprise/SecretSurpriseScreen";
import TruthOrDareGameScreen from "@screens/TruthOrDare/TruthOrDareGameScreen";

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
    // Add other screens here
};
