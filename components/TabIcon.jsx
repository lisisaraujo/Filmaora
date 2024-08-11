import React from 'react'
import { Image, Text, View, StyleSheet } from "react-native";

const TabIcon = ({ icon, color, name, focused }) => {
    return (
        <View style={styles.iconContainer}>
            <Image
                source={icon}
                resizeMode="contain"
                style={[styles.icon, { tintColor: color }]}
            />
            <Text
                style={[
                    styles.iconText,
                    { color: color, fontWeight: focused ? '600' : '400' }
                ]}
            >
                {name}
            </Text>
        </View>
    );
};

export default TabIcon

const styles = StyleSheet.create({
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
    },
    icon: {
        width: 24,
        height: 24,
    },
    iconText: {
        fontSize: 12,
    },
});