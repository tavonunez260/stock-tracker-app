import { Stock } from '../types';

/**
 * Filters stocks by name or symbol based on a search query.
 * @param stocks - Array of stock objects.
 * @param query - Filter query (case-insensitive).
 * @returns Filtered list of stocks.
 */
export const filterStocks = (stocks: Stock[], query: string): Stock[] => {
    if (!query) return stocks;
    return stocks.filter((stock) =>
        stock.name.toLowerCase().includes(query.toLowerCase()) ||
        stock.symbol.toLowerCase().includes(query.toLowerCase())
    );
};

/**
 * Sorts stocks by a specific key in ascending or descending order.
 * @param stocks - Array of stock objects.
 * @param key - Key to sort by (e.g., 'price', 'daily_change').
 * @param order - Sort order ('asc' or 'desc').
 * @returns Sorted list of stocks.
 */
export const sortStocks = (stocks: Stock[], key: 'price' | 'daily_change', order: 'asc' | 'desc'): Stock[] => {
    return [...stocks].sort((a, b) => {
        if (order === 'asc') {
            return a[key] - b[key];
        } else {
            return b[key] - a[key];
        }
    });
};
