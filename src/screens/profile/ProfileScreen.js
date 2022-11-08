import {View, Text, Alert} from 'react-native';
import React from 'react';
import ProfileHeader from './ProfileHeader';
import {StatusBar} from 'react-native';
import {COLORS} from '../../utils/theme';
import {commonStyles} from '../../utils/styles';
import {ScrollView} from 'react-native';
import {RenderPaySlip} from '../payslip/PayslipScreen';
import {TouchableHighlight} from 'react-native';
import {StyleSheet} from 'react-native';
import {userProfile} from '../../services/profile';
import {useState} from 'react';

export default function ProfileScreen({navigation}) {
  const [userData, setUserData] = useState({});
  React.useEffect(() => {
    userProfile(326, res => {
      console.log(res, '\n\n<<<res at user profile apge');
      if (res.success == false) {
        Alert.alert('Unable to fetch profile data');
      } else {
        setUserData(res.data);
      }
    });
  }, []);

  return (
    <ScrollView>
      <ProfileHeader navigation={navigation} userData={userData} />
      <StatusBar barStyle="light-content" backgroundColor={COLORS.blue} />

      <View style={{padding: 12}}>
        <PresonalInfo title="Phone" subTitle={`+91 ${userData?.em_phone}`} />

        <PresonalInfo title="Email" subTitle={userData?.em_email} />

        <PresonalInfo title="Birthday" subTitle={userData?.em_birthday} />

        <PresonalInfo title="Gender" subTitle={userData?.em_gender} />

        <PresonalInfo
          title="Date of Join"
          subTitle={userData?.em_joining_date}
        />

        <PresonalInfo
          title="Reports to"
          subTitle={userData?.reporting_person}
        />

        <Text
          style={{...commonStyles.fs16_400, color: '#0073FF', marginTop: 20}}>
          Address Information
        </Text>
        <Text
          style={{
            ...commonStyles.fs14_400,
            color: '#0073FF',
            marginTop: 3,
            opacity: 0.7,
          }}>
          Permanent Address
        </Text>
        <PresonalInfo title="Address" subTitle="Lathi, panda street" />

        <PresonalInfo title="City" subTitle="Lathi" />

        <PresonalInfo title="Country" subTitle="India" />

        <Text
          style={{
            ...commonStyles.fs14_400,
            color: '#0073FF',
            marginTop: 14,
            opacity: 0.7,
          }}>
          Present Address
        </Text>
        <PresonalInfo title="Address" subTitle="Lathi, panda street" />

        <PresonalInfo title="City" subTitle="Lathi" />

        <PresonalInfo title="Country" subTitle="India" />

        <Text
          style={{...commonStyles.fs16_400, color: '#0073FF', marginTop: 20}}>
          Emergency Contact
        </Text>
        <Text
          style={{
            ...commonStyles.fs14_400,
            color: '#0073FF',
            marginTop: 14,
            opacity: 0.7,
          }}>
          Primary
        </Text>
        <PresonalInfo title="Name" subTitle={userData?.primary_name} />

        <PresonalInfo
          title="Relationship"
          subTitle={userData?.primary_relationship}
        />

        <PresonalInfo title="Phone" subTitle={userData?.primary_phone} />

        <Text
          style={{
            ...commonStyles.fs14_400,
            color: '#0073FF',
            marginTop: 14,
            opacity: 0.7,
          }}>
          Secondary
        </Text>
        <PresonalInfo title="Name" subTitle={userData?.secondary_name} />

        <PresonalInfo
          title="Relationship"
          subTitle={userData?.secondary_relationship}
        />

        <PresonalInfo title="Phone" subTitle={userData?.secondary_phone} />

        <Text
          style={{...commonStyles.fs16_400, color: '#0073FF', marginTop: 20}}>
          Document Informations
        </Text>
        <View style={{alignItems: 'center'}}>
          {Object?.keys({...userData?.documentinfo}).map(item => {
            return <RenderPaySlip title={item} />;
          })}
        </View>

        <Text
          style={{...commonStyles.fs16_400, color: '#0073FF', marginTop: 20}}>
          Bank Informations
        </Text>
        <PresonalInfo title="A/C Holder" subTitle={userData?.holder_name} />

        <PresonalInfo title="Branch" subTitle={userData?.branch_name} />

        <PresonalInfo title="Bank" subTitle={userData?.bank_name} />

        <PresonalInfo title="A/C No." subTitle={userData?.account_number} />

        <PresonalInfo title="IFSC Code" subTitle={userData?.ifsc_code} />

        <PresonalInfo title="PAN No." subTitle={userData?.employee_pan} />

        <PresonalInfo title="PF No." subTitle={userData?.pf_number} />

        <PresonalInfo title="ESIC No." subTitle={userData?.esic_number} />

        <TouchableHighlight
          style={styles.applyBtn}
          underlayColor="#0073FF"
          onPress={() => {}}>
          <Text style={{...commonStyles.fs16_400, color: '#fff'}}>
            Apply Resignation
          </Text>
        </TouchableHighlight>
      </View>
    </ScrollView>
  );
}

const PresonalInfo = ({title, subTitle}) => {
  return (
    <View style={{...commonStyles.rowStart, marginTop: 4}}>
      <Text style={{...commonStyles.fs15_400, width: 150}}>{title}</Text>
      <Text
        style={{
          ...commonStyles.fs15_400,
          color: 'rgba(0,104,158,0.9294117647058824 )',
        }}>
        : {subTitle}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  applyBtn: {
    width: '100%',
    height: 60,
    backgroundColor: '#1C67F6',
    ...commonStyles.centerStyles,
    borderRadius: 50,
    marginTop: 20,
    marginBottom: 10,
  },
});
