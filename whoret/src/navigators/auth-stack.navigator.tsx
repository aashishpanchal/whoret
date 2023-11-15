import React from 'react';
import Signin from '@/screens/auth/signin';
import Signup from '@/screens/auth/signup';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {Navigator} from 'types/navigator';

const Stack = createNativeStackNavigator<Navigator.AuthStackParamsList>();

type Props = {};

export default function AuthStackNavigator({}: Props) {
  return (
    <Stack.Navigator
      initialRouteName="signin"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="signup" component={Signin} />
      <Stack.Screen name="signin" component={Signup} />
    </Stack.Navigator>
  );
}
