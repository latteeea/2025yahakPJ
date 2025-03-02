import React from "react";
import { View, StyleSheet } from "react-native";

interface CardProps {
    children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
    return <View style={styles.card}>{children}</View>;
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "white",
        padding: 15,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        marginBottom: 10,
    },
});

export default Card;
