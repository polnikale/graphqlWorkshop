import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { useNavigationParam } from 'react-navigation-hooks';
import { useSingleMissionQuery } from '../generated/graphql';

interface Props {}

const Mission: React.FunctionComponent<Props> = () => {
  const id = useNavigationParam('id');
  const {data, loading} = useSingleMissionQuery({variables: {id}});
  const mission = data && data.mission;
  debugger;
  return (
    <View style={{flex: 1}}>
      <Text>Missionn: {id}</Text>
      {loading ? (
        <Text>Loading..</Text>
      ) : (
        <>
          <Text>{mission && mission.name}</Text>
          {mission && mission.isFavorite && <Text>Favorite!</Text>}
          <FlatList
            data={mission ? mission.payloads.filter(payload => !!payload) : []}
            key={2}
            renderItem={({item}) => <Text>{item && item.nationality}</Text>}
          />
        </>
      )}
    </View>
  );
};

export default Mission;
