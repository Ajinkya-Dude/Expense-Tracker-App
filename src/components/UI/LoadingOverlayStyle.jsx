import { StyleSheet } from "react-native";
import { GlobalStyles } from "../../constant/Style";

const Styles=StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700
    }
})

export default Styles;