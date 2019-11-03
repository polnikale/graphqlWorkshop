import { createAppContainer, NavigationRouteConfigMap } from 'react-navigation';
import Posts from '../screens/Posts';
import Retweets from '../screens/Retweets';
import User from '../screens/User';
import {
  createStackNavigator,
  NavigationStackOptions,
  NavigationStackProp,
} from 'react-navigation-stack';

const routes: NavigationRouteConfigMap<
  NavigationStackOptions,
  NavigationStackProp
> = {
  Posts,
  Retweets,
  User,
};

const AppNavigation = createStackNavigator(routes, {
  initialRouteName: 'Posts',
});

const AppContainer = createAppContainer(AppNavigation);

export default AppContainer;
