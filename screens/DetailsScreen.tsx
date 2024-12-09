import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Stock } from "../types";

export const DetailsScreen = ({ route }: { route: { params: { stock: Stock } } }) => {
    const { stock } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Stock Details</Text>
            <Text>Symbol: {stock.symbol}</Text>
            <Text>Name: {stock.name}</Text>
            <Text>Price: ${stock.price}</Text>
            <Text>Daily Change: {stock.daily_change}%</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
});
