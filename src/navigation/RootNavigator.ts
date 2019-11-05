import { createAppContainer, NavigationRouteConfigMap } from 'react-navigation';
import Mission from '../screens/Mission';
import Missions from '../screens/Missions';
import Users from '../screens/Users';
import {
  createStackNavigator,
  NavigationStackOptions,
  NavigationStackProp,
} from 'react-navigation-stack';

const routes: NavigationRouteConfigMap<
  NavigationStackOptions,
  NavigationStackProp
> = {
  Missions,
  Mission,
  Users,
};

const AppNavigation = createStackNavigator(routes, {
  initialRouteName: 'Missions',
});

const AppContainer = createAppContainer(AppNavigation);

export default AppContainer;
