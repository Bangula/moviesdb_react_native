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
import getPoster from "../common/getMoviePoster";
import lion from "../../../../assets/images/lion.jpg";

const styles = StyleSheet.create({
  img: {
    flex: 1,
    width: null,
    alignSelf: "stretch"
  }
});
const HomeMovie = props => {
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
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => props.navigation.navigate("Details")}
      >
        <Image style={styles.img} source={{ uri: img }} />
      </TouchableOpacity>
      <Button title="Add to Fav" onPress={() => alert("Added to fav")} />
    </View>
  );
};

export default HomeMovie;
