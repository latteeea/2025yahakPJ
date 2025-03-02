import React, { useContext, useState } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import { useParams, useNavigate } from "react-router-native";
import { EventContext } from "../context/EventContext";

export default function EventDetailScreen() {
    const { eventId } = useParams(); // URL에서 eventId 가져오기
    const navigate = useNavigate();
    const { events, updateEvent } = useContext(EventContext)!;

    const event = events.find((e) => e.id === eventId);
    const [title, setTitle] = useState(event?.title || "");
    const [date, setDate] = useState(event?.date || "");
    const [description, setDescription] = useState(event?.description || "");

    if (!event) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>이벤트를 찾을 수 없습니다.</Text>
            </View>
        );
    }

    const handleUpdate = () => {
        updateEvent({ id: event.id, title, date, description });
        navigate(-1); // 이전 페이지로 이동
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>이벤트 수정</Text>
            <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="제목" />
            <TextInput style={styles.input} value={date} onChangeText={setDate} placeholder="날짜 (YYYY-MM-DD)" />
            <TextInput style={styles.input} value={description} onChangeText={setDescription} placeholder="설명" multiline />

            <Button title="저장" onPress={handleUpdate} />
            <Button title="뒤로 가기" onPress={() => navigate(-1)} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: "#fff" },
    header: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
    input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
    errorText: { fontSize: 18, color: "red", textAlign: "center" },
});
