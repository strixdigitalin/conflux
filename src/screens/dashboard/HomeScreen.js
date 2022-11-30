import {View, Text} from 'react-native';
import React from 'react';
import {Image} from 'react-native';
import {COLORS, SIZES} from '../../utils/theme';
import {ImageBackground} from 'react-native';
import {commonStyles} from '../../utils/styles';
import HomeHeader from './HomeHeader';
import NoticeBoardComponent from './NoticeBoardComponent';
import {ScrollView} from 'react-native';
import {StatusBar} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {useEffect} from 'react';
import {useScrollToTop} from '@react-navigation/native';

export default function HomeScreen({navigation}) {
  const isfocused = useIsFocused();
  const ref = React.useRef(0);
  useScrollToTop(ref);
  useEffect(() => {
    // return () => {};
  }, [isfocused]);
  useScrollToTop(
    React.useRef({
      scrollToTop: () => ref.current?.scrollToOffset({offset: 0}),
    }),
  );

  return (
    <ScrollView
      ref={ref}
      style={{
        marginBottom: 50,
      }}>
      <HomeHeader navigation={navigation} />
      <StatusBar barStyle="light-content" backgroundColor={COLORS.blue} />
      <View style={{padding: 15}}>
        <NoticeBoardComponent />

        <Text
          style={{...commonStyles.fs14_400, marginTop: 20, marginBottom: 8}}>
          Upcoming Birthday
        </Text>

        <View
          style={{
            backgroundColor: '#fff',
            elevation: 8,
            shadowColor: '#999',
            paddingVertical: 12,
            borderRadius: 8,
          }}>
          <ScrollView
            horizontal
            disableIntervalMomentum={false}
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
            snapToInterval={300}>
            <View style={{...commonStyles.rowBetween}}>
              <View style={{...commonStyles.rowStart, paddingHorizontal: 15}}>
                <Image
                  source={require('../../assets/img/user-pic.png')}
                  style={{width: 48, height: 48}}
                />
                <View style={{marginLeft: 12}}>
                  <Text style={{...commonStyles.fs16_400, color: '#d10044'}}>
                    Anvika Acharya
                  </Text>
                  <Text style={{...commonStyles.fs12_400, color: '#000000'}}>
                    HR & Admin
                  </Text>
                </View>
              </View>
              <View style={{marginRight: 12}}>
                <Text style={{...commonStyles.fs24_500, color: COLORS.green}}>
                  02
                </Text>
                <Text style={{...commonStyles.fs12_400, color: '#000000'}}>
                  April
                </Text>
              </View>
            </View>
            <View style={{...commonStyles.rowBetween}}>
              <View style={{...commonStyles.rowStart, paddingHorizontal: 15}}>
                <Image
                  source={require('../../assets/img/user-pic.png')}
                  style={{width: 48, height: 48}}
                />
                <View style={{marginLeft: 12}}>
                  <Text style={{...commonStyles.fs16_400, color: '#d10044'}}>
                    Anvika Acharya
                  </Text>
                  <Text style={{...commonStyles.fs12_400, color: '#000000'}}>
                    HR & Admin
                  </Text>
                </View>
              </View>
              <View style={{marginRight: 12}}>
                <Text style={{...commonStyles.fs24_500, color: COLORS.green}}>
                  02
                </Text>
                <Text style={{...commonStyles.fs12_400, color: '#000000'}}>
                  April
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>

        <Text
          style={{...commonStyles.fs14_400, marginTop: 20, marginBottom: 8}}>
          Upcoming Holiday
        </Text>
        <ScrollView
          horizontal
          disableIntervalMomentum={false}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          snapToInterval={300}></ScrollView>
        <Image
          source={require('../../assets/img/diwali.png')}
          resizeMode="contain"
          style={{width: '100%', height: SIZES.width / 1.67}}
        />

        <Image
          source={require('../../assets/img/diwali2.png')}
          resizeMode="contain"
          style={{
            width: '100%',
            height: SIZES.width / 1.67,
            marginVertical: 20,
          }}
        />

        <Image
          source={require('../../assets/img/diwali3.png')}
          resizeMode="contain"
          style={{width: '100%', height: SIZES.width / 1.67}}
        />
      </View>
    </ScrollView>
  );
}
