import React, { useEffect, useState } from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';

import stockData from '../data/dummy_stock_data.json';
import { HomeScreenProps, Stock } from "../types";

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
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
    item: { padding: 16, borderBottomWidth: 1, borderColor: '#ddd' },
    name: { fontSize: 16, fontWeight: 'bold' },
    price: { fontSize: 14 },
    change: { fontSize: 14 },
});
