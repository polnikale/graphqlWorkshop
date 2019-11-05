import React from 'react';
import { Text, View } from 'react-native';
import { useNavigationParam } from 'react-navigation-hooks';

interface Props {}

const Mission: React.FunctionComponent<Props> = () => {
  const tweetId = useNavigationParam('id');

  return (
    <View style={{flex: 1}}>
      <Text>Mission: {tweetId}</Text>
    </View>
  );
};

export default Mission;
