import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ImageBackground,
  Dimensions,
  Image,
  Button,
  ActivityIndicator
} from "react-native";

import searchIcon from "../../../../assets/images/search.png";
import { debounce } from "lodash";

const styles = StyleSheet.create({
  mainPosterContainer: {
    width: "100%",
    height: Dimensions.get("window").height * 0.73,
    backgroundColor: "black"
  },
  headerText: {
    color: "rgba(255,255,255,0.9)"
  },
  headerSection1: {
    height: "50%",
    width: "100%"
  },
  headerSection2: {
    height: "40%",
    width: "100%",
    width: "100%",
    padding: 20,
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  headerSection3: {
    height: "10%",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  inputContainer: {
    borderRadius: 30,
    backgroundColor: "#1d1d1d",
    paddingHorizontal: 4,
    flexDirection: "row",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.2)",
    alignItems: "center"
  }
});

const BigHeader = ({ allMovies, mainBackgroundUrl, setSearch, navigation }) => {
  const handleSearch = debounce(text => {
    // if (text !== "") getData(text);
    // else getData();
    setSearch(text);
  }, 500);

  return (
    <View style={styles.mainPosterContainer}>
      <ImageBackground
        source={{ uri: mainBackgroundUrl ? mainBackgroundUrl : null }}
        resizeMode="cover"
        style={{ width: "100%", height: "100%" }}
      >
        <View style={styles.headerSection1} />
        <View style={[styles.headerSection2, { justifyContent: "center" }]}>
          <View>
            <Text
              style={[styles.headerText, { fontSize: 24, fontWeight: "bold" }]}
            >
              {allMovies.length ? allMovies[0].title : null}
            </Text>
          </View>
          <View style={{ overflow: "hidden" }}>
            <Text
              style={[
                styles.headerText,
                {
                  fontSize: 14,
                  marginTop: 12,
                  fontStyle: "italic",
                  lineHeight: 18
                }
              ]}
            >
              {allMovies[0].overview.length > 200
                ? allMovies[0].overview.substring(0, 200)
                : allMovies[0].overview}
            </Text>
            {allMovies[0].overview.length > 200 ? (
              <View style={{ marginTop: 10 }}>
                <Button
                  color="transparent"
                  onPress={() =>
                    navigation.push("Details", { id: allMovies[0].id })
                  }
                  title="Read more..."
                />
              </View>
            ) : null}
          </View>
        </View>
        <View style={[styles.headerSection3]}>
          <View style={styles.inputContainer}>
            <View style={{ width: 50, paddingLeft: 10 }}>
              <Image source={searchIcon} style={{ width: 25, height: 25 }} />
            </View>
            <View />
            <View style={{ flex: 1 }}>
              <TextInput
                onChangeText={text => handleSearch(text)}
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
        </View>
      </ImageBackground>
    </View>
  );
};

export default BigHeader;
