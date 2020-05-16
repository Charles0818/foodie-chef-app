import * as React from 'react';
import { View, Text, FlatList, Dimensions } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Screen, Section } from '../../Wrapper';
import { Cards, Button }  from '../../../components';
import { styles, colors } from '../../styles';

const services = [
  {
    id: Math.random() * Math.random()
  },
  {
    id: Math.random() * Math.random()
  },
  {
    id: Math.random() * Math.random()
  },
  {
    id: Math.random() * Math.random()
  },
  {
    id: Math.random() * Math.random()
  },
  {
    id: Math.random() * Math.random()
  },
  {
    id: Math.random() * Math.random()
  },

]
const { ListServiceCard } = Cards;
const AllServices = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={[styles.row, styles.alignItems_center, styles.marginRight_sm]}>
          <Text style={[styles.font_sm, styles.fontWeight_700, styles.marginRight_sm]}>Add Service</Text>
          <View style={[styles.overflow_h,]}>
            <Button style={[styles.flexCenter, styles.bg_gray, styles.overflow_h, {width: 45, height: 45, borderRadius: 45 / 2}]} action={() => navigation.navigate('CreateService')}>
              <FontAwesome5 name="plus" size={20} />
            </Button>
          </View>
        </View>
      )
    })
  })
  return (
    <Screen>
      <FlatList
        data={services}
        renderItem={({ item, index, separators }) => <ListServiceCard /> }
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        initialNumToRender={30}
        contentContainerStyle={[styles.flexCenter, styles.marginTop_sm, {width: Dimensions.get('window').width}]}
      />
    </Screen>
  )
}

export default AllServices;