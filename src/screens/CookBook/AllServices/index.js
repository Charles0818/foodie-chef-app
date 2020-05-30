import * as React from 'react';
import { View, Text, FlatList, Dimensions, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Screen, Section, NetworkInfo } from '../../Wrapper';
import { Cards, Button }  from '../../../components';
import { styles, colors } from '../../styles';
import { service } from '../../../components/Utils';

const services = [
  {
    id: Math.random() * Math.random(),
    tags: 'nutrition'
  },
  {
    id: Math.random() * Math.random(),
    tags: 'vegetable'
  },
  {
    id: Math.random() * Math.random(),
    tags: 'breakfast'
  },
  {
    id: Math.random() * Math.random(),
    tags: 'lunch'
  },
  {
    id: Math.random() * Math.random(),
    tags: 'dinner'
  },
  {
    id: Math.random() * Math.random(),
    tags: 'nutrition'
  },
  {
    id: Math.random() * Math.random(),
    tags: 'nutrition'
  },

]
const { ListServiceCard, PortraitServiceCard } = Cards;
const AllServices = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={[styles.row, styles.alignItems_center, styles.marginRight_sm]}>
          <Text style={[styles.font_sm, styles.fontWeight_700, styles.marginRight_sm]}>Add Service</Text>
          <View style={[styles.overflow_h,]}>
            <Button style={[styles.flexCenter, styles.bg_gray, styles.overflow_h, {width: 45, height: 45, borderRadius: 45 / 2}]} action={() => navigation.navigate('CreateService')}>
              <AntDesign name="plus" size={20} />
            </Button>
          </View>
        </View>
      )
    })
  })
  return (
    <NetworkInfo>
      <Screen>
        <Section>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={[styles.paddingHorizontal_sm, styles.paddingVertical_sm]}>
          {services.map((service, key) => (
              <Button key={key} action={() => console.log('an attemt to filter dishes')} style={[styles.border_r_10, styles.padding_md, styles.bg_color1, styles.marginRight_sm]}>
                <Text style={[styles.font_sm, styles.uppercase, styles.color_white]}>{service.tags}</Text>
              </Button>
          ))}
          </ScrollView>
          <FlatList
            data={services}
            renderItem={({ item, index, separators }) => <PortraitServiceCard /> }
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={[{justifyContent: 'flex-start'}]}
            initialNumToRender={30}
            contentContainerStyle={[styles.justifyContent_center, styles.marginTop_sm]}
          />
        </Section>
      </Screen>
    </NetworkInfo>
  )
}

export default AllServices;