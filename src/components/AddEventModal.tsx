import React, { useState, useContext } from "react";
import { DateData } from "react-native-calendars";
import {
    View,
    Text,
    TextInput,
    Switch,
    Button,
    StyleSheet,
    Platform,
} from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { EventContext } from "../context/EventContext";

interface Props {
    date: string;
    onClose: () => void;
}

export default function AddEventModal({ date, onClose }: Props) {
    const { updateEvent } = useContext(EventContext)!;
    const [title, setTitle] = useState("");
    const [isAllDay, setIsAllDay] = useState(false);
    const [startDate, setStartDate] = useState(new Date(date));
    const [endDate, setEndDate] = useState(new Date(date));
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);
    const [isLunar, setIsLunar] = useState(false);

    const handleSave = () => {
        if (title.trim()) {
            updateEvent({ id: Date.now().toString(), title, date });
            onClose();
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>제목</Text>
            <TextInput
                style={styles.input}
                placeholder="일정 제목을 입력하세요"
                value={title}
                onChangeText={setTitle}
            />

            <View style={styles.row}>
                <Text>종일</Text>
                <Switch value={isAllDay} onValueChange={setIsAllDay} />
            </View>

            <View style={styles.row}>
                <Text>시작</Text>
                <Button title={startDate.toDateString()} onPress={() => setShowStartPicker(true)} />
            </View>
            {showStartPicker && (
                <DateTimePicker
                    value={startDate}
                    mode="date"
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    onChange={(event: DateTimePickerEvent, selectedDate?: Date) => {
                        setShowStartPicker(false);
                        if (selectedDate) setStartDate(selectedDate);
                    }}
                />
            )}

            <View style={styles.row}>
                <Text>종료</Text>
                <Button title={endDate.toDateString()} onPress={() => setShowEndPicker(true)} />
            </View>
            {showEndPicker && (
                <DateTimePicker
                    value={endDate}
                    mode="date"
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    onChange={(event: DateTimePickerEvent, selectedDate?: Date) => {
                        setShowEndPicker(false);
                        if (selectedDate) setEndDate(selectedDate);
                    }}
                />
            )}

            <View style={styles.row}>
                <Text>음력</Text>
                <Switch value={isLunar} onValueChange={setIsLunar} />
            </View>

            <Button title="저장" onPress={handleSave} />
            <Button title="닫기" onPress={onClose} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: "#121212" },
    label: { fontSize: 16, color: "#fff", marginBottom: 5 },
    input: {
        borderWidth: 1,
        borderColor: "#555",
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        color: "#fff",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 8,
    },
});
