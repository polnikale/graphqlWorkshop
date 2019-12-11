import React from 'react';
import {Text, View} from 'react-native';
import {useNavigationParam} from 'react-navigation-hooks';

const Mission: React.FunctionComponent = () => {
  const id = useNavigationParam('id');

  return (
    <View style={{flex: 1}}>
      <Text>Mission: {id}</Text>
    </View>
  );
};

export default Mission;
