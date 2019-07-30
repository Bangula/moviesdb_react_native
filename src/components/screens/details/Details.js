import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  SafeAreaView
} from "react-native";
import axios from "axios";
import Actor from "./components/Actor";
import DetailsHeader from "./components/DetailsHeader";

const Details = ({ navigation }) => {
  const [movieDetails, setMovieDetails] = useState({});
  const [actors, setActors] = useState([]);

  useEffect(() => {
    let id = navigation.getParam("id");
    getMovieDetails(id);
    getActors(id);
  }, []);

  async function getMovieDetails(movieId) {
    try {
      const details = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=fc22f3679adfcc3e819328e339157dfa`
      );

      console.log("movie details", details);

      setMovieDetails(details.data);
    } catch (error) {
      alert(error);
    }
  }

  async function getActors(movieId) {
    try {
      const cast = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=975095b34dd7c4ff9937603d683d6501&language=en-US`
      );

      setActors(cast.data.cast);
      console.log("movie cast", cast);
    } catch (err) {
      console.log(err.response);
    }
  }

  const styles = StyleSheet.create({
    actorsList: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      flexWrap: "wrap",
      marginTop: 20
    },
    actorWrap: {
      margin: 2,
      padding: 2
      // height: Dimensions.get("window").height / 2,
      // width: Dimensions.get("window").width - 4
    }
  });
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <DetailsHeader movie={movieDetails} />
        </View>
        <View style={styles.actorsList}>
          {actors.length ? (
            actors.map(item => (
              <View style={styles.actorWrap} key={item.id}>
                <Actor actor={item} />
              </View>
            ))
          ) : (
            <ActivityIndicator size="large" color="#35D875" />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Details;
