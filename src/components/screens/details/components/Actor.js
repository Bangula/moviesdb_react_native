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
import { getProfileImage } from "../../home/common/getMoviePoster";

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "row" },
  img: {
    height: Dimensions.get("window").height / 3 - 4,
    width: Dimensions.get("window").width / 2 - 4
  },
  details: {
    height: Dimensions.get("window").height / 3 - 4,
    width: Dimensions.get("window").width / 2 - 4,
    paddingLeft: 20,
    paddingRight: 10,
    backgroundColor: "#1D1D1D",
    flexShrink: 1
  },
  detailsName: {
    paddingTop: 30,
    fontSize: 20,
    color: "white"
  },
  detailsRole: { color: "white" }
});

const Actor = props => {
  const [actorImg, setActorImg] = React.useState("");

  React.useEffect(() => {
    getActorImg(props.actor.profile_path);
  }, []);

  async function getActorImg(data) {
    try {
      const image = await getProfileImage(data);
      // console.log("actor img ", image);
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
      ) : null}
    </>
  );
};

export default Actor;
