import React from 'react';
import { View, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import CalendarView from '../components/Calendar'; // 캘린더 컴포넌트 추가
import BoardScreen from './BoardScreen'; // 게시판 컴포넌트

const Tab = createBottomTabNavigator();

function HomeScreen({ navigation } : {navigation : any}) {
    return (
        <View style={{ flex: 1 }}>
            <CalendarView />
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
