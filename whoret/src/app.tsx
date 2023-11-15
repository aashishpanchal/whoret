import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Appearance, StatusBar, StyleSheet, View} from 'react-native';
import AuthStackNavigator from '@/navigators/auth-stack.navigator';

type Props = {};

export default function App({}: Props) {
  React.useEffect(() => {
    Appearance.setColorScheme('light');
  }, []);

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <AuthStackNavigator />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
