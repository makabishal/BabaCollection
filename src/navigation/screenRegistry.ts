import React from "react";
import SecretSurpriseScreen from "@screens/SecretSurprise/SecretSurpriseScreen";
import TruthOrDareGameScreen from "@screens/TruthOrDare/TruthOrDareGameScreen";

type Screen = {
    name: string;
    component: React.ComponentType<any>;
    title: string;
};

export const screens: Record<string, Screen> = {
    SkiaTest:{
        name:'Secret Surprise',
        component:SecretSurpriseScreen,
        title:'Secret Surprise',
    },
    Test: {
        name: 'Truth Or Dare',
        component: TruthOrDareGameScreen,
        title: 'Truth Or Dare',
    },
    // Add other screens here
};
