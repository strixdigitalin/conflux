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
        '\n\n\n\n<<< this is holiday\n\n\n\n\n\n\n',
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

          <FlatList
            data={birthdays}
            renderItem={({ item }) => {
              const da = new Date(item.em_birthday);
              return (
                <View
                  style={{
                    ...commonStyles.rowBetween,
                    backgroundColor: '#fff',
                    elevation: 8,
                    shadowColor: '#999',
                    paddingVertical: 12,
                    borderRadius: 8,
                    width: SIZES.width / 1.14,
                    marginHorizontal: 3,
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
            }}
            pagingEnabled
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <Text
          style={{ ...commonStyles.fs14_400, marginTop: 20, marginBottom: 8 }}>
          Upcoming Holiday
        </Text>

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
          <FlatList
            data={holidays}
            renderItem={({ item }) => {
              const da = new Date(item.em_birthday);
              return (
                <View
                  style={{
                    ...commonStyles.rowBetween,
                    backgroundColor: '#fff',
                    elevation: 8,
                    shadowColor: '#999',
                    paddingVertical: 12,
                    borderRadius: 8,
                    width: SIZES.width / 1.1,
                    marginHorizontal: 3,
                  }}>
                  <View
                    style={{ ...commonStyles.rowStart, paddingHorizontal: 15 }}>
                    {/* <Image
                      source={require('../../assets/img/user-pic.png')}
                      style={{width: 48, height: 48}}
                    /> */}
                    <View style={{ marginLeft: 12 }}>
                      <Text
                        style={{ ...commonStyles.fs16_400, color: '#d10044' }}>
                        {item.holiday_name}
                      </Text>
                      <Text
                        style={{
                          ...commonStyles.fs12_400,
                          color: '#000000',
                          fontSize: 10,
                        }}>
                        {item.from_date} {'  '} to {item.to_date}
                        {/* {item.designation} */}
                      </Text>
                    </View>
                  </View>
                  {/* <View style={{ marginRight: 12 }}>
                    <Text
                      style={{ ...commonStyles.fs24_500, color: COLORS.green }}>
                      {da.getDate()}
                    </Text>
                    <Text style={{ ...commonStyles.fs12_400, color: '#000000' }}>
                      {MonthArr[da.getMonth()]}
                    </Text>
                  </View> */}
                </View>
              );
            }}
            pagingEnabled
            horizontal
            showsHorizontalScrollIndicator={false}
          />
          {/* <ScrollView
            horizontal
            disableIntervalMomentum={false}
            showsHorizontalScrollIndicator={true}
            pagingEnabled={true}
            snapToInterval={300}>
            {holidayLoader == 2 && holidays.length == 0 && (
              <View style={{padding: 10}}>
                <Text>No upcoming birthdays</Text>
              </View>
            )}
            {holidays.map(item => {
              
            })}
          </ScrollView> */}
        </View>

        {/* {holidays.map(item => {
          return (
            <Image
              source={require('../../assets/img/diwali.png')}
              resizeMode="contain"
              style={{width: '100%', height: SIZES.width / 1.67, marginTop: 10}}
            />
          );
        })} */}
      </View>
      {/* <ScrollView
        horizontal
        disableIntervalMomentum={false}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        snapToInterval={300}> */}
      <Image
        source={require('../../assets/img/diwali.png')}
        resizeMode="contain"
        style={{ width: '100%', height: SIZES.width / 1.67 }}
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
        style={{ width: '100%', height: SIZES.width / 1.67 }}
      />
      {/* </ScrollView> */}
    </ScrollView>
  );
}
