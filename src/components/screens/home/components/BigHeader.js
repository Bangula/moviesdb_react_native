import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ImageBackground,
  Dimensions,
  Image
} from "react-native";

import searchIcon from "../../../../assets/images/search.png";

const styles = StyleSheet.create({
  mainPosterContainer: {
    width: "100%",
    height: Dimensions.get("window").height * 0.7,
    backgroundColor: "black"
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
    flexDirection: "row",
    borderWidth: 2,
    borderColor: "gray",
    alignItems: "center"
  }
});

const BigHeader = ({
  allMovies,
  mainBackgroundUrl,
  searchText,
  setSearchText
}) => {
  return (
    <View style={styles.mainPosterContainer}>
      <ImageBackground
        source={{ uri: mainBackgroundUrl ? mainBackgroundUrl : null }}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={styles.headerSection1} />
        <View style={[styles.headerSection2, { justifyContent: "center" }]}>
          <View>
            <Text style={[styles.headerText, { fontSize: 24 }]}>
              {allMovies.length ? allMovies[0].title : null}
            </Text>
          </View>
          <View style={{ overflow: "hidden" }}>
            <Text style={[styles.headerText, { fontSize: 14, marginTop: 12 }]}>
              {allMovies.length ? allMovies[0].overview : null}
            </Text>
          </View>
        </View>
        <View style={[styles.headerSection3]}>
          <View style={{ width: 50, paddingLeft: 10 }}>
            <Image source={searchIcon} style={{ width: 25, height: 25 }} />
          </View>
          <View />
          <View style={{ flex: 1 }}>
            <TextInput
              value={searchText}
              onChangeText={text => setSearchText(text)}
              style={{
                color: "#fff",
                height: "100%",
                width: "100%"
              }}
              placeholder="Search..."
              placeholderTextColor="#fff"
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default BigHeader;
