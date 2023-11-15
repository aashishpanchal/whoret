import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

type Props = {};

export default function Signin({}: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <Text>SigninScreen</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 3,
    borderColor: 'red',
  },
});
