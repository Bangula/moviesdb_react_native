import React from "react";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import { View, Text, Image } from "react-native";

// Components
import Home from "../screens/home/Home";
import Details from "../screens/details/Details";
import Favorite from "../screens/favorite/Favorite";

const MainStack = createStackNavigator(
  {
    Home: {
      screen: Home
    },
    Details: {
      screen: Details
    }
  },
  {
    defaultNavigationOptions: {
      headerTitle: "movies"
    }
  }
);
const FavoriteStack = createStackNavigator({
  Favorite
});
const TabNavigation = createBottomTabNavigator({
  Home: MainStack,
  Favorite: FavoriteStack
});

export default TabNavigation;
