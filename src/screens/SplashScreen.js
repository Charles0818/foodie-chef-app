import * as React from 'react';
import { View, Text, Image } from 'react-native';
import { Screen } from './Wrapper';
import { styles } from './styles';
const SplashScreen = ({ navigation }) => {
  React.useEffect(() => {
    const timeout = setTimeout(() => navigation.replace("Onboard"), 4000);
    return () => clearTimeout(timeout);
  }, [])
  return (
    <Screen style={[styles.bg_white2, styles.flexCenter]}>
      <View style={[styles.marginBottom_md, {width: 400, height: 400}]}>
        <Image source={require('../assets/cuisingo-logo.png')} style={{width: '100%', flex: 1}} resizeMethod="scale" />
      </View>
      {/* <Text numberOfLines={1} style={[styles.color_white, styles.fontWeight_700, styles.font_xlg]}>Cuisingo</Text> */}
    </Screen>
  )
}

export default SplashScreen;
