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

const apiKey = "fc22f3679adfcc3e819328e339157dfa";

const Home = ({ navigation }) => {
  const [allMovies, setAllMovies] = useState([]);
  const [searchText, setSearchText] = useState("");
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
      const mainBg = getPoster(movies.data.results[0].poster_path);
      setMainBackgroundUrl(mainBg);
      console.log(mainBg);
      setAllMovies(movies.data.results);
    } catch (error) {
      alert(error);
    }
  }
  const styles = StyleSheet.create({
    moviesList: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      flexWrap: "wrap",
      marginTop: 20,
      backgroundColor: "#666666"
    },
    imgWrap: {
      margin: 2,
      padding: 2,
      height: Dimensions.get("window").height / 2,
      width: Dimensions.get("window").width / 2 - 4
    }
  });
  console.log("movies ----", allMovies);
  return (
    <SafeAreaView style={{ backgroundColor: "black" }}>
      {/* {allMovies.length ? (
        <FlatList
          style={styles.moviesList}
          data={allMovies}
          renderItem={({ item }) => (
            <View style={styles.imgWrap}>
               <HomeMovie navigation={navigation} movie={item} /> 
              <Text>{item.id}</Text>
            </View>
          )}
        />
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
     */}

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
                <HomeMovie navigation={navigation} movie={item} />
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

export default Home;
