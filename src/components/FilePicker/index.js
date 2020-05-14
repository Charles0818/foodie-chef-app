import * as React from 'react';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Audio } from 'expo-av';
export const usePermission  = (type = 'camera') => {
  const [image, setImage] = React.useState(null);
  const detectPermission = React.useCallback((type) => {
    switch(type) {
      case 'camera':
        return Permissions.CAMERA, Permissions.CAMERA_ROLL
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
          alert(`Sorry, we need ${type} permissions to make this work!`);
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

export const AudioRecording = () => {
  const [recordingStatus, setRecordingStatus] = React.useState({
    canRecord: false, isDoneRecording: false, isRecording: false, durationMillis: 0, URI: '', sound: null
  });
  const [recording, setRecording] = React.useState(null);
    const getPermissionAsync = async () => {
      const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
      if (status !== 'granted') {
        alert(`Sorry, we need recording permissions to make this work!`);
      }
    };
    
  const startRecording = async () => {
    getPermissionAsync();
    const recording = new Audio.Recording();
    setRecording(recording);
    try {
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync();
      recording.setOnRecordingStatusUpdate(status => setRecordingStatus(status))
      recording.setProgressUpdateInterval(1000);
      // You are now recording!
    } catch (error) {
      // An error occurred!
      console.log(error);
      alert(`An error occured while trying to intitiate recording. Kindly try again, ${error}`);
    }
  }
  const stopRecording = async () => {
    try {
      const status = await recording.stopAndUnloadAsync();
      const URI = await recording.getURI()
      const { sound, status: playbackStatus } = await recording.createNewLoadedSoundAsync(
        {
          progressUpdateIntervalMillis: 500,
          positionMillis: 0,
          shouldPlay: false,
          rate: 1.0,
          shouldCorrectPitch: false,
          volume: 1.0,
          isMuted: false,
          isLooping: false,
        },
      );
      setRecordingStatus({...status, URI, sound});
    } catch (error) {
      console.log(error)
    }
  }
  return { startRecording, recordingStatus, stopRecording }
}
