import React from 'react';
import { Text, View } from 'react-native';
import { useNavigationParam } from 'react-navigation-hooks';

interface Props {}

const Retweets: React.FunctionComponent<Props> = () => {
  const tweetId = useNavigationParam('id');

  return (
    <View style={{flex: 1}}>
      <Text>Retweets: {tweetId}</Text>
    </View>
  );
};

export default Retweets;
