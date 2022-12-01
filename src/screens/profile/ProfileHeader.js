import {View, Text, Modal} from 'react-native';
import React, {useState} from 'react';
import {ImageBackground} from 'react-native';
import {commonStyles} from '../../utils/styles';
import {Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ProfileModal from './ProfileModal';
import {TouchableHighlight} from 'react-native';
import {
  HeaderLogout,
  HeaderProfilePic,
} from '../../components/HeaderProfilePic';
export const truncate = (str, n) => {
  return str?.length > n ? str.slice(0, n - 1) + '...' : str;
};
export default function ProfileHeader({navigation, userData}) {
  return (
    <ImageBackground
      source={require('../../assets/img/dashboard-1.png')}
      style={{width: '100%', height: 160, marginTop: -11}}>
      <View
        style={{
          ...commonStyles.rowBetween,
          paddingVertical: 15,
          paddingHorizontal: 15,
        }}>
        <TouchableOpacity
          onPress={() => {
            console.log('pressed');
            navigation.navigate('MenuScreen');
            // navigation.navigate('HomeTab');
          }}>
          <Image
            source={require('../../assets/img/menu.png')}
            style={{width: 28, height: 28, tintColor: '#fff'}}
          />
        </TouchableOpacity>
        <HeaderLogout navigation={navigation} />
      </View>

      <View
        style={{
          paddingHorizontal: 15,
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <View>
          <Image
            source={require('../../assets/img/user-pic.png')}
            style={{width: 60, height: 60}}
          />
        </View>
        <View style={{marginLeft: 12}}>
          <Text style={{...commonStyles.fs24_500, color: '#fff', fontSize: 19}}>
            {truncate(
              `${userData?.first_name}  ${
                userData.last_name != null ? userData?.last_name : ''
              }`,
              30,
            )}
          </Text>
          <Text
            style={{
              ...commonStyles.fs16_400,
              color: '#fff',
              marginVertical: 4,
              fontSize: 12,
            }}>
            {truncate(userData?.designation_name, 35)}
          </Text>
          <Text style={{...commonStyles.fs16_400, color: '#fff', fontSize: 12}}>
            Emp ID - {userData?.em_id}
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}
