import { useState } from "react";
import { View, TouchableOpacity, Image, TextInput, Alert, Text } from "react-native";
import { icons } from "../constants";

const SearchInput = ({ initialQuery, onQueryChange }) => {
    const [query, setQuery] = useState(initialQuery || "");

    const handleSearch = () => {
        if (query === "") {
            return Alert.alert(
                "Missing Query",
                "Please input something to search results across database"
            );
        }
        onQueryChange(query);
    };

    const handleClear = () => {
        setQuery("");
        onQueryChange("");
    };

    return (
        <View className="flex flex-row items-center space-x-4 w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary">
            <TextInput
                className="text-base mt-0.5 text-white flex-1 font-pregular"
                value={query}
                placeholder="Search a video topic"
                placeholderTextColor="#CDCDE0"
                onChangeText={setQuery}
            />

            <TouchableOpacity onPress={handleSearch}>
                <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
            </TouchableOpacity>

            {query !== "" && (
                <TouchableOpacity onPress={handleClear}>
                    <Text style={{ color: "white", fontSize: 16 }}>Clear</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default SearchInput;
