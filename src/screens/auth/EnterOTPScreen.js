import {
  View,
  Text,
  TouchableHighlight,
  StatusBar,
  Image,
  Alert,
  StyleSheet,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-simple-toast';

import {commonStyles} from '../../utils/styles';
import CustomTextInput from '../../components/CustomTextInput';
import {matchOTPPostRequest} from '../../utils/API';
import CustomLoader, {CustomPanel} from '../../components/CustomLoader';
import {COLORS, SIZES} from '../../utils/theme';
import Custom_Auth_Btn from '../../components/Custom_Auth_Btn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER_DETAIL} from '../../redux/reducer/AsyncConst';
import {userProfile} from '../../services/profile';
import {setUser} from '../../redux/reducer/user';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function EnterOTPScreen({navigation, route}) {
  const [timer, setTimer] = useState(20);
  const timeOutCallback = useCallback(
    () => setTimer(currTimer => currTimer - 1),
    [],
  );
  const dispatch = useDispatch();

  const {phone} = route?.params;
  const [otpValError, setOTPInputError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [otpVal, setOTPInput] = React.useState('');

  useEffect(() => {
    timer > 0 && setTimeout(timeOutCallback, 1000);
  }, [timer, timeOutCallback]);

  const resetTimer = function () {
    if (!timer) {
      setTimer(20);
    }
  };

  const handleOtpInput = () => {
    if (otpVal.length === 0) {
      setOTPInputError(true);
    } else {
      setLoading(true);
      matchOTPPostRequest(phone, otpVal, async response => {
        setLoading(false);
        console.log('\n\n \n\n mobileLoginPostRequest response: ', response);
        if (response.statusCode != 200) {
          return Alert.alert(response.body);
        }
        // return null;
        userProfile(response.body[0].staffid, async res => {
          console.log(res, '\n\n<<<res at user profile apge');
          if (res.success == false) {
            Alert.alert('Unable to fetch profile data');
          } else {
            await AsyncStorage.setItem(
              'USER_DETAIL',
              JSON.stringify({...res.data, staffid: response.body[0].staffid}),
            );
            dispatch(setUser({...res.data, staffid: response.body[0].staffid}));
            // navigation.navigate('Root');
            // navigation.navigate('HomeTab');
            navigation.navigate('HomeScreen');
          }
        });
        // if (response.body === "successfully Sent and Updated") {
        // }
        // if (response !== null) {
        //     if (response?.body !== undefined) {
        //         if (response?.body === "Mail exists") {
        //             Alert.alert("Alert", response?.body);
        //         } else {
        //             Toast.show(response?.body);
        //             setOTPInput("")
        //             setCompanyID("")
        //         }
        //     }
        // }
      });
    }
  };

  return (
    <View>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={{...styles.loginWrapper}}>
        <Image
          source={require('../../assets/img/logo.png')}
          resizeMode="contain"
          style={[styles.logo]}
        />
        <View style={{marginTop: '18%'}}>
          <CustomTextInput
            placeholder="Enter OTP"
            value={otpVal}
            keyboardType={'number-pad'}
            autoCapitalize="none"
            maxLength={6}
            icon={require('../../assets/img/otp.png')}
            onChange={val => {
              // if (otpVal.length < 6) {
              const cleanNumber = val.replace(/[^0-9]/g, '');

              setOTPInput(cleanNumber);
              setOTPInputError(false);
              // }
            }}
          />
          {otpValError ? (
            <Text style={{...commonStyles.fs13_400, color: 'red'}}>
              Please enter OTP
            </Text>
          ) : (
            <></>
          )}
          <View style={{height: 14}} />

          <Custom_Auth_Btn btnText={'Login'} onPress={handleOtpInput} />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('LoginScreen');
            }}>
            {/* <Text
              style={{
                color: COLORS.darkLime,
                width: '100%',
                marginTop: 18,
                textAlign: 'right',
              }}>
              Go to login
            </Text> */}
            {timer != 0 ? (
              <Text
                style={{
                  color: COLORS.darkLime,
                  width: '100%',
                  marginTop: 18,
                  textAlign: 'right',
                }}
                onPress={resetTimer}>
                Resend OTP ({timer})
              </Text>
            ) : (
              <Text
                style={{
                  color: COLORS.darkLime,
                  width: '100%',
                  marginTop: 18,
                  textAlign: 'right',
                }}>
                Go to login
              </Text>
            )}
          </TouchableOpacity>
        </View>
        <View style={{width: '100%', height: 40}} />

        <Image
          source={require('../../assets/img/login-bg.png')}
          style={[styles.loginBg]}
        />
      </View>

      <CustomPanel loading={loading} />
      <CustomLoader loading={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: '100%',
    height: 65,
  },
  loginWrapper: {
    justifyContent: 'center',
    height: SIZES.height,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingVertical: '28%',
    backgroundColor: '#fff',
  },
  loginBg: {
    width: SIZES.width,
    height: 180,
    position: 'absolute',
    bottom: -80,
  },
  forgotPassword: {
    ...commonStyles.fs15_500,
    color: '#303030',
    textDecorationColor: '#303030',
    textDecorationLine: 'underline',
  },
  dontHaveAccount: {
    ...commonStyles.fs18_500,
    color: '#fff',
  },
  registerText: {
    ...commonStyles.fs18_500,
    color: '#EDAA26',
  },
});

{
  /* <View style={{ alignItems: "flex-end" }}>
        <TouchableHighlight underlayColor={COLORS.blue}
            onPress={() => {
                navigation.navigate("ForgotPasswordPassword", {
                    otpVal: otpVal,
                })
            }}
        >
            <Text style={[styles.forgotPassword]}>Forgot Password?</Text>
        </TouchableHighlight>
    </View> */
}
