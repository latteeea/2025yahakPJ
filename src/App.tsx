import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Button, Text, View } from "react-native";
import BoardScreen from "../src/screens/BoardScreen"; // 📌 BoardScreen import

// 📌 예제용 홈 스크린
function HomeScreen({ navigation }: { navigation: any }) {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>홈 화면</Text>
            <Button title="게시판으로 이동" onPress={() => navigation.navigate("Board")} />
        </View>
    );
}

// 📌 Stack Navigator 생성
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// 📌 메인 네비게이션 설정
function MainNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: "홈" }} />
            <Stack.Screen name="Board" component={BoardScreen} options={{ title: "게시판" }} />
        </Stack.Navigator>
    );
}

// 📌 네비게이션 컨테이너 설정
export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Main" component={MainNavigator} options={{ title: "메인" }} />
                <Tab.Screen name="Board" component={BoardScreen} options={{ title: "게시판" }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
