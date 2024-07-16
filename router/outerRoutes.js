import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/login';
import Signup from '../screens/signup';

const NativeStack = createNativeStackNavigator();

const OuterRouter = () => {
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerShown: false,
      }}>
      <NativeStack.Screen name="Login" component={Login} />
      <NativeStack.Screen name="Signup" component={Signup} />
    </NativeStack.Navigator>
  );
};

export default OuterRouter;
