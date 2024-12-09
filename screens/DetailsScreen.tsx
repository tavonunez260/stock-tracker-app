import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import { DetailsScreenProps } from "../types";

export const DetailsScreen: React.FC<DetailsScreenProps> = ({ navigation, route }) => {
    const { stock } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Stock Details</Text>
            <Text>Symbol: {stock.symbol}</Text>
            <Text>Name: {stock.name}</Text>
            <Text>Price: ${stock.price}</Text>
            <Text>Daily Change: {stock.daily_change}%</Text>
            <Button
                title="Back to Home"
                onPress={() => navigation.goBack()}
                testID="back-button"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
});
