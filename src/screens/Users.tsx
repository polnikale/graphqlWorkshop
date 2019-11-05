import React from 'react';
import { Text, View } from 'react-native';
import { useNavigationParam } from 'react-navigation-hooks';

interface Props {}

const User: React.FunctionComponent<Props> = () => {
  return (
    <View style={{flex: 1}}>
      <Text>Users!</Text>
    </View>
  );
};

export default User;
