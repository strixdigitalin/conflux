import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {commonStyles} from '../../utils/styles';
import {Image} from 'react-native';
import {HeaderProfilePic} from '../../components/HeaderProfilePic';

export default function MenuHeader({navigation}) {
  return (
    <View
      style={{
        width: '100%',
        height: 58,
        backgroundColor: '#0249CD',
        ...commonStyles.rowBetween,
        paddingHorizontal: 15,
      }}>
      <TouchableOpacity
        onPress={() => {
          // navigation.goBack();
        }}>
        {/* <Image
          source={require('../../assets/img/left-arrow.png')}
          style={{width: 28, height: 28, tintColor: '#fff'}}
        /> */}
      </TouchableOpacity>
      <HeaderProfilePic navigation={navigation} />
      {/* <Image
        source={require('../../assets/img/user-pic.png')}
        style={{ width: 35, height: 35 }}
      /> */}
    </View>
  );
}
