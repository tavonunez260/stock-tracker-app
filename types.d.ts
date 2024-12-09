import { StackNavigationProp } from '@react-navigation/stack';
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
    Home: undefined;
    Details: { stock: Stock };
};

export type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export interface HomeScreenProps {
    navigation: HomeScreenNavigationProp;
}

export type DetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'Details'>;

export interface Stock {
    symbol: string;
    name: string;
    price: number;
    daily_change: number;
}
