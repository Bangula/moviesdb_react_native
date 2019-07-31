import React from "react";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  Dimensions
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
const FavoriteMovie = props => {
  const styles = StyleSheet.create({
    container: {
      width: Dimensions.get("window").width,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      paddingTop: 10,
      marginTop: 2,
      paddingBottom: 10,
      paddingLeft: 3,
      paddingRight: 3,
      backgroundColor: "#1d1d1d"
    },
    title: { color: "white" }
  });
  const removeValue = async id => {
    try {
      await AsyncStorage.removeItem(`@${id}`);
      props.getAllKeys();
    } catch (e) {
      // remove error
    }
  };

  console.log("favorite movie props", props.movie);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.movie.title}</Text>
      <Button
        title="Remove"
        color="#ff0066"
        onPress={() => removeValue(props.movie.id)}
      />
    </View>
  );
};

export default FavoriteMovie;
