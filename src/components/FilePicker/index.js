import * as React from 'react';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

export const ImageUpload  = () => {
  const [image, setImage] = React.useState(null);
  React.useEffect(() => {
    const getPermissionAsync = async () => {
      if (Constants.platform.ios) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    };
    getPermissionAsync();
  }, []);
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setImage(result.uri);
      }
      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };
  const accessCamera = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setImage(result.uri);
      }
      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };
  return { pickImage, image, accessCamera }
}


  // render() {
  //   let { image } = this.state;

  //   return (
  //     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  //       <Button title="Pick an image from camera roll" onPress={this._pickImage} />
  //       {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
  //     </View>
  //   );
  // }
