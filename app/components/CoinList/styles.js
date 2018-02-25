// all StockLineChart component and child component styles go here.
import { StyleSheet, Dimensions } from "react-native";
let width = Dimensions.get("window").width; // full device width, captured at runtime

export const CoinListStyles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
})
