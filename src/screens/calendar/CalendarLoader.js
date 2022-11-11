import { ActivityIndicator, Text, View } from "react-native";
import { SIZES } from "../../utils/theme";

export function CalendarLoader({ navbar, navigation }) {
    return (
        <View>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: SIZES.height,
                backgroundColor: '#fff'
            }}>
                <View style={{
                    width: 140, height: 66,
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    padding: 6, marginTop: -100
                }}>
                    <ActivityIndicator size={40} color="#000" />
                    <Text style={{ marginTop: -10, fontFamily: 'STCForward-Regular' }}>Please wait..</Text>
                </View>
            </View>
        </View>
    );
}