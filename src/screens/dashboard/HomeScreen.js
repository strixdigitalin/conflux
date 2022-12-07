import { View, Text, FlatList } from 'react-native';
import React, { useState } from 'react';
import { Image } from 'react-native';
import { COLORS, SIZES } from '../../utils/theme';
import { ImageBackground } from 'react-native';
import { commonStyles } from '../../utils/styles';
import HomeHeader from './HomeHeader';
import NoticeBoardComponent from './NoticeBoardComponent';
import { ScrollView } from 'react-native';
import { StatusBar } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useEffect } from 'react';
import { useScrollToTop } from '@react-navigation/native';
import { getBirthdays, getNotice, upCommingHoliday } from '../../utils/API';
import { ActivityIndicator } from 'react-native-paper';

export default function HomeScreen({ navigation }) {
  const isfocused = useIsFocused();
  const ref = React.useRef(0);
  const [holidayLoader, setHolidayLoader] = useState(0);
  const [birthdayLoader, setBirthdayLoader] = useState(0);
  const [holidays, setholidays] = useState([]);
  const [notice, setNotice] = useState([]);
  const [birthdays, setBirthdays] = useState([]);
  useEffect(() => {
    // return () => {};
    setHolidayLoader(1);
    setBirthdayLoader(1);

    upCommingHoliday(1, res => {
      setHolidayLoader(2);
      console.log(res, '<<< this is holiday');
    });
    getNotice(res => {
      console.log(res, '<<<this is get notice res');
      setNotice(res.body);
    });
    getBirthdays(res => {
      setBirthdayLoader(2);
      setBirthdays(res.body);
    });
  }, [isfocused]);

  return (
    <ScrollView
      ref={ref}
      style={{
        marginBottom: 50,
      }}>
      <HomeHeader navigation={navigation} />
      <StatusBar barStyle="light-content" backgroundColor={COLORS.blue} />
      <View style={{ padding: 15 }}>
        <NoticeBoardComponent notice={notice} />

        <Text
          style={{ ...commonStyles.fs14_400, marginTop: 20, marginBottom: 8 }}>
          Upcoming Birthday
        </Text>

        <View>
          {birthdayLoader == 1 && (
            <View
              style={{
                width: '100%',
                // alignContent: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <View style={{ width: 50, alignItems: 'center' }}>
                <ActivityIndicator />
              </View>
            </View>
          )}

          <FlatList
            data={birthdays}
            horizontal
            disableIntervalMomentum={true}
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
            snapToInterval={300}
            renderItem={({ item }) => {
              return (
                <View style={{
                  ...commonStyles.rowBetween, width: SIZES.width / 1.08, backgroundColor: '#fff',
                  elevation: 8, shadowColor: '#999', paddingVertical: 12, borderRadius: 8, marginRight: 16
                }}>
                  <View
                    style={{ ...commonStyles.rowStart, paddingHorizontal: 15 }}>
                    <Image
                      source={require('../../assets/img/user-pic.png')}
                      style={{ width: 48, height: 48 }}
                    />
                    <View style={{ marginLeft: 12 }}>
                      <Text
                        style={{ ...commonStyles.fs16_400, color: '#d10044' }}>
                        Anvika Acharya
                      </Text>
                      <Text
                        style={{ ...commonStyles.fs12_400, color: '#000000' }}>
                        HR & Admin
                      </Text>
                    </View>
                  </View>
                  <View style={{ marginRight: 12 }}>
                    <Text
                      style={{ ...commonStyles.fs24_500, color: COLORS.green }}>
                      02
                    </Text>
                    <Text style={{ ...commonStyles.fs12_400, color: '#000000' }}>
                      April
                    </Text>
                  </View>
                </View>
              );
            }}
          />
          {/* <ScrollView
            horizontal
            disableIntervalMomentum={true}
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
            snapToInterval={300}>
            {birthdayLoader == 2 && birthdays.length == 0 && (
              <View style={{ padding: 10 }}>
                <Text>No upcoming birthdays</Text>
              </View>
            )}
            {birthdays.map(item => {
              
            })}
          </ScrollView> */}
        </View>

        <Text
          style={{ ...commonStyles.fs14_400, marginTop: 20, marginBottom: 8 }}>
          Upcoming Holiday
        </Text>
        <ScrollView
          horizontal
          disableIntervalMomentum={false}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          snapToInterval={300}></ScrollView>
        {birthdayLoader == 1 && (
          <View>
            <ActivityIndicator />
          </View>
        )}
        {birthdays.length == 0 && birthdayLoader == 2 && (
          <View>
            <Text>No upcoming Holidays</Text>
          </View>
        )}

        {holidays.map(item => {
          return (
            <Image
              source={require('../../assets/img/diwali.png')}
              resizeMode="contain"
              style={{ width: '100%', height: SIZES.width / 1.67 }}
            />
          );
        })}
      </View>
    </ScrollView>
  );
}
