import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
const Favorites = ({ navigation }) => {
  const [keys, setKeys] = React.useState([]);

  const getAllKeys = async () => {
    try {
      let key = await AsyncStorage.getAllKeys();
      setKeys(key);
    } catch (e) {
      // read key error
    }
  };
  console.log(keys);
  React.useEffect(() => {}, []);
  return (
    <View>
      <Button onPress={getAllKeys} title="Get All keys" />
      <Text>Favorite Page</Text>
    </View>
  );
};

export default Favorites;
