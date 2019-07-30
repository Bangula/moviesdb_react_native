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
    flexDirection: "row",
    alignItems: "center"
  },
  logoContainer: {
    alignSelf: "center",
    justifyContent: "center",
    marginRight: 10
  }
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
          <View style={{ marginLeft: 10 }}>
            <Image source={logo1} style={{ width: 80 }} resizeMode="contain" />
          </View>
          <View style={[styles.logoContainer]}>
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
const FavoriteStack = createStackNavigator(
  {
    Favorite
  },
  {
    defaultNavigationOptions: {
      headerTitle: (
        <View style={styles.headerContainer}>
          <View style={{ marginLeft: 10 }}>
            <Image source={logo1} style={{ width: 0 }} resizeMode="contain" />
          </View>
          <View style={[styles.logoContainer]}>
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
const TabNavigation = createBottomTabNavigator(
  {
    Home: MainStack,
    Favorite: FavoriteStack
  },
  {
    tabBarOptions: {
      activeTintColor: "#fff",
      showIcon: true,
      tabBarIcon: ({ tintColor }) => (
        <View>
          <Text style={{ color: "#fff" }}>H</Text>
        </View>
      ),
      labelStyle: {
        fontSize: 12
      },
      style: {
        backgroundColor: "#1d1d1d"
      }
    }
  }
);

export default TabNavigation;
