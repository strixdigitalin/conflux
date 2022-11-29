import {View, Text} from 'react-native';
import React from 'react';
import ProfileModal from '../screens/profile/ProfileModal';
import {TouchableHighlight} from 'react-native';
import {Image} from 'react-native';
import {useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {removeUser} from '../redux/reducer/user';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function HeaderLogout({navigation}) {
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const dispatch = useDispatch();

  return (
    <View>
      <TouchableOpacity
        onPress={async () => {
          await AsyncStorage.removeItem('USER_DETAIL');
          // navigation.navigate('GoToLoginPageScreen');
          dispatch(removeUser());
        }}>
        <Image
          source={require('../assets/img/logout1.png')}
          style={{width: 30, height: 25, objectFit: 'cover'}}
        />
      </TouchableOpacity>

      <ProfileModal
        navigation={navigation}
        modalVisible={profileModalVisible}
        callback={() => setProfileModalVisible(!profileModalVisible)}
      />
    </View>
  );
}
export function HeaderProfilePic({navigation}) {
  const [profileModalVisible, setProfileModalVisible] = useState(false);

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          console.log('\n\n dsvnsdnv');
          // setProfileModalVisible(true);
          navigation.navigate('ProfileTab');

          //   navigation.navigate('MenuScreen');
        }}>
        <Image
          source={require('../assets/img/user-pic.png')}
          style={{width: 35, height: 35}}
        />
      </TouchableOpacity>

      <ProfileModal
        navigation={navigation}
        modalVisible={profileModalVisible}
        callback={() => setProfileModalVisible(!profileModalVisible)}
      />
    </View>
  );
}
