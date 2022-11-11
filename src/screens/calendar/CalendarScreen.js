import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';

import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import moment from 'moment';
import {COLORS, SIZES} from '../../utils/theme';
import {CalendarLoader} from './CalendarLoader';
import {Image} from 'react-native';
import PayslipHeader from '../payslip/PayslipHeader';
import {commonStyles} from '../../utils/styles';
import {getAttedance} from '../../utils/API';
import {useSelector} from 'react-redux';
const a1 = {key: 'a1', color: 'black', selectedDotColor: 'blue'};
const a2 = {key: 'a2', color: 'black'};
const a3 = {key: 'a3', color: 'black', selectedDotColor: 'blue'};
var today = new Date();
var date =
  today.getFullYear() +
  '- 0' +
  parseInt(today.getMonth() + 1) +
  '-0' +
  today.getDate();
console.log(date);

function getMonthYear(month, year) {
  var monthyear = '';
  switch (month) {
    case 1:
      monthyear = `JAN-${year}`;
      break;
    case 2:
      monthyear = `FEB-${year}`;
      break;
    case 3:
      monthyear = `MAR-${year}`;
      break;
    case 4:
      monthyear = `APR-${year}`;
      break;
    case 5:
      monthyear = `MAY-${year}`;
      break;
    case 6:
      monthyear = `JUN-${year}`;
      break;
    case 7:
      monthyear = `JUL-${year}`;
      break;
    case 8:
      monthyear = `AUG-${year}`;
      break;
    case 9:
      monthyear = `SEP-${year}`;
      break;
    case 10:
      monthyear = `OCT-${year}`;
      break;
    case 11:
      monthyear = `NOV-${year}`;
      break;
    case 12:
      monthyear = `DEC-${year}`;
      break;
    default:
      break;
  }

  return console.log('Returned monthyear: ', monthyear), monthyear;
}

export default function CalendarScreen({navigation, route}) {
  console.log(userData, '<<<<');
  var month = parseInt(moment().format('MM'));
  const {userData} = useSelector(state => state.User);
  const [attandance, setattandance] = useState([]);
  var [currMonthPassed, setCurrMonthPassed] = useState(
    moment().format('YYYY-MM-DD'),
  );
  console.log('initial month', month);
  var currentyear = parseInt(moment().format('YYYY'));
  useEffect(() => {
    console.log('\n\n\n calling attandance api');
    getAttedance(userData.staffid, res => {
      console.log('\n\n\n\n\n', res, '<<<<staffidresponse', userData.staffid);
      if (res.statusCode === 200) {
        setattandance(res.body);
      }
    });
  }, []);

  console.log('initial month', month);
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [dates, setDates] = useState({});
  const [currentMonth, setCurrentMonth] = useState(month);
  // const [monthYear, setMonthYear] = useState(initialMonthYear);

  useEffect(() => {
    // setLoading(true);
    var monthYear = getMonthYear(currentMonth, currentyear);
  }, []);

  useEffect(() => {
    console.log('dates updated', dates);
  }, [dates]);

  useEffect(() => {
    console.log('current Month Changed', currentMonth);
    // setLoading(true);
    var monthYear = getMonthYear(currentMonth, currentyear);
  }, [currentMonth]);

  useEffect(() => {
    console.log('Events Updated: ', events);

    var dateArray = {};
    events.forEach(element => {
      console.log('forech', element.CALENDAR_DATE);
      var d = moment(element.CALENDAR_DATE).format('yyyy-MM-DD');
      console.log('d', d);
      dateArray[d] = {dots: [a2]};
    });

    setDates(dateArray);
  }, [events]);

  var filteredEvents = [];

  events.forEach(element => {
    var eventMonth = parseInt(moment(element.CALENDAR_DATE).format('MM'));
    if (eventMonth == currentMonth) {
      filteredEvents.push(element);
    }
  });

  return (
    <>
      {/* <NavBar navigation={navigation} title="My Calendar" /> */}
      <PayslipHeader />
      <ScrollView>
        {loading ? (
          <CalendarLoader />
        ) : (
          <View>
            {/* <ScrollView> */}
            {/* <View style={{ pointerEvents: "none", backgroundColor: 'transparent' }}> */}
            <Text
              style={{
                ...commonStyles.fs15_400,
                color: '#0073FF',
                margin: 20,
                textAlign: 'center',
              }}>
              Interview Calender
            </Text>
            <CalendarList
              current={currMonthPassed}
              horizontal={true}
              // hideArrows={false}
              pagingEnabled={true}
              calendarWidth={SIZES.width}
              markingType={'multi-dot'}
              theme={{todayTextColor: 'black'}}
              enableSwipeMonths={true}
              markedDates={dates}
            />
            <View
              style={{
                width: SIZES.width,
                height: 365,
                marginTop: -365,
                backgroundColor: 'transparent',
              }}>
              <View style={{width: SIZES.width, padding: 20}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      var val = moment(currMonthPassed);
                      val = val.subtract(1, 'months').format('YYYY-MM-DD');
                      setCurrMonthPassed(val);
                      var valmonth = parseInt(moment(val).format('MM'));
                      setCurrentMonth(valmonth);
                      console.log('setCurrMonthPassed Left', val, valmonth);
                    }}>
                    <View style={{height: 30, width: 40, alignItems: 'center'}}>
                      <Image
                        source={require('../../assets/img/c-back.png')}
                        style={{width: 20, height: 20}}
                      />
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      var val = moment(currMonthPassed);
                      val = val.add(1, 'months').format('YYYY-MM-DD');
                      setCurrMonthPassed(val);
                      var valmonth = parseInt(moment(val).format('MM'));
                      setCurrentMonth(valmonth);
                      console.log('setCurrMonthPassed Right', val, valmonth);
                    }}>
                    <View style={{height: 30, width: 40, alignItems: 'center'}}>
                      <Image
                        source={require('../../assets/img/c-next.png')}
                        style={{width: 20, height: 20}}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {/* </View> */}

            <Text
              style={{
                fontSize: 20,
                fontWeight: '600',
                marginLeft: 10,
                marginTop: 20,
                fontFamily: 'STCForward-Regular',
                color: '#000',
                marginBottom: 10,
              }}>
              {' '}
              Events{' '}
            </Text>

            {true > 0 ? (
              <FlatList
                // data={[1, 2]}
                data={attandance}
                renderItem={({item, id}) => {
                  var bgColor = '#E8EBFB';
                  var d = moment(item.CALENDAR_DATE).format('DD');
                  // return (
                  //   <View
                  //     style={[
                  //       styles.leaveShowContainer,
                  //       {backgroundColor: bgColor},
                  //     ]}
                  //     key={id}>
                  //     <View style={{...commonStyles.rowBetween}}>
                  //       <View style={{...commonStyles.rowStart}}>
                  //         <Text
                  //           style={{
                  //             ...commonStyles.fs16_700,
                  //             color: '#1C67F6',
                  //           }}>
                  //           {/* {item} */}
                  //         </Text>
                  //         <Image
                  //           source={require('../../assets/img/check.png')}
                  //           style={{width: 12, height: 12, marginLeft: 4}}
                  //         />
                  //       </View>
                  //       <Text style={{...commonStyles.fs12_400}}>
                  //         {item.atten_date}
                  //       </Text>
                  //     </View>
                  //     <Text style={{...commonStyles.fs14_500}}>
                  //       Financial Year: {item.financial_year}
                  //     </Text>
                  //     <Text style={{...commonStyles.fs14_500}}>
                  //       Status: {item.status}
                  //     </Text>
                  //   </View>
                  // );
                  return (
                    <EventCard
                      count={10}
                      head={item.financial_year}
                      subhead={item.status}
                      from={item.atten_date}
                      // to={'item.EVENT_END_DATE'}
                      key={item}
                      // item={item}
                    />
                  );
                }}
                keyExtractor={item => item.id}
              />
            ) : (
              <Text
                style={{
                  alignContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  color: 'grey',
                  marginTop: 100,
                }}>
                No Events for this month
              </Text>
            )}

            <View style={{height: 100}} />
          </View>
        )}
      </ScrollView>
    </>
  );
}

