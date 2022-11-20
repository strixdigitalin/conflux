import {View, Text} from 'react-native';
import React from 'react';
import {ImageBackground} from 'react-native';
import {commonStyles} from '../../utils/styles';
import {Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {HeaderProfilePic} from '../../components/HeaderProfilePic';

export default function HomeHeader({navigation}) {
  const [showDate, setShowDate] = React.useState('');
  const calcdate = () => {
    const curr = new Date();
    const d =
      curr.getDate() +
      '/' +
      (+curr.getMonth() + +1) +
      '/' +
      curr.getFullYear() +
      '  ' +
      '  ' +
      curr.getHours() +
      ':' +
      curr.getMinutes();
    setShowDate(d);
  };
  React.useEffect(() => {
    calcdate();
    setInterval(() => calcdate, 30000);
  }, []);

  const {userData} = useSelector(state => state.User);

  console.log(userData, '<<<-----\n\nuserDataat home screen\n\n\n');
  return (
    <ImageBackground
      source={require('../../assets/img/dashboard-1.png')}
      style={{width: '100%', height: 180, marginTop: -10}}>
      <View
        style={{
          ...commonStyles.rowBetween,
          paddingVertical: 20,
          paddingHorizontal: 15,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Root');
          }}>
          <Image
            source={require('../../assets/img/menu.png')}
            style={{width: 28, height: 28, tintColor: '#fff'}}
          />
        </TouchableOpacity>
        <HeaderProfilePic />
        {/* <Image
          source={require('../../assets/img/user-pic.png')}
          style={{width: 35, height: 35}}
        /> */}
      </View>

      <View style={{...commonStyles.rowStart, paddingHorizontal: 15}}>
        <Image
          source={require('../../assets/img/user-pic.png')}
          style={{width: 70, height: 70}}
        />
        <View style={{marginLeft: 12}}>
          <Text style={{...commonStyles.fs24_500, color: '#fff'}}>
            {userData.first_name} {userData.last_name}
          </Text>
          <Text style={{...commonStyles.fs14_400, color: '#fff'}}>
            {/* 12/04/2022 12:46 PM */}
            {showDate}
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}
