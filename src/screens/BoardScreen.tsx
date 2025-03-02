import React, { useState } from "react";
import { View, Text, FlatList } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Card from "../components/Card";
import Button from "../components/Button";

const classes = ["1반", "2반", "3반"];
const departments = ["기획부", "개발부", "디자인부"];
const categories = ["회의내용", "결정내용"];

type Post = {
    id : string;
    title : string;
    content : string;
    className?: string | null;
    department?: string;
    category?: string;
};

const posts : Post[] = [
    { id: "1", title: "1반 공지", content: "1반 게시물입니다.", className: "1반" },
    { id: "2", title: "2반 일정", content: "2반 게시물입니다.", className: "2반" },
    { id: "3", title: "기획부 회의", content: "기획부 회의내용입니다.", department: "기획부", category: "회의내용" },
    { id: "4", title: "개발부 결정", content: "개발부 결정내용입니다.", department: "개발부", category: "결정내용" },
];

export default function BoardScreen({ navigation } : { navigation: any}) {
    const [selectedClass, setSelectedClass] = useState<string | undefined>(classes[0]);
    const [selectedDepartment, setSelectedDepartment] = useState<string>(departments[0]);
    const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]);
    const [isClassBoard, setIsClassBoard] = useState<boolean>(true);

    const filteredPosts = isClassBoard
        ? posts.filter(post => post.className?.toString() === selectedClass)
        : posts.filter(post => post.department === selectedDepartment && post.category === selectedCategory);

    return (

        <View style={{ flex: 1, padding: 16 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
                <Button onPress={() => setIsClassBoard(true)}>반 별 게시판</Button>
                <Button onPress={() => setIsClassBoard(false)}>부 별 게시판</Button>
            </View>

            {isClassBoard ? (
                <View>
                    <Picker
                        selectedValue={selectedClass}
                        onValueChange={(itemValue : string) => setSelectedClass(itemValue)}
                    >
                        {classes.map(cls => (
                            <Picker.Item key={cls} label={cls} value={cls} />
                        ))}
                    </Picker>
                </View>
            ) : (
                <View>
                    <Picker
                        selectedValue={selectedDepartment}
                        onValueChange={(itemValue: string) => setSelectedDepartment(itemValue)}
                    >
                        {departments.map(dep => (
                            <Picker.Item key={dep} label={dep} value={dep} />
                        ))}
                    </Picker>

                    <Picker
                        selectedValue={selectedCategory}
                        onValueChange={(itemValue: string) => setSelectedCategory(itemValue)}
                    >
                        {categories.map(cat => (
                            <Picker.Item key={cat} label={cat} value={cat} />
                        ))}
                    </Picker>
                </View>
            )}

            <FlatList
                data={filteredPosts}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Card>
                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.title}</Text>
                        <Text>{item.content}</Text>
                    </Card>
                )}
            />
        </View>
    );
}
