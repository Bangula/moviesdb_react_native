import React from "react";
import {
  View,
  Image,
  Text,
  Button,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions
} from "react-native";
import getPoster from "../../home/common/getMoviePoster";

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "row" },
  img: {
    height: "100%",
    width: Dimensions.get("window").width / 2 - 4
  },
  details: {
    width: "100%",
    height: "100%",
    paddingLeft: 30,
    backgroundColor: "#1D1D1D"
  },
  detailsName: { paddingTop: 30, fontSize: 20, color: "white" },
  detailsRole: { color: "white" }
});

const Actor = props => {
  const [actorImg, setActorImg] = React.useState("");

  React.useEffect(() => {
    getActorImg(props.actor.profile_path);
  }, []);

  async function getActorImg(data) {
    try {
      const image = await getPoster(data);
      console.log("actor img ", image);
      setActorImg(image);
    } catch (err) {
      console.log(err.response);
    }
  }

  console.log("actor props", props);
  return (
    <>
      {actorImg ? (
        <View style={styles.container}>
          <Image style={styles.img} source={{ uri: actorImg }} />
          <View style={styles.details}>
            <Text style={styles.detailsName}>{props.actor.name}</Text>
            <Text style={styles.detailsRole}>{props.actor.character}</Text>
          </View>
        </View>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
    </>
  );
};

export default Actor;
