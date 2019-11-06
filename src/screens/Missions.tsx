import { useQuery } from '@apollo/react-hooks';
import React, { useCallback } from 'react';
import { useNavigation } from 'react-navigation-hooks';
import { ALL_SEARCH } from '../store/queries/missions';
import {
  Button,
  Linking,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';

interface Props {}

interface SearchQuery {
  missions: [
    {
      id: string;
      text: string;
      name: string;
      description: string;
      website: string;
      twitter: string;
    },
  ];
}

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
  const {data, loading: allSearchLoading, error} = useQuery<SearchQuery>(
    ALL_SEARCH,
  );
  const missions = (data && data.missions) || [];
  debugger;

  return (
    <View>
      <Text style={{fontSize: 30}}>Missions</Text>
      {allSearchLoading ? (
        <Text>All search loading...</Text>
      ) : (
        <FlatList
          data={missions}
          renderItem={({item}) => (
            <SingleMission {...item} onPressMission={onPressMission} />
          )}
        />
      )}
      <Button onPress={onPressUser} title="user" />
      <Button onPress={onPressMission} title="mission" />
    </View>
  );
};

interface SinglePostProps {
  name: string;
  description: string;
  website: string;
  twitter: string;
  id: string;
  onPressMission: (id: string) => void;
}
const SingleMission: React.FunctionComponent<SinglePostProps> = ({
  name,
  description,
  website = '',
  twitter = '',
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
      <Text>{description.substring(0, 200)}</Text>
      <Button onPress={() => Linking.openURL(website)} title={website} />
      {twitter && (
        <Button onPress={() => Linking.openURL(twitter)} title={twitter} />
      )}
    </TouchableOpacity>
  );
};

export default Missions;
