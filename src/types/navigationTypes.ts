import { StackNavigationOptions } from '@react-navigation/stack';

export interface NavigationState {
    [key: string]: StackNavigationOptions;
}

declare global {
    namespace ReactNavigation {
        interface NavigatorParams {
            // @ts-ignore
            [ScreenName]?: unknown;
        }
    }
}

type ScreenName = keyof typeof import('../navigation/screenRegistry').screens;

export interface NavigationState {
    // @ts-ignore
    [key in ScreenName]: StackNavigationOptions;
}
