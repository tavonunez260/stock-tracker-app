import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import { DetailsScreen } from '../screens';
import { RootStackParamList } from "../types";


describe('<DetailsScreen />', () => {
    it('displays the stock details', () => {
        const mockNavigation = {
            goBack: jest.fn(),
        } as unknown as NativeStackNavigationProp<RootStackParamList, 'Details'>;
        const mockRoute : RouteProp<RootStackParamList, 'Details'> = {
            key: "", name: "Details",
            params: {
                stock: { symbol: 'AAPL', name: 'Apple Inc.', price: 175, daily_change: 1.5 },
            }
        };

        const { getByText } = render(<DetailsScreen navigation={mockNavigation} route={mockRoute} />);
        expect(getByText('Symbol: AAPL')).toBeTruthy();
        expect(getByText('Name: Apple Inc.')).toBeTruthy();
        expect(getByText('Price: $175')).toBeTruthy();
        expect(getByText('Daily Change: 1.5%')).toBeTruthy();
    });

    it('navigates back to the home screen when the back button is pressed', () => {
        const mockNavigation = {
            goBack: jest.fn(),
        } as unknown as NativeStackNavigationProp<RootStackParamList, 'Details'>;
        const mockRoute : RouteProp<RootStackParamList, 'Details'> = {
            key: "", name: "Details",
            params: {
                stock: { symbol: 'AAPL', name: 'Apple Inc.', price: 175, daily_change: 1.5 },
            }
        };

        const { getByTestId } = render(
            <DetailsScreen navigation={mockNavigation} route={mockRoute} />
        );

        const backButton = getByTestId('back-button');
        fireEvent.press(backButton);

        expect(mockNavigation.goBack).toHaveBeenCalled();
    });
});
