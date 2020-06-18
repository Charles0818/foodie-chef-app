import React from 'react';
import { View, Text } from 'react-native';
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
    return { hasError: true };  
  }
  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service   
    console.log(error, errorInfo)
  }
  render() {
     // You can render any custom fallback UI      
    if (this.state.hasError) {
      return (
        <View>
          <Text>Something Went Wrong></Text>
        </View>
      );
    }
    return this.props.children; 
  }
}