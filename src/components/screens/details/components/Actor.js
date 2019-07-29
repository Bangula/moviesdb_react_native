import React from "react";
import {
  View,
  Image,
  Text,
  Button,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import getPoster from "../common/getMoviePoster";
import lion from "../../../../assets/images/lion.jpg";

const styles = StyleSheet.create({
  img: {
    flex: 1,
    width: null,
    alignSelf: "stretch"
  }
});
const Actor = props => {
  const [img, setImg] = React.useState("");
  React.useEffect(async () => {
    try {
      let image = await getPoster(props.movie.poster_path);
      if (image) {
        setImg(image);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);
  console.log("home movie props", props);
  return (
    <View style={{ flex: 1 }}>
      <>
        <View style={{ flex: 1 }}>
          {/* <Image style={styles.img} source={{ uri: img }} /> */}
        </View>
      </>

      {/* <ActivityIndicator size="large" color="#0000ff" /> */}
    </View>
  );
};

export default Actor;
