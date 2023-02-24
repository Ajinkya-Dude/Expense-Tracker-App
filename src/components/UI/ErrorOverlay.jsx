import { View, ActivityIndicator, Text } from "react-native";
import Button from "./Button";
import Styles from "./ErrorOverlayStyle";

function ErrorOverlay({message, onConfirm}){
    return (
        <View style={Styles.container}>
            <Text style={[Styles.text,Styles.title]}>An error occurred!</Text>
            <Text style={Styles.text}>{message}</Text>
            <Button onPress={onConfirm}>Ok</Button>
        </View>
    )
}
export default ErrorOverlay;