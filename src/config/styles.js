import { StyleSheet } from "react-native";

export const COLOR = {
  DARK: "#040207",
  PANTOME: '#0c490d',
  LIGHT: "#ffffff",
  BLACK: "#000",
  GRAY: "#9A9A9A",
  LIGHT_GRAY: "#f2f2f2",
  DANGER: "#fc5050",
  //ARTIST: '#3062ba',
  ARTIST: "#06285e",
  HOME: "#0c490d",
  ALBUM: "#e09523",
  POST: "#8ebc34",
  POSTLIGHT: "#e8f0ff",
  // SONG: "#e81414",
  SONG: "#99140a",
  CHOCO: "#48310b",
  //PROFILE: "#3f3363",
  PROFILE: "#5b5b5b"
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.LIGHT_GRAY,
    padding: 16
  },

  containerPostDetail: {
    flex: 1,
    backgroundColor: COLOR.LIGHT_GRAY,
    padding: 16
  },

  containerArtistDetail: {
    flex: 1,
    backgroundColor: COLOR.LIGHT_GRAY,
    padding: 16
  },
  containerAlbumDetail: {
    flex: 1,
    backgroundColor: COLOR.LIGHT_GRAY,
    padding: 16
  },
  header: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    width: '100%',
    zIndex: 100
  }
});

export default Styles;