// all StockLineChart component and child component styles go here.
import { StyleSheet, Dimensions } from "react-native";
let width = Dimensions.get("window").width; // full device width, captured at runtime

export const StockLineFilterStyles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    text: {
        color: "#fff",
        fontSize: 12
    }
});

export const StockLineTickerStyles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    tickerTotalContainer: {
        flexDirection:"row",
        alignItems: "baseline",
        marginBottom: 4
    },
    tickerTotalSymbol: {
        fontSize: 22,
        height: 22,
        color: "#fff",
        alignItems: "baseline"
    },
    tickerTotalMainAmount: {
        fontSize: 42,
        height: 42,
        color: "#fff",
        alignItems: "baseline"
    },
    tickerAuxillary: {
        fontSize: 12,
        color: "#99c794",
        marginRight: 5
    },
    tickerFilterText: {
        fontSize: 12,
        color: "#D4d4d4"
    }
});
