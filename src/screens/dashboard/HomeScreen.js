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
var MonthArr = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];

export default function HomeScreen({ navigation }) {
  const isfocused = useIsFocused();
  const ref = React.useRef(0);
  const [holidayLoader, setHolidayLoader] = useState(0);
  const slider = React.useRef(null);
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
      setholidays(JSON.parse(res).body);
      console.log(
        '\n\n\n\n',
        JSON.parse(res).body,
        '\n\n\n\n<<< this is holiday',
      );
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

  const itemWidth = SIZES.width;

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
          <ScrollView
            horizontal
            disableIntervalMomentum={false}
            showsHorizontalScrollIndicator={true}
            pagingEnabled={true}
            snapToInterval={300}>
            {birthdayLoader == 2 && birthdays.length == 0 && (
              <View style={{ padding: 10 }}>
                <Text>No upcoming birthdays</Text>
              </View>
            )}
            {birthdays.map(item => {
              const da = new Date(item.em_birthday);
              return (
                <View
                  style={{
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
                        {item.first_name} {item.last_name}
                      </Text>
                      <Text
                        style={{
                          ...commonStyles.fs12_400,
                          color: '#000000',
                          fontSize: 10,
                        }}>
                        {item.designation}
                      </Text>
                    </View>
                  </View>
                  <View style={{ marginRight: 12 }}>
                    <Text
                      style={{ ...commonStyles.fs24_500, color: COLORS.green }}>
                      {da.getDate()}
                    </Text>
                    <Text style={{ ...commonStyles.fs12_400, color: '#000000' }}>
                      {MonthArr[da.getMonth()]}
                    </Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
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
        {/* <FlatList
          ref={slider}
          getItemLayout={(data, index) => ({
            length: itemWidth,
            offset: itemWidth * index,
            index,
          })}
          snapToInterval={itemWidth}
          horizontal={true}
          data={[1, 2]}
          renderItem={(item, index) => {
            return (
              <View>
                <Text> </Text>
                <Image
                  key={index}
                  source={require('../../assets/img/diwali.png')}
                  resizeMode="contain"
                  // style={{width: '100%', height: SIZES.width / 1.67}}
                  style={{width: 500}}
                />
              </View>
            );
          }}
          scrollEnabled={false}
          decelerationRate="fast"
          bounces={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index}
          disableIntervalMomentum
        /> */}

        {/* {holidays.map(item => {
          return (
            <Image
              source={require('../../assets/img/diwali.png')}
              resizeMode="contain"
              style={{width: '100%', height: SIZES.width / 1.67, marginTop: 10}}
            />
          );
        })} */}
        <View>
          {holidayLoader == 1 && (
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
          <ScrollView
            horizontal
            disableIntervalMomentum={true}
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
            snapToInterval={300}>
            {holidayLoader == 2 && holidays.length == 0 && (
              <View style={{ padding: 10 }}>
                <Text>No upcoming birthdays</Text>
              </View>
            )}
            {holidays.map(item => {
              const da = new Date(item.em_birthday);

              return (
                <View
                  style={{
                    width: SIZES.width / 1.07, backgroundColor: '#fff',
                    elevation: 8, shadowColor: '#999', paddingVertical: 12, borderRadius: 8, marginRight: 16
                  }}>
                  <View style={{}}>
                    {/* <Image
                      source={require('../../assets/img/user-pic.png')}
                      style={{width: 48, height: 48}}
                    /> */}
                    <View style={{ marginLeft: 12 }}>
                      <Text
                        style={{ ...commonStyles.fs16_400, color: '#d10044' }}>
                        {item.holiday_name}
                      </Text>
                    </View>
                  </View>
                  <View style={{ marginRight: 12, marginLeft: 10 }}>
                    <Text
                      style={{
                        ...commonStyles.fs24_500,
                        color: COLORS.green,
                        fontSize: 12,
                      }}>
                      {item.from_date}
                      {'   '}
                      <Text style={{ color: '#000', marginLeft: 20 }}>To</Text>
                      {'    '}
                      {item.to_date}
                    </Text>
                    {/* <Text style={{...commonStyles.fs12_400, color: '#000000'}}>
                      {item.to_date}
                    </Text> */}
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
}