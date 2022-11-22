import {
  View,
  Text,
  TouchableHighlight,
  StatusBar,
  Image,
  StyleSheet,
} from 'react-native';
import React, {useEffect} from 'react';

import {commonStyles} from '../../utils/styles';
import CustomLoader, {CustomPanel} from '../../components/CustomLoader';
import {COLORS, SIZES} from '../../utils/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER_DETAIL} from '../../redux/reducer/AsyncConst';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {setUser} from '../../redux/reducer/user';
import {useDispatch} from 'react-redux';

export default function GoToLoginPageScreen({navigation}) {
  const onFocus = useIsFocused();
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const data = await AsyncStorage.getItem('USER_DETAIL');
      console.log(data, '<<<<\n\n\n user data in login screen ');
      if (data != null) {
        dispatch(setUser(JSON.parse(data)));
        // setUser(data);
        navigation.navigate('HomeScreen');
      }
    })();
  }, [onFocus]);
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#eee" />
      <Image
        source={require('../../assets/img/login-bg-2.png')}
        style={{width: '100%', height: '93%'}}
      />
      <View style={{...styles.loginWrapper}}>
        <Image
          source={require('../../assets/img/logo.png')}
          resizeMode="contain"
          style={[styles.logo]}
        />
        <View style={{marginTop: '18%', alignItems: 'center'}}>
          <Text style={[styles.emailSent]}>
            An Email sent to Your Email Id. Please go through the link
          </Text>
          <TouchableHighlight
            style={styles.goLoginPageBtn}
            underlayColor="#eee"
            onPress={() => {
              navigation.navigate('LoginScreen');
            }}>
            <Text style={[styles.goLoginPage]}>Go to Login Page</Text>
          </TouchableHighlight>
        </View>

        <View style={{width: '100%', height: 40}} />

        <Image
          source={require('../../assets/img/login-bg.png')}
          style={[styles.loginBg]}
        />
      </View>

      <CustomPanel loading={false} />
      <CustomLoader loading={false} />
    </>
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
    position: 'absolute',
    top: 0,
    width: SIZES.width,
  },
  loginBg: {
    width: SIZES.width,
    height: 180,
    position: 'absolute',
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
});
