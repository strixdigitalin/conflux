import {View, Text, Image} from 'react-native';
import React from 'react';
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

const data = [
  {label: '1 Hour', value: '1 Hour'},
  {label: '2 Hour', value: '2 Hour'},
  {label: '3 Hour', value: '3 Hour'},
  {label: '4 Hour', value: '4 Hour'},
  {label: '5 Hour', value: '5 Hour'},
];

export default function ApplyLeavesScreen({navigation}) {
  const [shift, setShift] = React.useState('Full Day');
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndData] = React.useState('');
  const [reason, setReason] = React.useState(null);
  const {userData} = useSelector(state => state.User);

  const [labelUp, setLabelUp] = React.useState(false);
  const [selectedLength, setSelectedLength] = React.useState('');

  const SubmitForApply = () => {
    console.log(endDate, shift, '<<<this is dend date');
    // return null;
    if (startDate == '') return Alert.alert('Date is required!');
    if (reason == null) return Alert.alert('Reason is required!');
    // if (reason == null) return Alert.alert('Reason is required!');
    if (shift == 'Above a Day' && endDate == '')
      return Alert.alert('Please select end date');
    console.log(
      userData.staffid,
      shift,
      startDate,
      startDate, // end
      reason,

      '<<<this is user data',
    );

    const payload = {
      staffid: userData.staffid,
      type: shift,
      start_date: startDate,
      end_date: endDate,
      reason: reason,
    };
    // return null;
    applyLeave(payload, res => {
      const response = JSON.parse(res);
      console.log(res, '<<<at apply leave screen');
      Alert.alert(response.body);
    });
  };

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

  return (
    <View>
      <LeavesHeader />

      <ScrollView
        style={{width: '100%', height: '100%', backgroundColor: '#fff'}}>
        <View style={{alignItems: 'center', marginTop: 22}}>
          <Text style={{...commonStyles.fs14_400, color: '#0073FF'}}>
            Leaves Available
          </Text>
        </View>

        <View style={styles.leaveContainer}>
          <RenderLeaveCount
            count={0}
            title={`Sick\nLeave`}
            bgColor="#E8EBFB"
            color="#235FDD"
          />

          <RenderLeaveCount
            count={1}
            title={`Sick\nLeave`}
            bgColor="#FDF5E3"
            color="#F3A41D"
          />

          <RenderLeaveCount
            count={0}
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
              minimumDate="24-Dec-1900"
              maximumDate="24-Dec-2200"
              pickerWidth={
                shift === 'Full Day' ? SIZES.width - 34 : SIZES.width / 2.26
              }
              initialDate={startDate}
              isStart="yes"
              onDateSelected={function (val) {
                const checkDate = moment(val).format('YYYY-MM-DD');
                setStartDate(`${checkDate}`);
              }}
            />

            {shift === 'Above a Day' ? (
              <PersonalLeaveDatePicker
                placeholderText="End Date"
                minimumDate="24-Dec-1900"
                maximumDate="24-Dec-2200"
                initialDate={endDate}
                isStart="yes"
                onDateSelected={function (val) {
                  const checkDate = moment(val).format('YYYY-MM-DD');
                  setEndData(`${checkDate}`);
                }}
              />
            ) : (
              <></>
            )}

            {shift === 'Half Day' ? (
              <View style={styles.selectedLength}>
                <Image
                  source={require('../../assets/img/clock.png')}
                  style={{width: 20, height: 20, marginRight: 12}}
                />
                <Dropdown
                  style={[dropdownStyles.dropdown]}
                  placeholderStyle={dropdownStyles.placeholderStyle}
                  iconStyle={dropdownStyles.iconStyle}
                  data={data}
                  maxHeight={200}
                  placeholder={
                    selectedLength.length !== 0 ? '' : 'Selected Length'
                  }
                  value={selectedLength.length !== 0 ? '' : selectedLength}
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
                    setSelectedLength(item.value);
                  }}
                />

                {selectedLength.length !== 0 ? (
                  <View style={{position: 'absolute', top: 14, left: 52}}>
                    <Text
                      style={{fontSize: 14, fontWeight: '500', color: '#555'}}>
                      {selectedLength}
                    </Text>
                  </View>
                ) : (
                  <></>
                )}
              </View>
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
          </View>
          <Text />

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
});
