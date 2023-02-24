import { View, ActivityIndicator } from "react-native";
import Styles from "./LoadingOverlayStyle";

function LoadingOverlay(){
    return (
        <View style={Styles.container}>
            <ActivityIndicator size='large' color='white' />
        </View>
    )
}
export default LoadingOverlay;