import {View, Text, TouchableOpacity, Alert} from 'react-native';
import React from 'react';
import {StatusBar} from 'react-native';
import {COLORS, SIZES} from '../../utils/theme';
import MenuHeader from './MenuHeader';
import {FlatList} from 'react-native';
import {Image} from 'react-native';
import {commonStyles} from '../../utils/styles';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const menuItems = [
  {
    image: require('../../assets/img/dashboard.png'),
    name: 'Dashboard',
    bgColor: '#4CB848',
    pageName: 'HomeScreen',
  },
  {
    image: require('../../assets/img/user.png'),
    name: 'My Profile',
    bgColor: '#FE5A36',
    pageName: 'ProfileScreen',
  },
  {
    image: require('../../assets/img/recruitment.png'),
    name: 'Recruitment',
    bgColor: '#1C67F6',
    pageName: '',
  },
  {
    image: require('../../assets/img/attendance.png'),
    name: 'Attendance',
    bgColor: '#33AEF4',
    pageName: 'CalendarScreen',
    // pageName: 'PayslipScreen',
  },

  {
    image: require('../../assets/img/exit.png'),
    name: 'Leave',
    bgColor: '#7659F1',
    // pageName: 'ApplyLeavesScreen',
    pageName: 'LeavesScreen',
  },
  {
    image: require('../../assets/img/certificate.png'),
    name: 'Learning &\n Development',
    bgColor: '#FDA000',
    pageName: '',
  },
  {
    image: require('../../assets/img/recruitment.png'),
    name: 'Recruitment',
    bgColor: '#FF1B1B',
    pageName: '',
  },
  {
    image: require('../../assets/img/logout.png'),
    name: 'Logout',
    bgColor: '#33AEF4',
    pageName: '',
  },
];

export default function MenuScreen({navigation}) {
  return (
    <View style={{backgroundColor: '#fff', width: '100%', height: '100%'}}>
      <StatusBar barStyle="light-content" backgroundColor="#0249CD" />
      <MenuHeader navigation={navigation} />

      <LinearGradient colors={['#0249CD', '#D9EAF7', '#E7F3FF', '#E7F3FF']}>
        <FlatList
          data={menuItems}
          numColumns={2}
          style={{marginVertical: 14}}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          contentContainerStyle={{alignItems: 'center'}}
          renderItem={({item}) => {
            return (
              <View style={styles.menuItem}>
                <TouchableOpacity
                  onPress={async () => {
                    //   Alert.alert('er');
                    if (item.name == 'Logout') {
                      await AsyncStorage.removeItem('USER_DETAIL');
                      // navigation.navigate('GoToLoginPageScreen');
                    }

                    navigation.navigate(item.pageName);
                  }}
                  style={{alignItems: 'center'}}>
                  <View
                    style={[
                      styles.menuImage,
                      {backgroundColor: item?.bgColor},
                    ]}>
                    <Image
                      source={item?.image}
                      resizeMode="contain"
                      style={{width: 26, height: 26, tintColor: '#fff'}}
                    />
                  </View>

                  <Text
                    style={{
                      fontSize: 18,
                      color: '#000',
                      marginTop: 8,
                      textAlign: 'center',
                    }}>
                    {item?.name}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
          ListFooterComponent={<View style={{height: 120}} />}
        />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    elevation: 6,
    shadowColor: '#eee',
    backgroundColor: 'rgba(256,256,256,1)',
    width: SIZES.width / 2.46,
    height: SIZES.width / 2.46,
    ...commonStyles.centerStyles,
    margin: 16,
    borderRadius: 6,
  },
  menuImage: {
    width: 75,
    height: 75,
    backgroundColor: '#4CB848',
    borderRadius: 100,
    ...commonStyles.centerStyles,
  },
});
