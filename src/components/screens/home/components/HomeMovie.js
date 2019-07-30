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
import AsyncStorage from "@react-native-community/async-storage";
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

  const getMePoster = async () => {
    try {
      let image = await getPoster(props.movie.poster_path);
      if (image) {
        setImg(image);
      }
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    getMePoster();
  }, []);

  const storeData = async id => {
    try {
      await AsyncStorage.setItem(`@${id}`, JSON.stringify(props.movie));
    } catch (e) {
      // saving error
    }
  };

  console.log("home movie props", props);
  return (
    <View style={{ flex: 1 }}>
      {img ? (
        <>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() =>
              props.navigation.navigate("Details", { id: props.movie.id })
            }
          >
            <Image style={styles.img} source={{ uri: img }} />
          </TouchableOpacity>
          <Button
            title="Add to Favourites"
            onPress={() => storeData(props.movie.id)}
            color="#35D875"
          />
        </>
      ) : (
        <ActivityIndicator size="large" color="#35D875" />
      )}
    </View>
  );
};

export default HomeMovie;
