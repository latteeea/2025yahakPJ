import React, { useState, useContext } from "react";
import { Button, View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { Agenda, DateData } from "react-native-calendars";
import {useNavigate} from "react-router-native";
import { EventContext } from "../context/EventContext";
import AddEventModal from "../components/AddEventModal";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
    const { events } = useContext(EventContext)!;
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [modalVisible, setModalVisible] = useState(false);

    // 캘린더에 표시할 이벤트 데이터 변환
    const markedEvents = events.reduce((acc, event) => {
        acc[event.date] = { marked: true, dotColor: "blue" };
        return acc;
    }, {} as Record<string, any>);

    return (
        <View style={styles.container}>
            <Text>홈 화면</Text>
            <Button title="이벤트 상세 보기" onPress={() => navigate("/event/123")} />
            <Agenda
                items={events.reduce((acc, event) => {
                    acc[event.date] = [{ name: event.title }];
                    return acc;
                }, {} as Record<string, any>)}
                selected={selectedDate}
                onDayPress={(day: DateData) => { // ✅ day 타입 명시
                    setSelectedDate(day.dateString);
                    setModalVisible(true);
                }}
                theme={{
                    backgroundColor: "#121212",
                    calendarBackground: "#121212",
                    selectedDayBackgroundColor: "#1e90ff",
                    todayTextColor: "#ff6347",
                    dayTextColor: "#fff",
                    agendaTodayColor: "#1e90ff",
                    agendaKnobColor: "#1e90ff",
                }}
            />

            {/* 이벤트 추가 모달 */}
            <Modal visible={modalVisible} animationType="slide">
                <AddEventModal
                    date={selectedDate}
                    onClose={() => setModalVisible(false)}
                />
            </Modal>

            {/* 하단 네비게이션 */}
            <View style={styles.bottomNav}>
                <TouchableOpacity>
                    <Ionicons name="calendar" size={24} color="#fff" />
                    <Text style={styles.navText}>일정</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons name="pricetag" size={24} color="#fff" />
                    <Text style={styles.navText}>태그</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Ionicons name="add-circle" size={40} color="#1e90ff" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons name="notifications" size={24} color="#fff" />
                    <Text style={styles.navText}>알림</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons name="settings" size={24} color="#fff" />
                    <Text style={styles.navText}>설정</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#121212" },
    bottomNav: {
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "#1c1c1c",
        paddingVertical: 10,
    },
    navText: { color: "#fff", fontSize: 12, textAlign: "center" },
});
