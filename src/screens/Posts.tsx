import React, { useCallback } from 'react';
import { Button, Text, View } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';

interface Props {}

const Posts: React.FunctionComponent<Props> = () => {
  const {navigate} = useNavigation();
  const onPressUser = useCallback(
    (username = '123') => {
      navigate('User', {username: 'name12'});
    },
    [navigate],
  );
  const onPressRetweets = useCallback(
    (id = '123') => {
      navigate('Retweets', {id: '12'});
    },
    [navigate],
  );

  return (
    <View>
      <Text style={{fontSize: 30}}>Posts</Text>
      <Button onPress={onPressUser} title="user" />
      <Button onPress={onPressRetweets} title="retw" />
    </View>
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
    <View style={{height: 50, width: 200, borderRadius: 5}}>
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
