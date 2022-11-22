import {View, Text, Modal} from 'react-native';
import React, {useState} from 'react';
import {ImageBackground} from 'react-native';
import {commonStyles} from '../../utils/styles';
import {Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ProfileModal from './ProfileModal';
import {TouchableHighlight} from 'react-native';
import {HeaderProfilePic} from '../../components/HeaderProfilePic';

export default function ProfileHeader({navigation, userData}) {
  return (
    <ImageBackground
      source={require('../../assets/img/dashboard-1.png')}
      style={{width: '100%', height: 290, marginTop: -11}}>
      <View
        style={{
          ...commonStyles.rowBetween,
          paddingVertical: 20,
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
        <HeaderProfilePic navigation={navigation} />
      </View>

      <View style={{paddingHorizontal: 15, alignItems: 'center'}}>
        <Image
          source={require('../../assets/img/user-pic.png')}
          style={{width: 100, height: 100}}
        />
        <View style={{marginLeft: 12, alignItems: 'center'}}>
          <Text style={{...commonStyles.fs24_500, color: '#fff'}}>
            {userData?.first_name} {userData?.last_name}
          </Text>
          <Text
            style={{
              ...commonStyles.fs16_400,
              color: '#fff',
              marginVertical: 4,
            }}>
            {userData?.designation_name}
          </Text>
          <Text style={{...commonStyles.fs16_400, color: '#fff'}}>
            Emp ID - {userData?.em_id}
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}
