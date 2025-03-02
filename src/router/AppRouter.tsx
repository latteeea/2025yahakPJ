// AppRouter.tsx
import React from "react";
import { NativeRouter, Route, Routes } from "react-router-native";
import { View, Text } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import EventDetailScreen from "../screens/EventDetailScreen";

export default function AppRouter() {
    return (
        <NativeRouter>
            <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/event/:eventId" element={<EventDetailScreen />} />
            </Routes>
        </NativeRouter>
    );
}
