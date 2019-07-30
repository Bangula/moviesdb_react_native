import React, { useState, useEffect } from "react";
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
import { getPoster } from "../common/getMoviePoster";
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
  const [isDisabled, setIsDisabled] = useState(false);

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

  const storeData = async id => {
    try {
      await AsyncStorage.setItem(`@${id}`, JSON.stringify(props.movie));
    } catch (e) {
      // saving error
    }
  };

  React.useEffect(() => {
    getMePoster();

    // props.doesKeyExists ? setIsDisabled(props.doesKeyExists) : null;
  }, []);

  React.useEffect(() => {
    if (props.keys.length) {
      let data = props.keys.includes(`@${props.movie.id}`);
      setIsDisabled(data);
    }
  }, [props.keys]);

  return (
    <View style={{ flex: 1 }}>
      {img ? (
        <>
          <TouchableOpacity
            style={{ flex: 1 }}
            activeOpacity={0.9}
            onPress={() =>
              props.navigation.navigate("Details", { id: props.movie.id })
            }
          >
            <Image style={styles.img} source={{ uri: img }} />
          </TouchableOpacity>
          <Button
            disabled={isDisabled}
            title={isDisabled ? "Your favorite" : "Add to Favorites"}
            onPress={() => {
              setIsDisabled(true);
              storeData(props.movie.id);
            }}
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
