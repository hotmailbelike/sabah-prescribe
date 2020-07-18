import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  HeaderBackButton,
  headerLeft,
} from '@react-navigation/stack';import PrescriptionList from './PrescriptionList';
import Prescription from './Prescription';
import Medicine from './Medicine';
import MedicineList from './MedicineList';
const Stack = createStackNavigator();

function App({route, navigation}) {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Prescription List" component={PrescriptionList} />
        <Stack.Screen
          name="Prescription"
          component={Prescription}
          
        />

        <Stack.Screen name="Medicine List" component={MedicineList} />
        <Stack.Screen name="Medicine" component={Medicine} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
