import React from "react";
import {
  View,
  Image,
  Text,
  Button,
  StyleSheet,
  ImageBackground,
  TouchableOpacity
} from "react-native";

import img from "../../../../assets/images/lion.jpg";

const styles = StyleSheet.create({
  img: {
    flex: 1,
    width: null,
    alignSelf: "stretch"
  }
});
const HomeMovie = props => {
  console.log("home movie props", props);
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => props.navigation.navigate("Details")}
      >
        <Image
          style={styles.img}
          // style={styles.button}
          source={img}
        />
      </TouchableOpacity>
      <Button title="Add to Fav" onPress={() => alert("Added to fav")} />
    </View>
  );
};

export default HomeMovie;
