// all StockLineChart component and child component styles go here.
import { StyleSheet, Dimensions } from "react-native";
let width = Dimensions.get("window").width; // full device width, captured at runtime

export const StockLineFilterStyles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingBottom: 14
    },
    text: {
        color: "#fff",
        fontSize: 12,
        fontWeight: 'bold',
        // borderBottomWidth: 1,
        // borderBottomColor: 'white'
    }
});

export const StockLineTickerStyles = StyleSheet.create({
    tickerContainer: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    tickerTotalContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    tickerTotalSymbol: {
        fontSize: 20,
        color: "#fff"
    },
    tickerTotalMainAmount: {
        fontSize: 30,
        color: "#fff"
    },
    tickerAuxillary: {
        fontSize: 12,
        color: "#55FF40",
        marginRight: 5
    },
    tickerFilterText: {
        fontSize: 12,
        color: "#D4d4d4"
    }
});

export const CoinListStyles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
})
