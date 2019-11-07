import React, { useCallback, useState } from 'react';
import { Button, FlatList, Text, TextInput, View } from 'react-native';
import { useNavigationParam } from 'react-navigation-hooks';
import { USERS_QUERY } from '../store/queries/users';
import {
  useAddUserMutation,
  useUsersQuery,
  UsersQueryResult,
  UsersQuery,
} from '../generated/graphql';

interface Props {}

const User: React.FunctionComponent<Props> = () => {
  const {data, loading} = useUsersQuery();
  const [username, setUsername] = useState('');
  const [addUser] = useAddUserMutation({
    update(cache, {data: newUsersData}) {
      const newUsers =
        (newUsersData &&
          newUsersData.insert_users &&
          newUsersData.insert_users.returning &&
          newUsersData.insert_users.returning) ||
        [];
      const oldUsersData = cache.readQuery<UsersQuery>({
        query: USERS_QUERY,
      });
      const oldUsers = (oldUsersData && oldUsersData.users) || [];
      cache.writeQuery({
        query: USERS_QUERY,
        data: {users: [...oldUsers, ...newUsers]},
      });
    },
  });
  const users = (data && data.users) || [];

  const onPressAddUser = useCallback(() => {
    addUser({variables: {name: username}});
  }, [username, addUser]);
  return (
    <View style={{flex: 1}}>
      <Text>Users!</Text>
      <TextInput placeholder="Add user!" onChangeText={setUsername} />
      <Button onPress={onPressAddUser} title="Add user!" />
      {loading ? (
        <Text>Users loading....</Text>
      ) : (
        <FlatList
          data={users}
          renderItem={({item}) => <Text>{item.name}</Text>}
        />
      )}
    </View>
  );
};

export default User;
