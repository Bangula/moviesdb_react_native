import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  ScrollView
} from "react-native";
import { getPoster } from "../../home/common/getMoviePoster";
import Icon from "react-native-vector-icons/FontAwesome";

const styles = StyleSheet.create({
  container: { backgroundColor: "black", paddingBottom: 10 },
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
  const [ratingStars, setRatingStars] = useState();

  useEffect(() => {
    if (Object.keys(movie).length) {
      setBgImage(getPoster(movie.poster_path));
      let rating = Math.round(movie.vote_average);
      setRatingStars(rating);
    }
  }, [movie]);

  let hours, minutes, runtime, budget, revenue;
  if (Object.keys(movie).length) {
    hours = Math.floor(movie.runtime / 60);
    minutes = movie.runtime % 60;
    runtime = `${hours}h ${minutes}m`;

    budget = movie.budget;
    budget = budget.toLocaleString("en");

    revenue = movie.revenue;
    revenue = revenue.toLocaleString("en");
  }

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
          <View style={{ width: "60%", height: 350 }}>
            {bgImage ? (
              <Image
                source={{ uri: bgImage }}
                resizeMode="stretch"
                style={{ width: "100%", height: "100%" }}
              />
            ) : (
              <ActivityIndicator size="small" color="#00ff00" />
            )}
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
        <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
          <Text style={[styles.headerText, { fontWeight: "bold" }]}>
            RATING {ratingStars}/10
          </Text>
          <View
            style={{
              paddingHorizontal: 10,
              marginBottom: 30,
              flexDirection: "row"
            }}
          >
            {/* {Object.keys(movie).length
              ? movie.genres.map(item => {
                  return (
                    <View
                      key={item.id}
                      style={{ marginRight: 5, marginTop: 10 }}
                    >
                      <Icon name="star" size={20} color="red" />
                    </View>
                  );
                })
              : null} */}
            {[...Array(ratingStars)].map((x, i) => (
              <View key={i} style={{ marginRight: 5, marginTop: 10 }}>
                <Icon name="star" size={20} color="#35D875" />
              </View>
            ))}
          </View>
        </View>

        <ScrollView
          style={{
            width: "100%",
            paddingTop: 20,
            paddingBottom: 20,
            paddingLeft: 10,
            paddingRight: 10,
            backgroundColor: "rgba(255,255,255,0.3)"
          }}
          horizontal={true}
          centerContent={true}
        >
          <View style={{ width: Dimensions.get("window").width * 0.5 }}>
            <Text style={[styles.headerText]}>Running time: {runtime}</Text>
          </View>
          <View style={{ width: Dimensions.get("window").width * 0.5 }}>
            <Text style={[styles.headerText]}>Budget: {budget}</Text>
          </View>
          <View style={{ width: Dimensions.get("window").width * 0.5 }}>
            <Text style={[styles.headerText]}>Revenue: {revenue}</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default DetailsHeader;
