import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  Dimensions
} from "react-native";
import { getPoster } from "../../home/common/getMoviePoster";

const styles = StyleSheet.create({
  container: { backgroundColor: "black", paddingBottom: 30 },
  ImageContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.8
  },
  imagePlace: {
    width: "100%",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center"
  },
  headerText: {
    color: "rgba(255,255,255,0.8)"
  }
});

const DetailsHeader = ({ movie }) => {
  const [bgImage, setBgImage] = useState("");
  useEffect(() => {
    if (Object.keys(movie).length) {
      setBgImage(getPoster(movie.poster_path));
    }
  }, [movie]);

  return (
    <View style={[styles.container]}>
      <View style={{ paddingVertical: 10 }}>
        <Text
          style={[
            styles.headerText,
            {
              textAlign: "center",
              fontSize: 18,
              fontStyle: "italic",
              color: "#fff"
            }
          ]}
        >
          {movie.tagline ? `"${movie.tagline}"` : null}
        </Text>
      </View>
      <View style={[styles.imageContainer]}>
        <View style={[styles.imagePlace]}>
          <View style={{ width: "50%", height: 350 }}>
            <Image
              source={{ uri: bgImage }}
              style={{ width: "100%", height: "100%" }}
            />
          </View>
        </View>
      </View>
      <View>
        <View style={{ marginTop: 30 }}>
          <Text
            style={[
              styles.headerText,
              { textAlign: "center", fontSize: 22, fontWeight: "bold" }
            ]}
          >
            {movie.title}
          </Text>
        </View>
        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <Text
            style={[styles.headerText, { textAlign: "center", fontSize: 14 }]}
          >
            {movie.overview}
          </Text>
        </View>
        <View style={{ paddingHorizontal: 20, marginTop: 30 }}>
          <Text style={[styles.headerText, { fontWeight: "bold" }]}>
            GENRES
          </Text>
          <View
            style={{
              paddingHorizontal: 10,
              marginBottom: 30,
              flexDirection: "row"
            }}
          >
            {Object.keys(movie).length
              ? movie.genres.map(item => {
                  return (
                    <View
                      key={item.id}
                      style={{ marginRight: 20, marginTop: 10 }}
                    >
                      <Text
                        style={[styles.headerText, { fontStyle: "italic" }]}
                      >
                        {item.name}
                      </Text>
                    </View>
                  );
                })
              : null}
          </View>
        </View>
        <View style={{ paddingHorizontal: 20, marginTop: 30 }}>
          <Text style={[styles.headerText, { fontWeight: "bold" }]}>
            RATING
          </Text>
          <View
            style={{
              paddingHorizontal: 10,
              marginBottom: 30,
              flexDirection: "row"
            }}
          >
            {Object.keys(movie).length
              ? movie.genres.map(item => {
                  return (
                    <View
                      key={item.id}
                      style={{ marginRight: 20, marginTop: 10 }}
                    >
                      <Text
                        style={[styles.headerText, { fontStyle: "italic" }]}
                      >
                        {item.name}
                      </Text>
                    </View>
                  );
                })
              : null}
          </View>
        </View>
      </View>
    </View>
  );
};

export default DetailsHeader;
