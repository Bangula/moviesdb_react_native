import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import axios from "axios";

const Details = ({ navigation }) => {
  const [movieDetails, setMovieDetails] = useState({});
  useEffect(() => {
    let id = navigation.getParam("id");
    getMovieDetails(id);
  }, []);

  async function getMovieDetails(movieId) {
    try {
      const resp = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=fc22f3679adfcc3e819328e339157dfa`
      );
      console.log(resp);
      setMovieDetails(resp.data);
    } catch (error) {
      alert(error);
    }
  }
  return (
    <View>
      <Text>Details Page</Text>
      {/* <ActivityIndicator size="large" color="#0000ff" /> */}
    </View>
  );
};

export default Details;
