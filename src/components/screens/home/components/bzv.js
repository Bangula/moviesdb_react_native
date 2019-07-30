import React from "react";
import {
  View,
  ScrollView,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  Dimensions
} from "react-native";
import HomeMovie from "./components/HomeMovie";

const styles = StyleSheet.create({
  moviesList: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  imgWrap: {
    margin: 2,
    padding: 2,
    height: Dimensions.get("window").height / 2,
    width: Dimensions.get("window").width / 2 - 4
  }
});

const Home = ({ navigation }) => {
  return (
    <SafeAreaView>
      <ScrollView>
        <Text>Home Page</Text>

        <View style={styles.moviesList}>
          <View style={styles.imgWrap}>
            <HomeMovie navigation={navigation} />
          </View>
          <View style={styles.imgWrap}>
            <HomeMovie navigation={navigation} />
          </View>

          <View style={styles.imgWrap}>
            <HomeMovie navigation={navigation} />
          </View>

          <View style={styles.imgWrap}>
            <HomeMovie navigation={navigation} />
          </View>

          <View style={styles.imgWrap}>
            <HomeMovie navigation={navigation} />
          </View>

          <View style={styles.imgWrap}>
            <HomeMovie navigation={navigation} />
          </View>

          <View style={styles.imgWrap}>
            <HomeMovie navigation={navigation} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
