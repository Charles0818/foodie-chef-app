import { useState, useEffect } from 'react';
import NetInfo from "@react-native-community/netinfo";
export default useNetworkState = () => {
  const [isConnected, setIsConnected] = useState(true)
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log("Connection type", state.type);
      setIsConnected(state.isConnected)
      console.log("Is connected?", state.isConnected);
    });
    // NetInfo.
    return () => unsubscribe();
  }, []);
  return { isConnected }
}