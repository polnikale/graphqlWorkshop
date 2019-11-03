import React from 'react';
import { View } from 'react-native';
import RootNavigator from './navigation/RootNavigator';

interface Props {}

const Root: React.FunctionComponent<Props> = () => {
  return (
    <View style={{flex: 1}}>
      <RootNavigator />
    </View>
  );
};

export default Root;
