import React, { useCallback, useEffect, useLayoutEffect } from 'react';
import { View, Text, FlatList, Dimensions, ScrollView } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect, useSelector, useDispatch, shallowEqual } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import { Screen, Section, NetworkInfo } from '../../Wrapper';
import { Cards, Button }  from '../../../components';
import { actions } from '../../../helpers';
import { styles, colors } from '../../styles';
import { service } from '../../../components/Utils';
const { cookBookActions: { getAllDishesRequest } } = actions;
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
const AllServices = ({ navigation, dishes, getDishes }) => {
  useLayoutEffect(() => {
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
  useEffect(() => {
    getDishes();
  }, [])
  return (
    <NetworkInfo>
      <Screen>
        <Section>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={[styles.paddingHorizontal_sm, styles.paddingVertical_sm]}>
          {dishes.map((dish, key) => (
              <Button key={key} action={() => console.log('an attemt to filter dishes')} style={[styles.border_r_10, styles.padding_md, styles.bg_color1, styles.marginRight_sm]}>
                <Text style={[styles.font_sm, styles.uppercase, styles.color_white]}>{dish.tags}</Text>
              </Button>
          ))}
          </ScrollView>
          <FlatList
            data={dishes}
            renderItem={({ item, index, separators }) => <PortraitServiceCard /> }
            keyExtractor={(item, index) => item.id.toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={[{justifyContent: 'flex-start'}]}
            initialNumToRender={30}
            ListEmptyComponent={() => <EmptyListRender />}
            onEndReachedThreshold={0.25}
            refreshing={true}
            onRefresh={() => {}}
            onEndReached={() => {}}
            contentContainerStyle={[styles.justifyContent_center, styles.marginTop_sm]}
          />
        </Section>
      </Screen>
    </NetworkInfo>
  )
}

const EmptyListRender = () => {
  return (
    <View style={[styles.flexCenter, {flex: 1}]}>
      <Text style={[styles.text, styles.marginBottom_sm]}>No dish could be found</Text>
      <Button style={[styles.row, styles.padding_md, styles.bg_gray]}>
        <Text style={[styles.text, styles.font_md]}>Create this dish</Text>
      </Button>
    </View>
  )
}
const mapDispatchToProps = dispatch => 
  bindActionCreators({ getDishes: getAllDishesRequest }, dispatch);
const mapDishesToProps = state => {
  return { dishes: state.cookBookReducer }
}
export default connect(mapDishesToProps, mapDispatchToProps)(AllServices);