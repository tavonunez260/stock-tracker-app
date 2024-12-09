import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

import stockData from '../data/dummy_stock_data.json';
import { HomeScreenProps, Stock } from "../types";

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    const [stocks, setStocks] = useState<Stock[]>([]);
    const [filteredStocks, setFilteredStocks] = useState<Stock[]>([]);
    const [filter, setFilter] = useState<string>('');

    const handleFilter = (text: string) => {
        setFilter(text);
        const filtered = stocks.filter((stock) =>
            stock.name.toLowerCase().includes(text.toLowerCase()) ||
            stock.symbol.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredStocks(filtered);
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

            <FlatList
                data={filteredStocks}
                keyExtractor={(item) => item.symbol}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.item}
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
    item: { padding: 16, borderBottomWidth: 1, borderColor: '#ddd' },
    name: { fontSize: 16, fontWeight: 'bold' },
    price: { fontSize: 14 },
    change: { fontSize: 14 },
});
