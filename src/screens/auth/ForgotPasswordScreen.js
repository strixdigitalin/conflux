import { View, Text, TouchableHighlight, StatusBar, Image, Alert, StyleSheet } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { commonStyles } from '../../utils/styles'
import CustomTextInput from '../../components/CustomTextInput'
import CustomLoader, { CustomPanel } from '../../components/CustomLoader'
import { COLORS, SIZES } from '../../utils/theme'
import Custom_Auth_Btn from '../../components/Custom_Auth_Btn'

export default function ForgotPasswordScreen({ navigation }) {
    const dispatch = useDispatch();
    const { userType } = useSelector(state => state.UserType);

    const [emailError, setEmailError] = React.useState(false);
    const [passwordError, setPasswordError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleLogin = () => {
        if (email.length === 0) {
            setEmailError(true)
        } if (password.length === 0) {
            setPasswordError(true)
        } else {
            setLoading(true);
        }
    }

    return (
        <View>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <View style={{ ...styles.loginWrapper }}>
                <Image
                    source={require("../../assets/img/logo.png")}
                    resizeMode="contain"
                    style={[styles.logo]}
                />
                <View style={{ marginTop: "18%" }}>
                    <CustomTextInput
                        placeholder='Enter Email'
                        value={email}
                        keyboardType={'email-address'}
                        autoCapitalize='none'
                        icon={require("../../assets/img/envelope.png")}
                        onChange={(val) => { setEmail(val); setEmailError(false); }}
                    />
                    {emailError ? <Text style={{ ...commonStyles.fs13_400, color: "red" }}>Email is required</Text> : <></>}
                    <View style={{ height: 60 }} />

                    <Custom_Auth_Btn
                        btnText={"Submit"}
                        onPress={handleLogin}
                    />
                </View>

                <View style={{ width: "100%", height: 40 }} />

                <Image
                    source={require("../../assets/img/login-bg.png")}
                    style={[styles.loginBg]}
                />
            </View>

            <CustomPanel loading={loading} />

            <CustomLoader loading={loading} />
        </View>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: "100%",
        height: 65
    },
    loginWrapper: {
        justifyContent: 'center',
        height: SIZES.height,
        paddingHorizontal: 20,
        justifyContent: "space-between",
        paddingVertical: "28%",
        backgroundColor: "#fff"
    },
    loginBg: {
        width: SIZES.width,
        height: 180,
        position: "absolute",
        bottom: -80,
    },
    forgotPassword: {
        ...commonStyles.fs15_500, color: "#303030",
        textDecorationColor: "#303030",
        textDecorationLine: "underline"
    },
    dontHaveAccount: {
        ...commonStyles.fs18_500, color: "#fff"
    },
    registerText: {
        ...commonStyles.fs18_500, color: "#EDAA26"
    }
})