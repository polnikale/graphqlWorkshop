import React from 'react';
import { Text, View } from 'react-native';
import { useNavigationParam } from 'react-navigation-hooks';

interface Props {}

const User: React.FunctionComponent<Props> = () => {
  const username = useNavigationParam<string>('username');

  return (
    <View style={{flex: 1}}>
      <Text>username: {username}</Text>
    </View>
  );
};

export default User;
