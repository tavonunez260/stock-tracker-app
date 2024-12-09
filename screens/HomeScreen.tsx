import React, { useEffect, useState } from 'react';
import {
    Button,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';

import stockData from '../data/dummy_stock_data.json';
import { HomeScreenProps, Stock } from "../types";

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    const [stocks, setStocks] = useState<Stock[]>([]);
    const [filteredStocks, setFilteredStocks] = useState<Stock[]>([]);
    const [filter, setFilter] = useState<string>('');
    const [sortKey, setSortKey] = useState<'price' | 'daily_change' | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);

    const handleFilter = (text: string) => {
        setFilter(text);
        const filtered = stocks.filter((stock) =>
            stock.name.toLowerCase().includes(text.toLowerCase()) ||
            stock.symbol.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredStocks(filtered);
    };

    const handleSort = (key: 'price' | 'daily_change') => {
        if (sortKey === key) {
            if (sortOrder === null) {
                setSortOrder('asc');
                const sorted = [...filteredStocks].sort((a, b) => a[key] - b[key]);
                setFilteredStocks(sorted);
            } else if (sortOrder === 'asc') {
                setSortOrder('desc');
                const sorted = [...filteredStocks].sort((a, b) => b[key] - a[key]);
                setFilteredStocks(sorted);
            } else {
                setSortOrder(null);
                setSortKey(null);
                setFilteredStocks(stocks);
            }
        } else {
            setSortKey(key);
            setSortOrder('asc');
            const sorted = [...filteredStocks].sort((a, b) => a[key] - b[key]);
            setFilteredStocks(sorted);
        }
    };

    useEffect(() => {
        setStocks(stockData.stocks);
        setFilteredStocks(stockData.stocks);
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Stock Tracker</Text>

            <TextInput
                style={styles.input}
                placeholder="Filter by name or symbol"
                value={filter}
                onChangeText={handleFilter}
            />

            <View style={styles.sortButtons}>
                <View style={styles.buttonWrapper}>
                    <Button
                        title={`Sort by Price ${sortKey === 'price' ? (sortOrder === 'asc' ? '▲' : sortOrder === 'desc' ? '▼' : '') : ''}`}
                        onPress={() => handleSort('price')}
                    />
                </View>
                <View style={styles.buttonWrapper}>
                    <Button
                        title={`Sort by Daily Change ${sortKey === 'daily_change' ? (sortOrder === 'asc' ? '▲' : sortOrder === 'desc' ? '▼' : '') : ''}`}
                        onPress={() => handleSort('daily_change')}
                    />
                </View>
            </View>

            <FlatList
                data={filteredStocks}
                keyExtractor={(item) => item.symbol}
                renderItem={({ item }) => (
                    <Animated.View layout={LinearTransition.springify()} style={styles.item}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Details', { stock: item })}
                        >
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.price}>${item.price.toFixed(2)}</Text>
                            <Text
                                style={[styles.change, { color: item.daily_change > 0 ? 'green' : 'red' }]}
                            >
                                {item.daily_change.toFixed(2)}%
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 8,
        marginBottom: 16,
    },
    sortButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    buttonWrapper: {
        flex: 1,
        marginHorizontal: 5,
    },
    item: { padding: 16, borderBottomWidth: 1, borderColor: '#ddd' },
    name: { fontSize: 16, fontWeight: 'bold' },
    price: { fontSize: 14 },
    change: { fontSize: 14 },
});
