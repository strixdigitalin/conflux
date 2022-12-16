import {
  View,
  Text,
  TouchableHighlight,
  StatusBar,
  PermissionsAndroid,
  Alert,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import PayslipHeader from './PayslipHeader';
import {COLORS, SIZES} from '../../utils/theme';
import {commonStyles} from '../../utils/styles';
import RNFetchBlob from 'rn-fetch-blob';
import {getPayslipData} from '../../services/profile';
import {FlatList} from 'react-native';
import {truncate} from '../profile/ProfileHeader';
import {Dropdown} from 'react-native-element-dropdown';
import {dropdownStyles} from '../../utils/dropdownStyles';

const paySlips = [
  {name: 'January'},
  {name: 'February'},
  {name: 'March'},
  {name: 'April'},
  {name: 'May'},
  {name: 'June'},
  {name: 'July'},
  {name: 'August'},
];

const data = [
  {label: 'First half', value: 'All'},
  {label: 'First half', value: '2021-2022'},
  {label: 'Second half', value: '2020-2021'},
  // {label: '3 Hour', value: '3 Hour'},
  // {label: '4 Hour', value: '4 Hour'},
  // {label: '5 Hour', value: '5 Hour'},
];

export default function PayslipScreen({navigation}) {
  const [payslipData, setPayslipData] = useState([]);
  const [selectedYear, setSelectedYear] = useState('All');
  const [showDrop, setShowDrop] = useState(false);
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    // first;

    getPayslipData(4, res => {
      console.log('\n\n<<<< payslip data payslipData: ', res.body[1]);
      setPayslipData(res.body[1]);
      setAllData(res.body[1]);
    });
  }, []);

  useEffect(() => {
    if (selectedYear == 'All') {
      setPayslipData(allData);
    } else {
      filterByYear();
    }
  }, [selectedYear]);

  const filterByYear = () => {
    const temp = allData.filter(item => {
      if (item.financial_year == selectedYear) {
        return true;
      }
    });
    setPayslipData(temp);
  };

  return (
    <View style={{backgroundColor: '#fff', width: '100%', height: '100%'}}>
      <PayslipHeader navigation={navigation} />
      <StatusBar barStyle="light-content" backgroundColor={COLORS.blue} />

      <View style={{...commonStyles.rowBetween, padding: 14}}>
        <Text style={{...commonStyles.fs14_400, color: '#0073FF'}}>
          Financial Year
        </Text>

        <TouchableOpacity
          style={{...styles.yearBtn, position: 'relative'}}
          onPress={() => {
            setShowDrop(true);
          }}>
          {/* <View> */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <Text
              style={{
                ...commonStyles.fs14_400,
                color: 'rgba(0,104,158,0.9294117647058824 )',
              }}>
              {selectedYear}
            </Text>

            <Image
              source={require('../../assets/img/down-arrow.png')}
              resizeMode="contain"
              style={{
                width: 14,
                height: 14,
                tintColor: 'rgba(0,104,158,0.9294117647058824 )',
              }}
            />
          </View>
          <View
            style={{
              position: 'absolute',
              top: 35,
              // left: 10,
              zIndex: 99,
            }}>
            {showDrop &&
              data.map(item => {
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: '100%',
                      marginTop: 5,
                      borderWidth: 1,
                      borderRadius: 10,
                      width: 130,
                      height: 25,
                      borderRadius: 100,
                      borderWidth: 1,
                      borderColor: 'rgba(0,104,158,0.9294117647058824 )',
                      // paddingHorizontal: 8,
                    }}>
                    <Text
                      style={{
                        ...commonStyles.fs14_400,
                        color: 'rgba(0,104,158,0.9294117647058824 )',
                        width: '100%',
                        textAlign: 'center',
                      }}
                      onPress={() => {
                        setSelectedYear(item.value);
                        setShowDrop(false);
                      }}>
                      {item.value}
                    </Text>

                    {/* <Image
              source={require('../../assets/img/down-arrow.png')}
              resizeMode="contain"
              style={{
                width: 14,
                height: 14,
                tintColor: 'rgba(0,104,158,0.9294117647058824 )',
              }}
            /> */}
                  </View>
                );
              })}
          </View>
          {/* </View> */}
          {/* <View>
            <Text
              style={{
                ...commonStyles.fs14_400,
                color: 'rgba(0,104,158,0.9294117647058824 )',
              }}>
              2021-2022
            </Text>
          </View> */}
        </TouchableOpacity>
      </View>

      <FlatList
        data={payslipData}
        style={{marginVertical: 14, marginTop: showDrop ? 70 : 10}}
        contentContainerStyle={{alignItems: 'center'}}
        renderItem={({item}) => {
          return <RenderPaySlip title={item?.financial_year} />;
        }}
        ListFooterComponent={<View style={{marginBottom: 50}} />}
      />
    </View>
  );
}

export const RenderPaySlip = ({title = 'iii'}) => {
  const actualDownload = () => {
    const {dirs} = RNFetchBlob.fs;
    RNFetchBlob.config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
        title: `test.pdf`,
        path: `${dirs.DownloadDir}/test.pdf`,
      },
    })
      .fetch('GET', 'http://www.africau.edu/images/default/sample.pdf', {})
      .then(res => {
        console.log('The file saved to ', res.path());
      })
      .catch(e => {
        console.log(e);
      });
  };

  const downloadFile = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        actualDownload();
      } else {
        Alert.alert(
          'Permission Denied!',
          'You need to give storage permission to download the file',
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <View style={styles.paySlipItem}>
      <View style={{...commonStyles.rowStart}}>
        <Image
          source={require('../../assets/img/file.png')}
          resizeMode="contain"
          style={{width: 36, height: 36}}
        />
        <Text style={{...commonStyles.fs15_400, marginLeft: 8}}>
          {truncate(title, 50)}
        </Text>
      </View>

      <TouchableHighlight onPress={downloadFile} underlayColor="#dcdcdc">
        <Image
          source={require('../../assets/img/download.png')}
          resizeMode="contain"
          style={{width: 22, height: 22}}
        />
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  paySlipItem: {
    elevation: 4,
    shadowColor: '#333',
    backgroundColor: '#fff',
    width: SIZES.width / 1.05,
    paddingVertical: 8,
    paddingHorizontal: 8,
    margin: 10,
    borderRadius: 4,
    ...commonStyles.rowBetween,
  },
  yearBtn: {
    ...commonStyles.rowBetween,
    width: 130,
    height: 38,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(0,104,158,0.9294117647058824 )',
    paddingHorizontal: 8,
  },
});
