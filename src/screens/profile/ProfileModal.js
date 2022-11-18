import React from "react";
import { Modal, StyleSheet, Text, View, TouchableHighlight, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { commonStyles } from "../../utils/styles";
import { SIZES } from "../../utils/theme";

const ProfileModal = ({ modalVisible, callback }) => {

    return (
        <View style={{ alignItems: "flex-start" }}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    callback();
                }}
            >
                <TouchableHighlight style={styles.centeredView} onPress={() => { callback() }} underlayColor="transparent">
                    <TouchableOpacity style={styles.modalView} activeOpacity={1}>
                        <SubmitFeedbackbtn
                            btnText="My Profile"
                            onPress={() => { }}
                        />

                        <SubmitFeedbackbtn
                            btnText="Change Password"
                            onPress={() => { }}
                        />

                        <SubmitFeedbackbtn
                            btnText="Log Out"
                            onPress={() => { }}
                        />
                    </TouchableOpacity>
                </TouchableHighlight>
            </Modal>
        </View>
    );
};

function SubmitFeedbackbtn({ btnText, onPress }) {
    return (
        <View style={{ padding: 1, backgroundColor: "#fff", width: "100%" }}>
            <TouchableHighlight style={[styles.btnWrapper]} onPress={onPress} underlayColor="E27127">
                <Text style={{ ...commonStyles.fs16_500, color: "#000" }}>{btnText}</Text>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        justifyContent: "flex-start",
        alignItems: "flex-end",
        backgroundColor: 'rgba(0,0,0,0.1)',
        width: SIZES.width,
        height: SIZES.height,
    },
    modalView: {
        backgroundColor: "white",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: SIZES.width / 1.6,
        marginTop: 48,
        marginRight: 20
    },
    button: {
        padding: 20,
        width: SIZES.width / 1.6,
        backgroundColor: "#eee",
        alignItems: "center"
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    textStyle: {
        color: "#000",
        fontWeight: "bold",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    reportInput: {
        width: SIZES.width / 1.8,
        height: 48, borderWidth: 1,
        borderColor: "#999",
        borderRadius: 6,
        marginBottom: 6,
        color: "#000",
        paddingHorizontal: 12,
    },
    btnWrapper: {
        width: "100%",
        height: 48,
        ...commonStyles.centerStyles,
        backgroundColor: "#f7f8f9",
        width: "100%",
        alignItems: "flex-start",
        paddingLeft: 20
    }
});

export default ProfileModal;