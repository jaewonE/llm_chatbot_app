import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ViewRouter from './views';
import TabRouter from './tabs';

const NativeStack = createNativeStackNavigator();

const InnerRoutes = () => {
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <NativeStack.Screen name="TabRouter" component={TabRouter} />
      <NativeStack.Screen name="ViewRouter" component={ViewRouter} />
    </NativeStack.Navigator>
  );
};

export default InnerRoutes;
