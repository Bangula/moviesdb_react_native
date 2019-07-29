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
  TextInput
} from "react-native";

import HomeMovie from "./components/HomeMovie";
import getPosterUrl from "./common/getMoviePoster";

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
      const mainBg = getPosterUrl(movies.data.results[0].poster_path);
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
      marginTop: 20
    },
    imgWrap: {
      margin: 2,
      padding: 2,
      height: Dimensions.get("window").height / 2,
      width: Dimensions.get("window").width / 2 - 4
    },
    mainPosterContainer: {
      width: "100%",
      height: Dimensions.get("window").height * 0.7
    },
    headerText: {
      color: "rgba(255,255,255,0.8)"
    },
    headerSection1: {
      height: "40%",
      width: "100%"
    },
    headerSection2: {
      height: "50%",
      width: "100%",
      width: "100%",
      padding: 20,
      backgroundColor: "rgba(0,0,0,0.7)"
    },
    headerSection3: {
      height: "10%",
      width: "100%",
      borderRadius: 10,
      backgroundColor: "black",
      paddingHorizontal: 4,
      paddingVertical: 6,
      flexDirection: "row"
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
        <View style={styles.mainPosterContainer}>
          <ImageBackground
            source={{ uri: mainBackgroundUrl ? mainBackgroundUrl : null }}
            style={{ width: "100%", height: "100%" }}
          >
            <View style={styles.headerSection1} />
            <View style={[styles.headerSection2, { justifyContent: "center" }]}>
              <View>
                <Text style={[styles.headerText, { fontSize: 24 }]}>
                  Movie title
                </Text>
              </View>
              <View>
                <Text
                  style={[styles.headerText, { fontSize: 14, marginTop: 12 }]}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Adipisci illo nihil eius quaerat sunt, omnis recusandae,
                  asperiores, consequuntur magni doloremque ab natus voluptatem
                  expedita necessitatibus doloribus numquam aspernatur
                  explicabo. Quae?
                </Text>
              </View>
            </View>
            <View
              style={[
                styles.headerSection3,
                { borderWidth: 2, borderColor: "#fff" }
              ]}
            >
              <View>
                <Text style={styles.headerText}>Search</Text>
              </View>
              <View>
                <TextInput
                  value={searchText}
                  onChangeText={text => setSearchText(text)}
                  style={{ color: "#fff" }}
                />
              </View>
            </View>
          </ImageBackground>
        </View>
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
