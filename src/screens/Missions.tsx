import React, { useCallback } from 'react';
import { Button, Linking, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';

interface Props {}

const Missions: React.FunctionComponent<Props> = () => {
  const {navigate} = useNavigation();
  const onPressUser = useCallback(() => {
    navigate('Users');
  }, []);
  const onPressMission = useCallback(
    id => {
      navigate('Mission', {id: '12'});
    },
    [navigate],
  );

  return (
    <View>
      <Text style={{fontSize: 30}}>Missions</Text>
      <Button onPress={onPressUser} title="user" />
      <Button onPress={onPressMission} title="mission" />
    </View>
  );
};

interface SingleMissionProps {
  name: string;
  description: string;
  website: string;
  twitter: string;
  id: string;
  onPressMission: (id: string) => void;
}
const SingleMission: React.FunctionComponent<SingleMissionProps> = ({
  name,
  description,
  website,
  twitter,
  id,
  onPressMission,
}) => {
  const onMissionPress = useCallback(() => {
    onPressMission(id);
  }, [onPressMission, id]);
  return (
    <TouchableOpacity
      onPress={onMissionPress}
      style={{
        height: 300,
        width: 300,
        margin: 20,
        borderRadius: 5,
        backgroundColor: 'lightgrey',
      }}>
      <Text>{name}</Text>
      <Text>{description}</Text>
      <Button onPress={() => Linking.openURL(website)} title={website} />
      {twitter && (
        <Button onPress={() => Linking.openURL(twitter)} title={twitter} />
      )}
    </TouchableOpacity>
  );
};

export default Missions;
