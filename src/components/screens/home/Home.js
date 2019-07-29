import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  View,
  ScrollView,
  Text,
  Button,
  StyleSheet,
  ImageBackground,
  SafeAreaView
} from "react-native";
import getPosterUrl from "./common/getMoviePoster";

const apiKey = "fc22f3679adfcc3e819328e339157dfa";

const Home = ({ navigation }) => {
  const [allMovies, setAllMovies] = useState([]);
  const [mainBackgroundUrl, setMainBackgroundUrl] = useState("");

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const movies = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc`
      );
      console.log(movies);
      const mainBg = getPosterUrl(movies.data.results[0].poster_path);
      setMainBackgroundUrl(mainBg);
      console.log(mainBg);
      setAllMovies(movies.data.results);
    } catch (error) {
      alert(error);
    }
  }

  return <SafeAreaView />;
};

export default Home;
