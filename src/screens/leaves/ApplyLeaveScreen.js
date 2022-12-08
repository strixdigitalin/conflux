import {View, Text, Image, ToastAndroid} from 'react-native';
import React, {useState} from 'react';
import LeavesHeader from './LeavesHeader';
import {commonStyles} from '../../utils/styles';
import {StyleSheet} from 'react-native';
import {ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native';
import PersonalLeaveDatePicker from '../../components/CustomDatePicker';
import {TextInput} from 'react-native';
import {TouchableHighlight} from 'react-native';
import {applyLeave} from '../../utils/API';
import {useSelector} from 'react-redux';
import moment from 'moment/moment';
import {Alert} from 'react-native';
import {SIZES} from '../../utils/theme';
import {Dropdown} from 'react-native-element-dropdown';
import {dropdownStyles} from '../../utils/dropdownStyles';
import {ActivityIndicator} from 'react-native-paper';
import {useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';

const data = [
  {label: 'First half', value: '1st half'},
  {label: 'Second half', value: '2nd half'},
  // {label: '3 Hour', value: '3 Hour'},
  // {label: '4 Hour', value: '4 Hour'},
  // {label: '5 Hour', value: '5 Hour'},
];

export default function ApplyLeavesScreen({navigation}) {
  const [shift, setShift] = React.useState('Full Day');
  const [startDate, setStartDate] = React.useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [endDate, setEndDate] = React.useState('');
  const [reason, setReason] = React.useState(null);
  const {userData} = useSelector(state => state.User);
  const [showLoader, setShowLoader] = React.useState(false);
  const [halfLength, setHalfLength] = useState('Select length');
  const [labelUp, setLabelUp] = React.useState(false);
  const [selectedLength, setSelectedLength] = React.useState('');
  const isfocused = useIsFocused();
  useEffect(() => {
    setStartDate('');
    setEndDate('');
    setReason('');
    setHalfLength('Select length');
    setShift('Full Day');
  }, [isfocused]);

  const SubmitForApply = () => {
    console.log(endDate, shift, halfLength, '<<<this is dend date');
    setIsSubmitted(true);
    // return null;
    if (startDate == '') return null;
    if (reason == null) return null;

    // if (reason == null) return Alert.alert('Reason is required!');
    if (shift == 'Above a Day' && endDate == '') return null;
    if (shift == 'Half Day' && halfLength == 'Select length') return null;
    console.log(
      userData.staffid,
      shift,
      startDate,
      startDate, // end
      reason,

      '<<<this is user data',
    );
    setShowLoader(true);
    let payload = {};
    if (shift == 'Half Day') {
      payload = {
        staffid: userData.staffid,
        select_length: halfLength,
        // staffid: 393,
        type: shift,
        start_date: startDate,
        end_date: endDate,
        reason: reason,
      };
    }
    if (shift == 'Above a Day') {
      payload = {
        staffid: userData.staffid,
        select_length: halfLength,
        // staffid: 393,
        type: shift,
        start_date: startDate,
        end_date: endDate,
        reason: reason,
      };
    }
    if (shift == 'Full Day') {
      payload = {
        staffid: userData.staffid,
        select_length: halfLength,
        // staffid: 393,
        type: shift,
        start_date: startDate,
        end_date: startDate,
        reason: reason,
      };
    }
    // return null;

    applyLeave(payload, res => {
      const response = JSON.parse(res);
      console.log(res, '<<<at apply leave screen');
      Alert.alert(response.body);
      setShowLoader(false);
      setEndDate('');
      setReason('');
      setStartDate('');
      navigation.navigate('LeavesScreen');
    });
  };
  console.log(halfLength, '<<<<this is half length');

  const renderFullNameLabel = () => {
    if (reason || labelUp) {
      return (
        <Text
          style={[
            styles.label,
            labelUp && {
              color: '#222222',
              backgroundColor: '#fff',
              marginLeft: -7,
            },
          ]}>
          Reason
        </Text>
      );
    }
    return null;
  };
  const showToast = msg => {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  };

  const countType = type => {
    // const filtered = allLeaves.filter(item => item.leave_type == type);
    return 0;
  };
  return (
    <View>
      <LeavesHeader navigation={navigation} />

      <ScrollView
        style={{width: '100%', height: '100%', backgroundColor: '#fff'}}>
        <View style={{alignItems: 'center', marginTop: 22}}>
          <Text style={{...commonStyles.fs14_400, color: '#0073FF'}}>
            Leaves Available
          </Text>
        </View>

        <View style={styles.leaveContainer}>
          <RenderLeaveCount
            // count={allLeaves.length}
            count={countType('Sick Leave')}
            title={`Sick Leave`}
            // title={`Sick\nLeave`}
            bgColor="#E8EBFB"
            color="#235FDD"
          />

          <RenderLeaveCount
            count={countType('Privilege Leave')}
            title={`Privilege\nLeave`}
            bgColor="#FDF5E3"
            color="#F3A41D"
          />

          <RenderLeaveCount
            count={countType('Casual Leave')}
            title={`Casual\nLeave`}
            bgColor="#FBEEE9"
            color="#E75E40"
          />
        </View>

        <View style={{paddingHorizontal: 16}}>
          <View style={styles.tabContainer}>
            {['Full Day', 'Half Day', 'Above a Day'].map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.applyBtn,
                    {
                      backgroundColor: item === shift ? '#1C67F6' : '#fff',
                    },
                  ]}
                  onPress={() => {
                    setShift(item);
                    setIsSubmitted(false);
                  }}>
                  <Text
                    style={{
                      ...commonStyles.fs14_500,
                      color: item === shift ? '#fff' : '#999',
                    }}>
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={{padding: 16, marginTop: 12}}>
          <View style={{...commonStyles.rowBetween}}>
            <PersonalLeaveDatePicker
              placeholderText="Start Date"
              heading="Start Date *"
              selectedVal={startDate}
              minimumDate={''}
              maximumDate={endDate === '' ? '' : endDate}
              initialDate={startDate === '' ? endDate : startDate}
              isStart="yes"
              pickerWidth={
                shift === 'Full Day' ? SIZES.width - 34 : SIZES.width / 2.26
              }
              onDateSelected={function (val) {
                setStartDate(moment(val).format('DD-MMM-YYYY'));
              }}
            />

            {shift === 'Above a Day' ? (
              startDate.length !== 0 ? (
                <PersonalLeaveDatePicker
                  placeholderText="End Date"
                  heading="End Date *"
                  selectedVal={endDate}
                  minimumDate={startDate === '' ? '' : startDate}
                  maximumDate={endDate === '' ? '' : ''}
                  initialDate={endDate === '' ? startDate : endDate}
                  onDateSelected={function (val) {
                    if (startDate.length === 0) {
                      // alert('Please select start date first');
                      showToast('Please select start date');
                      console.log('\n\n Selected date: 1111');
                    } else {
                      setEndDate(moment(val).format('DD-MMM-YYYY'));
                      console.log('\n\n Selected date: 2222');
                    }
                  }}
                />
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    // Alert.alert('Important', 'Please select start date');
                    showToast('Please select start date first');
                  }}
                  style={{...styles.touchContainer}}
                  activeOpacity={0.8}>
                  <View style={[styles.inputContainer]}>
                    <Image
                      source={require('../../assets/img/date.png')}
                      style={{
                        width: 20,
                        height: 20,
                        marginRight: 4,
                        tintColor: '#999',
                      }}
                    />
                    <Text style={styles.input}>End Date</Text>
                  </View>
                </TouchableOpacity>
              )
            ) : (
              <></>
            )}

            {shift === 'Half Day' ? (
              <View style={styles.selectedLength}>
                <Image
                  source={require('../../assets/img/clock.png')}
                  // source={require('../../assets/img/check.png')}
                  style={{width: 20, height: 20, marginRight: 12}}
                />
                <Dropdown
                  style={[dropdownStyles.dropdown]}
                  placeholderStyle={dropdownStyles.placeholderStyle}
                  iconStyle={dropdownStyles.iconStyle}
                  data={data}
                  maxHeight={200}
                  placeholder={
                    halfLength == null ? 'Select length' : halfLength
                  }
                  // value={selectedLength.length !== 0 ? '' : selectedLength}
                  value={halfLength}
                  renderItem={item => {
                    return (
                      <View
                        style={{
                          width: '100%',
                          height: 34,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text style={{fontSize: 14, color: '#555'}}>
                          {item.label}
                        </Text>
                      </View>
                    );
                  }}
                  onChange={item => {
                    setHalfLength(item.label);
                  }}
                />

                {/* {halfLength != null ? (
                  <View style={{position: 'absolute', top: 14, left: 52}}>
                    <Text
                      style={{fontSize: 14, fontWeight: '500', color: '#555'}}>
                      {halfLength}
                    </Text>
                  </View>
                ) : (
                  <>
                    <View style={{position: 'absolute', top: 14, left: 52}}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: '500',
                          color: '#555',
                        }}>
                        Select Length
                      </Text>
                    </View>
                  </>
                )} */}
              </View>
            ) : (
              <></>
            )}
          </View>
          <View style={{...commonStyles.rowBetween}}>
            {isSubmitted && startDate == '' && (
              <Text style={{color: '#FF0000'}}>Start date is required</Text>
            )}
            {shift === 'Above a Day' ? (
              startDate.length !== 0 ? (
                <View style={{width: '100%', alignSelf: 'flex-end'}}>
                  {isSubmitted && endDate == '' && (
                    <Text style={{color: '#FF0000', textAlign: 'right'}}>
                      End date is required
                    </Text>
                  )}
                </View>
              ) : null
            ) : (
              <></>
            )}

            {shift === 'Half Day' ? (
              <>
                <View style={{width: '100%'}}>
                  {isSubmitted && halfLength == 'Select length' && (
                    <Text style={{color: '#FF0000', textAlign: 'right'}}>
                      This field is required
                    </Text>
                  )}
                </View>
              </>
            ) : (
              <></>
            )}
          </View>

          <View style={{marginTop: 16}}>
            {renderFullNameLabel()}
            <View
              style={{borderWidth: 1, borderColor: '#999', borderRadius: 10}}>
              <TextInput
                multiline
                value={reason}
                onChangeText={text => {
                  setReason(text);
                }}
                placeholder={labelUp ? '' : 'Reason'}
                placeholderTextColor="#222222"
                textAlignVertical="top"
                style={{
                  height: 150,
                  fontSize: 14,
                  color: '#222222',
                  paddingHorizontal: 16,
                }}
                onPressIn={() => {
                  setLabelUp(true);
                }}
              />
            </View>
            {isSubmitted && reason.length == 0 && (
              <>
                <Text style={{color: '#FF0000'}}>Reason is required</Text>
              </>
            )}
          </View>
          <Text />

          {!showLoader && (
            <TouchableHighlight
              style={{...styles.applyBtn, width: '50%', borderRadius: 50}}
              underlayColor="#0073FF"
              onPress={() => {
                SubmitForApply();
                //   navigation.navigate('ApplyLeavesScreen');
              }}>
              <Text style={{...commonStyles.fs16_400, color: '#fff'}}>
                Submit Request
              </Text>
            </TouchableHighlight>
          )}
          {showLoader && <ActivityIndicator />}
        </View>

        <View style={{height: 70}} />
      </ScrollView>
    </View>
  );
}

const RenderLeaveCount = ({count, title, bgColor, color}) => {
  return (
    <View style={{...styles.leaveCount, backgroundColor: bgColor}}>
      <Text style={{...commonStyles.fs26_700, color: color}}>{count}</Text>
      <Text
        style={{...commonStyles.fs14_500, textAlign: 'center', color: color}}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  leaveContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 22,
  },
  leaveCount: {
    width: '31%',
    padding: 10,
    alignItems: 'center',
    paddingVertical: 30,
    borderRadius: 12,
  },
  tabContainer: {
    ...commonStyles.rowBetween,
    elevation: 8,
    shadowColor: '#999',
    backgroundColor: '#fff',
    marginTop: 20,
    borderRadius: 8,
  },
  applyBtn: {
    width: '33%',
    height: 40,
    backgroundColor: '#1C67F6',
    ...commonStyles.centerStyles,
    borderRadius: 8,
    alignSelf: 'center',
  },
  leaveShowContainer: {
    borderWidth: 1,
    borderColor: '#1C67F6',
    padding: 10,
    borderRadius: 4,
    backgroundColor: '#E8EBFB',
    marginTop: 14,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'transparent',
    left: 22,
    top: -11,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  selectedLength: {
    ...commonStyles.rowStart,
    elevation: 9,
    marginTop: -16,
    shadowColor: '#999',
    backgroundColor: '#fff',
    height: 50,
    borderRadius: 9,
    width: SIZES.width / 2.26,
    paddingHorizontal: 16,
  },
  touchContainer: {
    elevation: 9,
    shadowColor: '#999',
    backgroundColor: '#fff',
    borderRadius: 9,
    marginTop: -16,
  },
  inputContainer: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    width: SIZES.width / 2.26,
  },
  input: {
    padding: 10,
    flex: 1,
    fontSize: 14,
    color: '#999999',
  },
  inputBlack: {
    padding: 10,
    flex: 1,
    fontSize: 14,
    color: '#000',
  },
});
