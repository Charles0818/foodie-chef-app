import * as React from 'react';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

export const usePermission  = (type = 'image') => {
  const [image, setImage] = React.useState(null);
  const detectPermission = React.useCallback((type) => {
    switch(type) {
      case 'image':
        return Permissions.CAMERA, Permissions.CAMERA_ROLL
      case 'recording':
        return Permissions.AUDIO_RECORDING
      case 'location':
        return Permissions.LOCATION
      default:
        return Permissions.CAMERA, Permissions.CAMERA_ROLL
    }
  }, [type])
  React.useEffect(() => {
    const getPermissionAsync = async () => {
      if (Constants.platform.ios) {
        const { status } = await Permissions.askAsync(detectPermission(type));
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    };
    getPermissionAsync();
  }, []);
  const pickImage = async (type = 'Images') => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions[type],
        allowsEditing: true,
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
  const accessCamera = async (type = 'Images') => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions[type],
        allowsEditing: true,
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
  return { pickImage, image, setImage, accessCamera }
}