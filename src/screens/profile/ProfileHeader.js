import { View, Text } from 'react-native'
import React from 'react'
import { ImageBackground } from 'react-native'
import { commonStyles } from '../../utils/styles'
import { Image } from 'react-native'

export default function ProfileHeader() {
    return (
        <ImageBackground
            source={require("../../assets/img/dashboard-1.png")}
            style={{ width: "100%", height: 290, marginTop: -11 }}
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

            <View style={{ paddingHorizontal: 15, alignItems: "center" }}>
                <Image
                    source={require("../../assets/img/user-pic.png")}
                    style={{ width: 100, height: 100 }}
                />
                <View style={{ marginLeft: 12, alignItems: "center" }}>
                    <Text style={{ ...commonStyles.fs24_500, color: "#fff" }}>Jitendra Kumar Panda</Text>
                    <Text style={{ ...commonStyles.fs16_400, color: "#fff", marginVertical: 4 }}>Software Engineer - UI/UX</Text>
                    <Text style={{ ...commonStyles.fs16_400, color: "#fff" }}>Emp ID - JO-EMP00189</Text>
                </View>
            </View>
        </ImageBackground>
    )
}
