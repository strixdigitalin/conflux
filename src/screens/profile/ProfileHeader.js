import {View, Text} from 'react-native';
import React from 'react';
import {ImageBackground} from 'react-native';
import {commonStyles} from '../../utils/styles';
import {Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function ProfileHeader({navigation, userData}) {
  return (
    <ImageBackground
      source={
        userData.em_image == null
          ? require('../../assets/img/dashboard-1.png')
          : userData.em_image
      }
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
          }}>
          <Image
            source={require('../../assets/img/menu.png')}
            style={{width: 28, height: 28, tintColor: '#fff'}}
          />
        </TouchableOpacity>
        <Image
          source={require('../../assets/img/user-pic.png')}
          style={{width: 35, height: 35}}
        />
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
