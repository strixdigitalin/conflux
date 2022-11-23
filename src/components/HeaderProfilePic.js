import {View, Text} from 'react-native';
import React from 'react';
import ProfileModal from '../screens/profile/ProfileModal';
import {TouchableHighlight} from 'react-native';
import {Image} from 'react-native';
import {useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';

export function HeaderProfilePic({navigation}) {
  const [profileModalVisible, setProfileModalVisible] = useState(false);

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          console.log('\n\n dsvnsdnv');
          setProfileModalVisible(true);
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