function EventCard({count, head, from, to, subhead, item}) {
  return (
    <View style={styles.userBlock}>
      <View style={{width: SIZES.width - 45, paddingLeft: 2}}>
        <Text style={{marginBottom: 2, ...commonStyles.fs15_600}}>
          Interview For {head}
        </Text>
        <View style={{...commonStyles.rowStart}}>
          <Text style={{...commonStyles.fs13_400, marginBottom: 2}}>
            Interviewer Name
          </Text>
          <Text
            style={{...commonStyles.fs13_500, marginBottom: 2, marginLeft: 8}}>
            {subhead}
          </Text>
        </View>

        <View style={{...commonStyles.rowStart}}>
          <Text style={{...commonStyles.fs13_400, marginBottom: 2}}>Time</Text>
          <Text
            style={{...commonStyles.fs13_500, marginBottom: 2, marginLeft: 8}}>
            {from}
          </Text>
        </View>
        {/* <View style={{...commonStyles.rowStart}}>
          <Text style={{...commonStyles.fs13_400, marginBottom: 2}}>Mode</Text>
          <Text
            style={{...commonStyles.fs13_500, marginBottom: 2, marginLeft: 8}}>
            Online
          </Text>
        </View> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  leaveShowContainer: {
    borderWidth: 1,
    borderColor: '#1C67F6',
    padding: 10,
    borderRadius: 4,
    backgroundColor: '#E8EBFB',
    marginTop: 14,
  },
  // User Profile styling
  userBlock: {
    flexDirection: 'row',
    width: SIZES.width - 20,
    marginLeft: 10,
    textAlign: 'left',
    alignSelf: 'stretch',
    elevation: 5,
    padding: 10,
    shadowColor: '#000',
    backgroundColor: '#fff',
    borderRadius: 4,
    marginBottom: 16,
  },
  userProfile: {
    height: 60,
    width: 60,
    resizeMode: 'cover',
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 50,
  },

  // Forgot Button Style
  forgotButton: {
    marginVertical: 20,
  },
  navButtonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
    fontFamily: 'STCForward-Regular',
  },
  roundBackground: {
    // marginRight: 5,
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: 'black',
  },
});
