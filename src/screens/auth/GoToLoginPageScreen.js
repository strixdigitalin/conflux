import { View, Text, TouchableHighlight, StatusBar, Image, Alert, StyleSheet } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Toast from 'react-native-simple-toast'

import { commonStyles } from '../../utils/styles'
import CustomTextInput from '../../components/CustomTextInput'
import { setUser } from '../../redux/reducer/user'
import { mobileLoginPostRequest } from '../../utils/API'
import Auth from '../../services/Auth'
import CustomLoader, { CustomPanel } from '../../components/CustomLoader'
import { COLORS, SIZES } from '../../utils/theme'
import Custom_Auth_Btn from '../../components/Custom_Auth_Btn'
import { ImageBackground } from 'react-native'

export default function GoToLoginPageScreen({ navigation }) {
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
            mobileLoginPostRequest(email, password, userType, async (response) => {
                setLoading(false);
                if (response !== null) {
                    if (response?.message !== undefined) {
                        if (response?.message === "Mail exists") {
                            Alert.alert("Alert", response?.message);
                        } else if (response?.message === "Auth failed") {
                            Alert.alert("Alert", response?.message);
                        } else {
                            const userData = response?.user;
                            dispatch(setUser(userData));
                            await Auth.setAccount(userData);
                            await Auth.setLocalStorageData("bearer", response.token)
                            const email_password = [];
                            const userEmail = email;
                            const userPassword = password;
                            email_password.push(userEmail);
                            email_password.push(userPassword);
                            await Auth.setLocalStorageData("email_password", email_password?.toString())
                            Toast.show('Register Successfully!');
                            setEmail("")
                            setPassword("")
                            // navigation.navigate("Root")
                        }
                    }
                }
            })
        }
    }

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="#eee" />
            <Image
                source={require("../../assets/img/login-bg-2.png")}
                style={{ width: "100%", height: "93%" }}
            />
            <View style={{ ...styles.loginWrapper }}>
                <Image
                    source={require("../../assets/img/logo.png")}
                    resizeMode="contain"
                    style={[styles.logo]}
                />
                <View style={{ marginTop: "18%", alignItems: "center" }}>
                    <Text style={[styles.emailSent]}>An Email sent to Your Email Id. Please go through the link</Text>
                    <TouchableHighlight style={styles.goLoginPageBtn} underlayColor="#eee" onPress={() => { }}>
                        <Text style={[styles.goLoginPage]}>Go to Login Page</Text>
                    </TouchableHighlight>
                </View>

                <View style={{ width: "100%", height: 40 }} />

                <Image
                    source={require("../../assets/img/login-bg.png")}
                    style={[styles.loginBg]}
                />

                {/* <View style={{ alignItems: "center", zIndex: 1 }}>
                    <View style={{ ...commonStyles.row }}>
                        <Text style={[styles.dontHaveAccount]}>
                            Don’t have an account?
                        </Text>
                        <TouchableHighlight
                            onPress={() => {
                                navigation.navigate("RegisterScreen")
                            }}
                            underlayColor="#1572B9"
                        >
                            <Text style={[styles.registerText]}> Register</Text>
                        </TouchableHighlight>
                    </View>
                </View> */}
            </View>

            <CustomPanel loading={loading} />

            <CustomLoader loading={loading} />
        </>
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
        position: 'absolute', top: 0,
        width: SIZES.width
        // backgroundColor: "transparent",
        // zIndex: -1
    },
    loginBg: {
        width: SIZES.width,
        height: 180,
        position: "absolute",
        bottom: -80,
    },
    emailSent: {
        ...commonStyles.fs12_400,
        color: COLORS.green,
    },
    goLoginPageBtn: {
        marginTop: 4,
        padding: 4,
    },
    goLoginPage: {
        ...commonStyles.fs16_400,
        color: COLORS.blue,
    },
    dontHaveAccount: {
        ...commonStyles.fs18_500, color: "#fff"
    },
    registerText: {
        ...commonStyles.fs18_500, color: "#EDAA26"
    }
})