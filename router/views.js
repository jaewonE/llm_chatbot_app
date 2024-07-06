//Views.js
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Chat from '../screens/chat';

const NativeStack = createNativeStackNavigator();

const ViewRouter = () => (
  <NativeStack.Navigator>
    <NativeStack.Screen name="Chat" component={Chat} />
  </NativeStack.Navigator>
);

export default ViewRouter;
