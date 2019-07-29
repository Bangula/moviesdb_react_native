import React from "react";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import { View, Text, Image, StyleSheet } from "react-native";

// Components
import Home from "../screens/home/Home";
import Details from "../screens/details/Details";
import Favorite from "../screens/favorite/Favorite";

import logo1 from "../../assets/images/logo.png";
import logo2 from "../../assets/images/imdb.png";

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    justifyContent: "space-between",
    borderBottomColor: "rgba(255,255,255,0.6)",
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  imgContainer:
});

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
      headerTitle: (
        <View style={styles.headerContainer}>
          <View
            style={{
              alignSelf: "center",
              justifyContent: "center",
              marginRight: 20
            }}
          >
            <Image source={logo1} style={{ width: 80 }} resizeMode="contain" />
          </View>
          <View
            style={{
              alignSelf: "center",
              justifyContent: "center",
              marginRight: 20
            }}
          >
            <Image source={logo2} style={{ width: 80 }} resizeMode="contain" />
          </View>
        </View>
      ),
      headerStyle: {
        backgroundColor: "#1d1d1d"
      },
      headerTintColor: "#fff"
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
