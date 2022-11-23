import { View, Text, TouchableHighlight } from 'react-native'
import React from 'react'
import PayslipHeader from './PayslipHeader'
import { StatusBar } from 'react-native'
import { COLORS, SIZES } from '../../utils/theme'
import { FlatList } from 'react-native'
import { StyleSheet } from 'react-native'
import { Image } from 'react-native'
import { commonStyles } from '../../utils/styles'
import { TouchableOpacity, PermissionsAndroid, Alert } from 'react-native'
import RNFetchBlob from 'rn-fetch-blob'
import { View, Text } from 'react-native';
import React, { useState } from 'react';
import PayslipHeader from './PayslipHeader';
import { StatusBar } from 'react-native';
import { COLORS, SIZES } from '../../utils/theme';
import { FlatList } from 'react-native';
import { StyleSheet } from 'react-native';
import { Image } from 'react-native';
import { commonStyles } from '../../utils/styles';
import { TouchableOpacity } from 'react-native';
import { useEffect } from 'react';
import { getPayslipData } from '../../services/profile';

const paySlips = [
    { name: 'January' },
    { name: 'February' },
    { name: 'March' },
    { name: 'April' },
    { name: 'May' },
    { name: 'June' },
    { name: 'July' },
    { name: 'August' },
];

export default function PayslipScreen() {
    const [payslipData, setPayslipData] = useState([]);
    useEffect(() => {
        first;

        getPayslipData(4, res => {
            console.log(res, '\n\n<<<< payslip data');
            setPayslipData(res.body);
        });
    }, []);

    return (
        <View style={{ backgroundColor: '#fff', width: '100%', height: '100%' }}>
            <PayslipHeader />
            <StatusBar barStyle="light-content" backgroundColor={COLORS.blue} />

            <View style={{ ...commonStyles.rowBetween, padding: 14 }}>
                <Text style={{ ...commonStyles.fs14_400, color: '#0073FF' }}>
                    Financial Year
                </Text>

                <TouchableOpacity style={styles.yearBtn}>
                    <Text
                        style={{
                            ...commonStyles.fs14_400,
                            color: 'rgba(0,104,158,0.9294117647058824 )',
                        }}>
                        2021-2022
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
                </TouchableOpacity>
            </View>
        </View>
    )
}


export const RenderPaySlip = ({ title }) => {

    const actualDownload = () => {
        const { dirs } = RNFetchBlob.fs;
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
            .then((res) => {
                console.log('The file saved to ', res.path());
            })
            .catch((e) => {
                console.log(e)
            });
    }

    const downloadFile = async () => {
        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                actualDownload();
            } else {
                Alert.alert('Permission Denied!', 'You need to give storage permission to download the file');
            }
        } catch (err) {
            console.warn(err);
        }
    }

    return (
        <View style={styles.paySlipItem}>
            <View style={{ ...commonStyles.rowStart }}>
                <Image
                    source={require('../../assets/img/file.png')}
                    resizeMode="contain"
                    style={{ width: 36, height: 36 }}
                />
                <Text style={{ ...commonStyles.fs15_400, marginLeft: 8 }}>{title}</Text>
            </View>
            <Image
                source={require('../../assets/img/download.png')}
                resizeMode="contain"
                style={{ width: 22, height: 22 }}
            />
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
