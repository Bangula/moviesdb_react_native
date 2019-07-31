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
import { NavigationEvents } from "react-navigation";
import HomeMovie from "./components/HomeMovie";
import { getPoster } from "./common/getMoviePoster";

// Components
import BigHeader from "./components/BigHeader";
import AsyncStorage from "@react-native-community/async-storage";
const apiKey = "fc22f3679adfcc3e819328e339157dfa";

const Home = ({ navigation }) => {
  const [allMovies, setAllMovies] = useState([]);
  const [keys, setKeys] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getAllKeys();
  }, []);

  useEffect(() => {
    getData(searchQuery);
  }, [pageNumber, searchQuery]);

  let mainBackgroundUrl;
  if (allMovies.length) {
    mainBackgroundUrl = getPoster(allMovies[0].poster_path);
  }

  const setSearch = text => {
    setSearchQuery(text);
  };

  async function getData(searchQuery) {
    if (searchQuery) {
      let url;
      if (searchQuery.length < 2) {
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&page=1`;
      } else {
        url = `https://api.themoviedb.org/3/search/movie?api_key=844dba0bfd8f3a4f3799f6130ef9e335&language=en-US&query=${searchQuery}`;
      }
      axios
        .get(url)
        .then(res => {
          setAllMovies(res.data.results);
          setSearchQuery("");
        })
        .catch(err => alert(err));
    } else {
      axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&page=${pageNumber}`
        )
        .then(res => {
          let newList = allMovies.concat(res.data.results);

          setAllMovies(newList);
        })
        .catch(err => alert(err));
    }
  }

  const getAllKeys = async () => {
    try {
      let key = await AsyncStorage.getAllKeys();
      setKeys(key);
    } catch (e) {
      // read key error
    }
  };

  const updatePageNumber = () => {
    setPageNumber(pageNumber => pageNumber + 1);
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
    getData();
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: "black" }]}>
      <NavigationEvents
        // onWillFocus={payload => console.log("will focus", payload)}
        onDidFocus={payload => getAllKeys()} // runs every time when component shows
        // onWillBlur={payload => console.log("will blur", payload)}
        // onDidBlur={payload => console.log("did blur", payload)}
      />
      <ScrollView>
        <BigHeader
          allMovies={allMovies}
          mainBackgroundUrl={mainBackgroundUrl}
          getData={getData}
          setSearch={setSearch}
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
        <View
          style={{
            paddingHorizontal: 4,
            backgroundColor: "black",
            marginTop: 10
          }}
        >
          <Button
            color="#35D875"
            title="Load more..."
            onPress={() => updatePageNumber()}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
