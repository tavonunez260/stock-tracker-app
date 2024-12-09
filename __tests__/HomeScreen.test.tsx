import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { HomeScreen } from '../screens';

jest.mock('../data/dummy_stock_data.json', () => ({
    stocks: [
        { symbol: 'AAPL', name: 'Apple Inc.', price: 175, daily_change: 1.5 },
        { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2800, daily_change: -0.5 },
    ],
}));

describe('<HomeScreen />', () => {
    it('renders the list of stocks', () => {
        const { getByText } = render(<HomeScreen navigation={{ navigate: jest.fn() }} />);
        expect(getByText('Apple Inc.')).toBeTruthy();
        expect(getByText('Alphabet Inc.')).toBeTruthy();
    });

    it('filters stocks based on user input', () => {
        const { getByPlaceholderText, getByText, queryByText } = render(<HomeScreen navigation={{ navigate: jest.fn() }} />);
        const filterInput = getByPlaceholderText('Filter by name or symbol');

        fireEvent.changeText(filterInput, 'Apple');
        expect(getByText('Apple Inc.')).toBeTruthy();
        expect(queryByText('Alphabet Inc.')).toBeNull();
    });

    it('navigates to DetailsScreen when a stock is clicked', () => {
        const mockNavigate = jest.fn();
        const { getByText } = render(<HomeScreen navigation={{ navigate: mockNavigate }} />);

        fireEvent.press(getByText('Apple Inc.'));
        expect(mockNavigate).toHaveBeenCalledWith('Details', { stock: expect.objectContaining({ symbol: 'AAPL' }) });
    });
});
