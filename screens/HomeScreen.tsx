import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

import stockData from '../data/dummy_stock_data.json';
import { Stock } from "../types";

export const HomeScreen = () => {
    const [stocks, setStocks] = useState<Stock[]>([]);

    useEffect(() => {
        setStocks(stockData.stocks);
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={stocks}
                keyExtractor={(item) => item.symbol}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
                        <Text
                            style={[
                                styles.change,
                                { color: item.daily_change > 0 ? 'green' : 'red' },
                            ]}
                        >
                            {item.daily_change.toFixed(2)}%
                        </Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    item: { padding: 16, borderBottomWidth: 1, borderColor: '#ddd' },
    name: { fontSize: 16, fontWeight: 'bold' },
    price: { fontSize: 14 },
    change: { fontSize: 14 },
});
