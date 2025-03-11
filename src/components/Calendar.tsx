import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Calendar from '../components/Calendar'; // 스케줄 관리 캘린더로 변경
import BoardScreen from '../screens/BoardScreen'; // 게시판 컴포넌트

const Tab = createBottomTabNavigator();

function HomeScreen() {
    return (
        <View style={{ flex: 1 }}>
            <Calendar />
        </View>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Board" component={BoardScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
