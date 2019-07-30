import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  View,
  ScrollView,
  Text,
  Button,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  Dimensions,
  FlatList,
  Dimension,
  TextInput,
  ActivityIndicator
} from "react-native";

import HomeMovie from "./components/HomeMovie";
import { getPoster } from "./common/getMoviePoster";

// Components
import BigHeader from "./components/BigHeader";
import AsyncStorage from "@react-native-community/async-storage";
const apiKey = "fc22f3679adfcc3e819328e339157dfa";

const Home = ({ navigation }) => {
  const [allMovies, setAllMovies] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [mainBackgroundUrl, setMainBackgroundUrl] = useState("");
  const [keys, setKeys] = React.useState([]);

  async function getData() {
    try {
      const movies = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc`
      );
      console.log(movies);
      const mainBg = getPoster(movies.data.results[0].poster_path);
      setMainBackgroundUrl(mainBg);
      console.log(mainBg);
      setAllMovies(movies.data.results);
    } catch (error) {}
  }

  const getAllKeys = async () => {
    try {
      let key = await AsyncStorage.getAllKeys();
      setKeys(key);
    } catch (e) {
      // read key error
    }
  };

  const styles = StyleSheet.create({
    moviesList: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      flexWrap: "wrap",
      paddingTop: 10,
      backgroundColor: "black"
    },
    imgWrap: {
      margin: 2,
      padding: 2,
      height: Dimensions.get("window").height / 2,
      width: Dimensions.get("window").width / 2 - 4
    },
    indicator: {
      // marginTop: 10,
      paddingBottom: 20
    }
  });

  useEffect(() => {
    getAllKeys();
    getData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <BigHeader
          allMovies={allMovies}
          mainBackgroundUrl={mainBackgroundUrl}
          searchText={searchText}
          setSearchText={setSearchText}
        />
        <View style={styles.moviesList}>
          {allMovies.length ? (
            allMovies.map(item => (
              <View style={styles.imgWrap} key={item.id}>
                <HomeMovie navigation={navigation} movie={item} keys={keys} />
              </View>
            ))
          ) : (
            <View style={styles.indicator}>
              <ActivityIndicator size="large" color="#35D875" />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
