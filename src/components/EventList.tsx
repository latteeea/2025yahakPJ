import React from "react";
import { View, Text, FlatList } from "react-native";

interface Event {
    id: string;
    title: string;
    date: string;
}

interface Props {
    events: Event[];
}

export default function EventList({ events }: Props) {
    return (
        <FlatList
            data={events}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View style={{ padding: 16, borderBottomWidth: 1 }}>
                    <Text style={{ fontSize: 16 }}>{item.title} ({item.date})</Text>
                </View>
            )}
        />
    );
}
