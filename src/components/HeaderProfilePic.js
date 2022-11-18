import { View, Text } from 'react-native'
import React from 'react'
import ProfileModal from '../screens/profile/ProfileModal';
import { TouchableHighlight } from 'react-native';
import { Image } from 'react-native';
import { useState } from 'react';

export function HeaderProfilePic({navigation}) {
    const [profileModalVisible, setProfileModalVisible] = useState(false);

    return (
        <View>
            <TouchableHighlight onPress={() => { console.log("\n\n dsvnsdnv"); setProfileModalVisible(true) }}>
                <Image
                    source={require('../assets/img/user-pic.png')}
                    style={{ width: 35, height: 35 }}
                />
            </TouchableHighlight>

            <ProfileModal
            navigation={navigation}
                modalVisible={profileModalVisible}
                callback={() => setProfileModalVisible(!profileModalVisible)}
            />
        </View>
    )
}