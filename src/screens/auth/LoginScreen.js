import {
  View,
  Text,
  TouchableHighlight,
  StatusBar,
  Image,
  Alert,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-simple-toast';

import {commonStyles} from '../../utils/styles';
import CustomTextInput from '../../components/CustomTextInput';
import {mobileLoginPostRequest} from '../../utils/API';
import CustomLoader, {CustomPanel} from '../../components/CustomLoader';
import {COLORS, SIZES} from '../../utils/theme';
import Custom_Auth_Btn from '../../components/Custom_Auth_Btn';

export default function LoginScreen({navigation}) {
  const [phoneError, setMobileError] = React.useState(false);
  const [companyIDError, setCompanyIDError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [phone, setMobile] = React.useState('');
  const [companyID, setCompanyID] = React.useState('');

  const handleLogin = () => {
    if (phone.length === 0) {
      setMobileError(true);
    }
    if (companyID.length === 0) {
      setCompanyIDError(true);
    } else {
      setLoading(true);
      mobileLoginPostRequest(phone, companyID, async response => {
        if (response.statusCode != 200) {
          Alert.alert(response.body);
          setLoading(false);
        } else {
          setLoading(false);

          console.log('\n\n \n\n mobileLoginPostRequest response: ', response);
          navigation.navigate('EnterOTPScreen', {
            phone: phone,
          });
        }
        // if (response.body === "successfully Sent and Updated") {
        // }
        // if (response !== null) {
        //     if (response?.body !== undefined) {
        //         if (response?.body === "Mail exists") {
        //             Alert.alert("Alert", response?.body);
        //         } else {
        //             Toast.show(response?.body);
        //             setMobile("")
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
            placeholder="Mobile number"
            // value={phone}
            keyboardType={'numeric'}
            autoCapitalize="none"
            maxLength={10}
            icon={require('../../assets/img/mobile.png')}
            onChange={val => {
              // console.log(val, '<<<<val');
              const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

              console.log();
              setMobile(val);
              setMobileError(false);
            }}
          />
          {phoneError ? (
            <Text style={{...commonStyles.fs13_400, color: 'red'}}>
              Mobile number is required
            </Text>
          ) : (
            <></>
          )}
          <View style={{height: 14}} />

          <CustomTextInput
            placeholder="Enter Company ID"
            value={companyID}
            // secureTextEntry={true}
            icon={require('../../assets/img/lock.png')}
            onChange={val => {
              setCompanyID(val);
              setCompanyIDError(false);
            }}
          />
          {companyIDError ? (
            <Text style={{...commonStyles.fs13_400, color: 'red'}}>
              Company ID is required
            </Text>
          ) : (
            <></>
          )}
          <View style={{height: 60}} />

          <Custom_Auth_Btn btnText={'Login'} onPress={handleLogin} />
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
                    phone: phone,
                })
            }}
        >
            <Text style={[styles.forgotPassword]}>Forgot Password?</Text>
        </TouchableHighlight>
    </View> */
}
