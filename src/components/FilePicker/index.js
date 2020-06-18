import * as React from 'react';
import { Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Audio, Video } from 'expo-av';
import { getNativeSourceAndFullInitialStatusForLoadAsync } from 'expo-av/build/AV';
export const usePermission = ({initialImage = null, type = 'camera'}) => {
  const [image, setImage] = React.useState(initialImage);
  const [imageBlob, setImageBlob] = React.useState('');
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
    setImage(initialImage)
  }, [initialImage])
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
  const pickImage = async (type = 'Images', action = setImage) => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions[type],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        action(result.uri);
      }
      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };
  const accessCamera = async (type = 'Images', action = setImage) => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions[type],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        action(result.uri);
      }
      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

  const parseFileForUpload = (uri) => {
    // let filename = uri.split('/').pop();
    // let match = /\.(\w+)$/.exec(filename);
    // let type = match ? `image/${match[1]}` : `image`;
    // let formData = new FormData();
    // formData.append('photo', { uri, name: filename, type });
    return {
      uri: Platform.OS === 'android' ? uri : uri.replace('file://',''),
      type: 'file',
    }
  }
  return { pickImage, image, parseFileForUpload, imageBlob, setImage, accessCamera }
}

export const AudioRecording = () => {
  const initialState = {
    canRecord: false, isDoneRecording: false,
    isRecording: false, durationMillis: 0, URI: '', sound: null
  }
  const [recordingStatus, setRecordingStatus] = React.useState(initialState);
  const [recording, setRecording] = React.useState(null);
    
    
  const startRecording = async () => {
    const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    if (status !== 'granted') {
      alert(`Sorry, we need recording permissions to make this work!`);
      return;
    }
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
      if(recordingStatus.isRecording) cancelRecording()
      alert(`An error occured while trying to intitiate recording. Kindly try again, ${error}`);
    }
  }
  const cancelRecording = async () => {
    try {
      await recording.stopAndUnloadAsync();
      setRecordingStatus(initialState)
    } catch (error) {
      console.log(error)
    }
  }
  const doneRecording = async () => {
    try {
      const status = await recording.stopAndUnloadAsync();
      const URI = await recording.getURI();
      setRecordingStatus({...status, URI});
      return URI;
    } catch (error) {
      console.log(error)
    }
  }
  return { startRecording, recordingStatus, cancelRecording, doneRecording }
}

export const PlayAudio = async (assetPath) => {
  const [audioStatus, setAudioStatus] = React.useState({});
  const [audio] = React.useState(async () => {
    try {
      const { sound: audio, status } = await Audio.Sound.createAsync(
        assetPath,
        {
          shouldPlay: false,
          volume: 1.0,
          isBuffering: true
        },
        status => setAudioStatus(status), true
      );
      audio.setProgressUpdateIntervalAsync(1000)
      return audio
    } catch (error) {
      console.log(error);
      alert(`Could not load the audio file you're requesting, ${error}`)
    }
  })
  Reat.useState(() => {
    return () => audio.unloadAsync()
  })
  const setPosition = async (millis) => {
    await audio.setPositionAsync(millis)
  }
  const playPause = async (action) => {
    const status = await audioStatus.isPlaying ? audio.pauseAsync() : audio.playAsync()
    setAudioStatus(status);
  }
  return { setPosition, playPause, audioStatus };
}