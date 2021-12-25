import React, { useEffect } from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  DeviceEventEmitter,
  Modal,
} from "react-native";

const Home = ({ navigation }) => {
  let uploadListener = null;
  const [visible, setVisible] = React.useState(false);

  useEffect(() => {
    manageEvent();
    return () => {};
  }, []);

  const removeEvents = () => {
    if (uploadListener) {
      uploadListener.remove();
    }
  };

  const onUploadTab = () => {
    setVisible(true);
  };

  const manageEvent = () => {
    removeEvents();
    uploadListener = DeviceEventEmitter.addListener("TabUpload", onUploadTab);
  };

  const renderModal = () => {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View style={{ height: 200, width: 200, backgroundColor: "red" }} />
        <Button title="Close" onPress={() => setVisible(false)} />
      </View>
    );
  };

  return (
    <View style={styles.center}>
      <Text>This is the home screen</Text>
      <Button
        title="Go to About Screen"
        onPress={() => navigation.navigate("About")}
      />
      <Modal visible={visible} transparent={true} animationType={"none"}>
        {renderModal()}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});

export default Home;
