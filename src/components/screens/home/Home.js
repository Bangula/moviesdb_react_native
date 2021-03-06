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

  useEffect(() => {
    getAllKeys();
    getData();
  }, []);

  useEffect(() => {
    if (pageNumber > 1) getDataByPage();
  }, [pageNumber]);

  let mainBackgroundUrl;
  if (allMovies.length) {
    mainBackgroundUrl = getPoster(allMovies[0].poster_path);
  }

  const setSearch = text => {
    if (text.length) {
      getSearchData(text);
    } else {
      getData();
    }
  };

  function getData() {
    url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&page=1`;
    axios
      .get(url)
      .then(res => {
        // let newList = allMovies.concat(res.data.results);
        setAllMovies(res.data.results);
      })
      .catch(err => alert(err.response));
  }

  function getDataByPage() {
    url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&page=${pageNumber}`;
    axios
      .get(url)
      .then(res => {
        let newList = allMovies.concat(res.data.results);
        setAllMovies(newList);
      })
      .catch(err => alert(err.response));
  }

  function getSearchData(text) {
    url = `https://api.themoviedb.org/3/search/movie?api_key=844dba0bfd8f3a4f3799f6130ef9e335&language=en-US&query=${text}&page=1`;
    axios
      .get(url)
      .then(res => {
        setAllMovies(res.data.results);
      })
      .catch(err => alert(err.response));
  }

  // async function getData(text) {
  //   if (searchQuery) {
  //     let url;
  //     url = `https://api.themoviedb.org/3/search/movie?api_key=844dba0bfd8f3a4f3799f6130ef9e335&language=en-US&query=${text}&page=${pageNumber}`;
  //     axios
  //       .get(url)
  //       .then(res => {
  //         setAllMovies(res.data.results);
  //       })
  //       .catch(err => alert(err.response));
  //   } else {
  //     axios
  //       .get(
  //         `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&page=${pageNumber}`
  //       )
  //       .then(res => {
  //         console.log("second", res.data.results);
  //         let newList = allMovies.concat(res.data.results);

  //         setAllMovies(newList);
  //       })
  //       .catch(err => alert(err.response));
  //   }
  // }

  const getAllKeys = async () => {
    try {
      let key = await AsyncStorage.getAllKeys();
      setKeys(key);
      console.log("get all keys invoked");
    } catch (e) {
      // read key error
    }
  };

  const updatePageNumber = () => {
    setPageNumber(pageNumber => pageNumber + 1);
  };

  const styles = StyleSheet.create({
    movieListHeight: {
      height: Dimensions.get("window").height,
      flexDirection: "row",
      justifyContent: "center",
      flexWrap: "wrap",
      paddingTop: 10,
      backgroundColor: "black"
    },
    moviesList: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      paddingTop: 10,
      backgroundColor: "black"
    },
    imgWrap: {
      margin: 2,
      padding: 2,
      height: Dimensions.get("window").height / 2,
      width: Dimensions.get("window").width / 2 - 4
    },
    indicator: {}
  });

  console.log("home kljucevi", keys);
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: "black" }]}>
      <NavigationEvents
        onDidFocus={payload => getAllKeys()} // runs every time when component shows
      />
      <ScrollView>
        {allMovies.length ? (
          <BigHeader
            allMovies={allMovies}
            mainBackgroundUrl={mainBackgroundUrl}
            getData={getData}
            setSearch={setSearch}
            navigation={navigation}
          />
        ) : null}

        <View
          style={[
            allMovies.length ? styles.moviesList : styles.movieListHeight,
            { flexWrap: "wrap" }
          ]}
        >
          {allMovies.length ? (
            allMovies.map(item => (
              <View style={styles.imgWrap} key={item.id}>
                <HomeMovie navigation={navigation} movie={item} keys={keys} />
              </View>
            ))
          ) : (
            <ActivityIndicator size="large" color="#35D875" />
          )}
        </View>
        {allMovies.length ? (
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
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
