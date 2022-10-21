import { View, Text, TouchableHighlight, StyleSheet } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { COLORS, SIZES } from '../utils/theme'
import { commonStyles } from '../utils/styles'

export default function Custom_Auth_Btn({ btnText, onPress }) {
    return (
        <View style={{ alignItems: "center" }}>
            <LinearGradient colors={[COLORS.blue, COLORS.blue]} style={[styles.wrapper]}>
                <TouchableHighlight style={[styles.btnWrapper]} onPress={onPress} underlayColor="E27127">
                    <Text style={{ ...commonStyles.fs18_500, color: "#fff" }}>{btnText}</Text>
                </TouchableHighlight>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        zIndex: 1, borderRadius: 50,
        width: SIZES.width - 120,
    },
    btnWrapper: {
        width: SIZES.width - 120,
        height: 55,
        ...commonStyles.centerStyles,
    }
})