import { useLazyQuery, useQuery } from '@apollo/react-hooks';
import React, { useCallback, useState } from 'react';
import { useNavigation } from 'react-navigation-hooks';
import { ALL_SEARCH, VALUE_SEARCH } from '../store/queries/missions';
import {
  Button,
  Linking,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ScrollView,
  TextInput,
} from 'react-native';
import {
  useAllSearchLazyQuery,
  useAllSearchQuery,
  useValueSearchLazyQuery,
} from '../generated/graphql';

interface Props {}

const Missions: React.FunctionComponent<Props> = () => {
  const {navigate} = useNavigation();
  const {data, loading: allSearchLoading} = useAllSearchQuery();
  const [
    searchMissions,
    {data: searchData, loading: searchLoading, called},
  ] = useValueSearchLazyQuery();
  const [mission, setMission] = useState('');
  const onPressUser = useCallback(() => {
    navigate('Users');
  }, []);
  const onPressMission = useCallback(
    id => {
      navigate('Mission', {id});
    },
    [navigate],
  );
  const onPressSearch = useCallback(() => {
    searchMissions({
      variables: {
        name: mission,
      },
    });
  }, [searchMissions, mission]);
  const missions = (data && data.missions) || [];
  const searchMissionsData = (searchData && searchData.missions) || [];

  return (
    <ScrollView>
      <Text style={{fontSize: 30}}>Missions</Text>
      <TextInput
        value={mission}
        onChangeText={setMission}
        placeholder="Write down a mission!"
      />
      <Button title="Search" onPress={onPressSearch} />
      {!called ? (
        <Text>Not called</Text>
      ) : searchLoading ? (
        <Text>search loading...</Text>
      ) : (
        <>
          <Text>Searched!!</Text>
          <FlatList
            data={searchMissionsData}
            renderItem={({item}) => (
              <SingleMission {...item} onPressMission={onPressMission} />
            )}
          />
        </>
      )}
      {allSearchLoading ? (
        <Text>All search loading...</Text>
      ) : (
        <>
          <Text>Not search!</Text>
          <FlatList
            data={missions}
            renderItem={({item}) => (
              <SingleMission {...item} onPressMission={onPressMission} />
            )}
          />
        </>
      )}
      <Button onPress={onPressUser} title="user" />
      <Button onPress={onPressMission} title="mission" />
    </ScrollView>
  );
};

interface SinglePostProps {
  name?: string | null;
  description?: string | null;
  website?: string | null;
  twitter?: string | null;
  id?: string | null;
  onPressMission: (id: string) => void;
}
const SingleMission: React.FunctionComponent<SinglePostProps> = ({
  name = '',
  description = '',
  website = '',
  twitter = '',
  id = '',
  onPressMission,
}) => {
  const onMissionPress = useCallback(() => {
    onPressMission(id || '');
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
      {description && <Text>{description.substring(0, 200)}</Text>}
      {website && (
        <Button onPress={() => Linking.openURL(website)} title={website} />
      )}
      {twitter && (
        <Button onPress={() => Linking.openURL(twitter)} title={twitter} />
      )}
    </TouchableOpacity>
  );
};

export default Missions;
