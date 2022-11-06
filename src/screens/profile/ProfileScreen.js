import { View, Text } from 'react-native'
import React from 'react'
import ProfileHeader from './ProfileHeader'
import { StatusBar } from 'react-native'
import { COLORS } from '../../utils/theme'
import { commonStyles } from '../../utils/styles'
import { ScrollView } from 'react-native'
import { RenderPaySlip } from '../payslip/PayslipScreen'
import { TouchableHighlight } from 'react-native'
import { StyleSheet } from 'react-native'

export default function ProfileScreen() {
    return (
        <ScrollView>
            <ProfileHeader />
            <StatusBar barStyle="light-content" backgroundColor={COLORS.blue} />

            <View style={{ padding: 12 }}>
                <PresonalInfo
                    title="Phone"
                    subTitle="+91 8847885937"
                />

                <PresonalInfo
                    title="Email"
                    subTitle="username@example.com"
                />

                <PresonalInfo
                    title="Birthday"
                    subTitle="01-04-1999"
                />

                <PresonalInfo
                    title="Gender"
                    subTitle="Male"
                />

                <PresonalInfo
                    title="Date of Join"
                    subTitle="02-08-2020"
                />

                <PresonalInfo
                    title="Reports to"
                    subTitle="AR Ghosh"
                />

                <Text style={{ ...commonStyles.fs16_400, color: "#0073FF", marginTop: 20 }}>Address Information</Text>
                <Text style={{ ...commonStyles.fs14_400, color: "#0073FF", marginTop: 3, opacity: 0.7 }}>Permanent Address</Text>
                <PresonalInfo
                    title="Address"
                    subTitle="Lathi, panda street"
                />

                <PresonalInfo
                    title="City"
                    subTitle="Lathi"
                />

                <PresonalInfo
                    title="Country"
                    subTitle="India"
                />

                <Text style={{ ...commonStyles.fs14_400, color: "#0073FF", marginTop: 14, opacity: 0.7 }}>Present Address</Text>
                <PresonalInfo
                    title="Address"
                    subTitle="Lathi, panda street"
                />

                <PresonalInfo
                    title="City"
                    subTitle="Lathi"
                />

                <PresonalInfo
                    title="Country"
                    subTitle="India"
                />

                <Text style={{ ...commonStyles.fs16_400, color: "#0073FF", marginTop: 20 }}>Emergency Contact</Text>
                <Text style={{ ...commonStyles.fs14_400, color: "#0073FF", marginTop: 14, opacity: 0.7 }}>Primary</Text>
                <PresonalInfo
                    title="Name"
                    subTitle="Lathi, panda street"
                />

                <PresonalInfo
                    title="Relationship"
                    subTitle="Lathi"
                />

                <PresonalInfo
                    title="Phone"
                    subTitle="India"
                />

                <Text style={{ ...commonStyles.fs14_400, color: "#0073FF", marginTop: 14, opacity: 0.7 }}>Secondary</Text>
                <PresonalInfo
                    title="Name"
                    subTitle="Lathi, panda street"
                />

                <PresonalInfo
                    title="Relationship"
                    subTitle="Lathi"
                />

                <PresonalInfo
                    title="Phone"
                    subTitle="India"
                />

                <Text style={{ ...commonStyles.fs16_400, color: "#0073FF", marginTop: 20 }}>Document Informations</Text>
                <View style={{ alignItems: "center" }}>
                    <RenderPaySlip
                        title="Intermidiate"
                    />

                    <RenderPaySlip
                        title="Graduation"
                    />

                    <RenderPaySlip
                        title="Post-Graduation"
                    />
                </View>

                <Text style={{ ...commonStyles.fs16_400, color: "#0073FF", marginTop: 20 }}>Bank Informations</Text>
                <PresonalInfo
                    title="A/C Holder"
                    subTitle="Jitendra Kumar"
                />

                <PresonalInfo
                    title="Branch"
                    subTitle="Lathi"
                />

                <PresonalInfo
                    title="Bank"
                    subTitle="ICICI"
                />

                <PresonalInfo
                    title="A/C No."
                    subTitle="005566778811"
                />

                <PresonalInfo
                    title="IFSC Code"
                    subTitle="ICICI453"
                />

                <PresonalInfo
                    title="PAN No."
                    subTitle="B5366F5"
                />

                <PresonalInfo
                    title="PF No."
                    subTitle="1345612345"
                />

                <PresonalInfo
                    title="ESIC No."
                    subTitle="NA"
                />

                <TouchableHighlight style={styles.applyBtn} underlayColor="#0073FF"
                    onPress={() => { }}
                >
                    <Text style={{ ...commonStyles.fs16_400, color: "#fff" }}>Apply Resignation</Text>
                </TouchableHighlight>
            </View>
        </ScrollView>
    )
}

const PresonalInfo = ({ title, subTitle }) => {
    return (
        <View style={{ ...commonStyles.rowStart, marginTop: 4 }}>
            <Text style={{ ...commonStyles.fs15_400, width: 150 }}>{title}</Text>
            <Text style={{ ...commonStyles.fs15_400, color: "rgba(0,104,158,0.9294117647058824 )" }}>: {subTitle}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    applyBtn: {
        width: "100%", height: 60, backgroundColor: "#1C67F6",
        ...commonStyles.centerStyles,
        borderRadius: 50,
        marginTop: 20,
        marginBottom: 10,
    }
})