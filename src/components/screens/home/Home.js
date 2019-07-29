import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import HomeMovie from "./components/HomeMovie";

const Home = ({ navigation }) => {
  return (
    <View>
      <Text>Home Page</Text>
      <HomeMovie />
      <HomeMovie />
      <HomeMovie />
      <HomeMovie />
    </View>
  );
};

export default Home;
