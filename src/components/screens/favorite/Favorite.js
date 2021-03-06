import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Dimensions
} from "react-native";
import { NavigationEvents } from "react-navigation";
import AsyncStorage from "@react-native-community/async-storage";
import FavoriteMovie from "./components/FavoriteMovie";

const Favorites = ({ navigation, ...props }) => {
  const [keys, setKeys] = React.useState([]);
  const [favorites, setFavorites] = useState([]);

  const getAllKeys = async () => {
    console.log("get all keys invoked");
    try {
      let key = await AsyncStorage.getAllKeys();
      setKeys(key);
    } catch (e) {
      // read key error
    }
  };
  const getMyValue = async storageKey => {
    try {
      let value = await AsyncStorage.getItem(storageKey);
      let parsed = JSON.parse(value);
      console.log("parsed", parsed);
      return parsed;
    } catch (e) {
      // read error
    }
  };
  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
      getAllKeys();
    } catch (e) {
      // clear error
    }
  };

  useEffect(() => {
    let array = keys.map((item, i) => {
      return getMyValue(item);
    });
    Promise.all(array).then(data => setFavorites(data));
  }, [keys.length]);

  console.log("favorites favorites", favorites);
  const styles = StyleSheet.create({
    moviesList: {
      flex: 1,
      //flexDirection: "row",

      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
      paddingTop: 10,
      backgroundColor: "black"
    },
    indicatorContainer: {
      width: "100%"
    },
    noData: {
      width: "100%",
      alignItems: "center"
    }
  });
  return (
    <View style={styles.moviesList}>
      <NavigationEvents
        onDidFocus={payload => getAllKeys()} // runs every time when component show
      />
      {keys.length ? (
        favorites.length ? (
          <>
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={favorites}
              ListFooterComponent={
                <Button onPress={clearAll} title="remove all" />
              }
              renderItem={({ item }) => (
                <FavoriteMovie
                  navigation={navigation}
                  movie={item}
                  getAllKeys={() => getAllKeys()}
                />
              )}
            />
          </>
        ) : (
          <View style={styles.indicatorContainer}>
            <ActivityIndicator size="large" color="#35D875" />
          </View>
        )
      ) : (
        <View style={styles.noData}>
          <Text style={{ color: "white" }}>
            The list of Favorite Movies is empty.
          </Text>
        </View>
      )}
    </View>
  );
};

export default Favorites;
