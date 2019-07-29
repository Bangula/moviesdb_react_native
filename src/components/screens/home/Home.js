import React from "react";
import {
  View,
  ScrollView,
  Text,
  Button,
  StyleSheet,
  SafeAreaView
} from "react-native";

const Home = ({ navigation }) => {
  return (
    <SafeAreaView>
      <ScrollView>
        <Text>Home Page</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
// const styles = StyleSheet.create({
//   container: {
//     borderRadius: 4,
//     borderWidth: 0.5,
//     borderColor: '#d6d7da',
//   },
//   title: {
//     fontSize: 19,
//     fontWeight: 'bold',
//   },
//   activeTitle: {
//     color: 'red',
//   },
// });
