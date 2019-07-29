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

const HomeMovie = () => {
  return (
    <TouchableOpacity
      style={{ flex: 1 }}
      //onPress={this._onPressButton}
    >
      <Image
        style={{ width: "100%", height: "100%" }}
        // style={styles.button}
        source={img}
      />
    </TouchableOpacity>
  );
};

export default HomeMovie;
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
