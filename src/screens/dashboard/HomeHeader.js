import { View, Text } from 'react-native'
import React from 'react'
import { ImageBackground } from 'react-native'
import { commonStyles } from '../../utils/styles'
import { Image } from 'react-native'

export default function HomeHeader() {
    return (
        <ImageBackground
            source={require("../../assets/img/dashboard-1.png")}
            style={{ width: "100%", height: 180, marginTop: -10 }}
        >
            <View style={{ ...commonStyles.rowBetween, paddingVertical: 20, paddingHorizontal: 15 }}>
                <Image
                    source={require("../../assets/img/menu.png")}
                    style={{ width: 28, height: 28, tintColor: "#fff" }}
                />
                <Image
                    source={require("../../assets/img/user-pic.png")}
                    style={{ width: 35, height: 35 }}
                />
            </View>

            <View style={{ ...commonStyles.rowStart, paddingHorizontal: 15 }}>
                <Image
                    source={require("../../assets/img/user-pic.png")}
                    style={{ width: 70, height: 70 }}
                />
                <View style={{ marginLeft: 12 }}>
                    <Text style={{ ...commonStyles.fs24_500, color: "#fff" }}>Welcome UserName</Text>
                    <Text style={{ ...commonStyles.fs14_400, color: "#fff" }}>12/04/2022 12:46 PM</Text>
                </View>
            </View>
        </ImageBackground>
    )
}