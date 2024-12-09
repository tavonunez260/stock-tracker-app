export type RootStackParamList = {
    Home: undefined;
    Details: { stock: Stock };
};

export interface Stock {
    symbol: string;
    name: string;
    price: number;
    daily_change: number;
}
