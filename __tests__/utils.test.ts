import { filterStocks, sortStocks } from '../utils';
import { Stock } from '../types';

const mockStocks: Stock[] = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 175, daily_change: 1.5 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2800, daily_change: -0.5 },
    { symbol: 'AMZN', name: 'Amazon.com, Inc.', price: 3457, daily_change: 2.3 },
];

describe('filterStocks', () => {
    it('should return stocks that match the filter query', () => {
        const result = filterStocks(mockStocks, 'Apple');
        expect(result).toEqual([{ symbol: 'AAPL', name: 'Apple Inc.', price: 175, daily_change: 1.5 }]);
    });

    it('should return all stocks when the filter query is empty', () => {
        const result = filterStocks(mockStocks, '');
        expect(result).toEqual(mockStocks);
    });
});

describe('sortStocks', () => {
    it('should sort stocks by price in ascending order', () => {
        const result = sortStocks(mockStocks, 'price', 'asc');
        expect(result[0].price).toBe(175);
    });

    it('should sort stocks by daily change in descending order', () => {
        const result = sortStocks(mockStocks, 'daily_change', 'desc');
        expect(result[0].daily_change).toBe(2.3);
    });
});
