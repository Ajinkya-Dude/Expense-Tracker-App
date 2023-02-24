import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ManageExpense from './src/screens/ManageExpenses';
import RecentExpenses from './src/screens/RecentExpenses';
import AllExpenses from './src/screens/AllExpenses';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GlobalStyles } from './src/constant/Style';
import IconButton from './src/components/UI/IconButton';
import ExpensesContextProvider from './src/store/expenses-context';
import Icon from "react-native-vector-icons/Ionicons";


//const Stack = createStackNavigator();
const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();


function ExpensesOverView() {
  return (
    
    <BottomTabs.Navigator screenOptions={({ navigation })=>({
      headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
      headerTintColor: "white",
      tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
      tabBarActiveTintColor: GlobalStyles.colors.accent500,
      headerRight: ({tintColor}) => <IconButton icon="add" size={24} color={tintColor} onPress={()=>{navigation.navigate('ManageExpense')}} />
    })}>
      <BottomTabs.Screen name="RecentExpenses" component={RecentExpenses} options={{
        title: 'Recent Expenses',
        tabBarLabel: "Recent",
        tabBarIcon: ({color,size})=>(<Icon name="hourglass" color={color} size={size}  />)
      }} />
      <BottomTabs.Screen name='AllExpenses' component={AllExpenses} options={{
        title: 'All Expenses',
        tabBarLabel: "All Expenses",
        tabBarIcon: ({color,size})=>(<Icon name="calendar" color={color} size={size}  />)
      }} />
    </BottomTabs.Navigator>
  )
}


const App = () => {

  return (
    <>
    <ExpensesContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='ExpensesOverview' component={ExpensesOverView} options={{ headerShown: false }} />
          <Stack.Screen name='ManageExpense' component={ManageExpense} options={{
            presentation: 'modal'
          }} />
        </Stack.Navigator>
      </NavigationContainer>
      </ExpensesContextProvider>  
    </>
  );
}

export default App;
