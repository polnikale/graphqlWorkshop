import { useLazyQuery, useQuery } from '@apollo/react-hooks';
import React, { useCallback, useState } from 'react';
import { useNavigation } from 'react-navigation-hooks';
import { ALL_TWEETS, SEARCH_TWEETS } from '../store/queries/auth';
import {
  Button,
  FlatList,
  ScrollView,
  Text,
  View,
  TextInput,
} from 'react-native';

interface Props {}

const Posts: React.FunctionComponent<Props> = () => {
  const {
    data: commonPostsSearch,
    loading: commonPostsLoading,
    error,
  } = useQuery(ALL_TWEETS);
  const commonPosts = commonPostsSearch && commonPostsSearch.twitter.search;

  const [loadPosts, {called, loading, data}] = useLazyQuery(SEARCH_TWEETS);
  const searchPosts = data && data.twitter.search;

  const {navigate} = useNavigation();
  const [search, setSearch] = useState('');
  const onPressUser = useCallback(
    username => {
      navigate('User', {username});
    },
    [navigate],
  );
  const onPressRetweets = useCallback(
    id => {
      navigate('Retweets', {id});
    },
    [navigate],
  );
  const onSearch = () => {
    loadPosts({variables: {search}});
  };

  return (
    <ScrollView contentContainerStyle={{paddingVertical: 20}}>
      <Text style={{fontSize: 30}}>Posts</Text>
      {commonPostsLoading ? (
        <Text>All posts loading...</Text>
      ) : (
        <FlatList
          data={commonPosts}
          renderItem={({item}) => (
            <SinglePost
              text={item.text}
              id={item.id}
              retweets_count={item.retweet_count}
              username={item.user.name}
              onPressRetweets={onPressRetweets}
              onPressUser={onPressUser}
            />
          )}
        />
      )}
      <TextInput onChangeText={setSearch} placeholder="search posts!" />
      <Button title="Search!!" onPress={onSearch} />
      {called && loading ? (
        <Text>search loading</Text>
      ) : (
        <FlatList
          data={searchPosts}
          renderItem={({item}) => (
            <SinglePost
              text={item.text}
              id={item.id}
              retweets_count={item.retweet_count}
              username={item.user.name}
              onPressRetweets={onPressRetweets}
              onPressUser={onPressUser}
            />
          )}
        />
      )}
    </ScrollView>
  );
};

interface SinglePostProps {
  text: string;
  id: string;
  retweets_count: number;
  username: string;
  onPressUser: (username: string) => void;
  onPressRetweets: (id: string) => void;
}
const SinglePost: React.FunctionComponent<SinglePostProps> = ({
  text,
  id,
  retweets_count,
  username,
  onPressRetweets,
  onPressUser,
}) => {
  const onUsernamePress = useCallback(() => {
    onPressUser(username);
  }, [onPressUser, username]);

  const onRetweetsPress = useCallback(() => {
    onPressRetweets(id);
  }, [onPressRetweets, id]);
  return (
    <View style={{height: 260, width: 200, borderRadius: 5}}>
      <Button title={username} onPress={onUsernamePress} />
      <Text>{text}</Text>
      <Button
        title={`Retweets numbers: ${retweets_count}`}
        onPress={onRetweetsPress}
      />
    </View>
  );
};

export default Posts;
