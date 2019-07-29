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
  ActivityIndicator
} from "react-native";
import HomeMovie from "./components/HomeMovie";
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
      marginTop: 20
    },
    imgWrap: {
      margin: 2,
      padding: 2,
      height: Dimensions.get("window").height / 2,
      width: Dimensions.get("window").width / 2 - 4
    },
    spinner: {
      marginTop: 20
    }
  });
  console.log("movies ----", allMovies);
  return (
    <SafeAreaView>
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
        <View style={styles.moviesList}>
          {allMovies.length ? (
            allMovies.map(item => (
              <View style={styles.imgWrap} key={item.id}>
                <HomeMovie navigation={navigation} movie={item} />
              </View>
            ))
          ) : (
            <ActivityIndicator size="large" color="#0000ff" />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
