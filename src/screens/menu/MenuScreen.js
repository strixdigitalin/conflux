import { View, Text } from 'react-native'
import React from 'react'
import { StatusBar } from 'react-native'
import { COLORS, SIZES } from '../../utils/theme'
import MenuHeader from './MenuHeader'
import { FlatList } from 'react-native'
import { Image } from 'react-native'
import { commonStyles } from '../../utils/styles'
import { StyleSheet } from 'react-native'

const menuItems = [
    {
        image: require("../../assets/img/dashboard.png"),
        name: "Dashboard",
        bgColor: "#4CB848"
    },
    {
        image: require("../../assets/img/user.png"),
        name: "My Profile",
        bgColor: "#FE5A36"
    },
    {
        image: require("../../assets/img/recruitment.png"),
        name: "Recruitment",
        bgColor: "#1C67F6"
    },
    {
        image: require("../../assets/img/attendance.png"),
        name: "Attendance",
        bgColor: "#33AEF4"
    },

    {
        image: require("../../assets/img/exit.png"),
        name: "Leave",
        bgColor: "#7659F1"
    },
    {
        image: require("../../assets/img/certificate.png"),
        name: "Learning &\n Development",
        bgColor: "#FDA000"
    },
    {
        image: require("../../assets/img/recruitment.png"),
        name: "Recruitment",
        bgColor: "#FF1B1B"
    },
    {
        image: require("../../assets/img/attendance.png"),
        name: "Attendance",
        bgColor: "#33AEF4"
    },
]

export default function MenuScreen() {
    return (
        <View style={{ backgroundColor: "#fff", width: "100%", height: "100%" }}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.blue} />
            <MenuHeader />

            <FlatList
                data={menuItems}
                numColumns={2}
                style={{ marginVertical: 14 }}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                contentContainerStyle={{ alignItems: "center" }}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.menuItem}>
                            <View style={[styles.menuImage, { backgroundColor: item?.bgColor }]}>
                                <Image
                                    source={item?.image}
                                    resizeMode="contain"
                                    style={{ width: 26, height: 26, tintColor: "#fff" }}
                                />
                            </View>

                            <Text style={{ fontSize: 18, color: "#000", marginTop: 8, textAlign: "center" }}>{item?.name}</Text>
                        </View>
                    );
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    menuItem: {
        elevation: 9,
        shadowColor: "#999",
        backgroundColor: "#fff",
        width: SIZES.width / 2.46,
        height: SIZES.width / 2.46,
        ...commonStyles.centerStyles,
        margin: 16,
        borderRadius: 6
    },
    menuImage: {
        width: 75, height: 75,
        backgroundColor: "#4CB848",
        borderRadius: 100,
        ...commonStyles.centerStyles,
    }
})