import React from 'react';
import { View, Text, ImageBackground, Image, StyleSheet, FlatList, Animated, TextInput, Dimensions } from 'react-native';
import { Foundation, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { Animations, Button } from '../../../components';
import { styles, colors } from '../../styles';
import { Section, Screen } from '../../Wrapper';
import { useNavigation } from '@react-navigation/core';
const { FadeIn } = Animations;

const items = [
  {title: "Pizza", thumbnail: require('../../../assets/peppered-snail.jpg'), category: 'Vegetable', tags: ['tag1', 'tag2', 'tag3'], ingredients: ["ingredient 1", "ingredient 2"]},
  {title: "Garlic", thumbnail: require('../../../assets/peppered-snail.jpg'), category: 'Vegetable', tags: ['tag1', 'tag2', 'tag3'], ingredients: ["ingredient 1", "ingredient 2"]},
  {title: "Potato", thumbnail: require('../../../assets/peppered-snail.jpg'), category: 'Vegetable', tags: ['tag1', 'tag2', 'tag3'], ingredients: ["ingredient 1", "ingredient 2"]},
  {title: "Cheese", thumbnail: require('../../../assets/peppered-snail.jpg'), category: 'Vegetable', tags: ['tag1', 'tag2', 'tag3'], ingredients: ["ingredient 1", "ingredient 2"]},
  {title: "Noodles", thumbnail: require('../../../assets/peppered-snail.jpg'), category: 'Vegetable', tags: ['tag1', 'tag2', 'tag3'], ingredients: ["ingredient 1", "ingredient 2"]},
  {title: "pepper Snail", thumbnail: require('../../../assets/peppered-snail.jpg'), category: 'Vegetable', tags: ['tag1', 'tag2', 'tag3'], ingredients: ["ingredient 1", "ingredient 2"]},
  {title: "Pizza", thumbnail: require('../../../assets/peppered-snail.jpg'), category: 'Vegetable', tags: ['tag1', 'tag2', 'tag3'], ingredients: ["ingredient 1", "ingredient 2"]},
  {title: "Pepper Snail", thumbnail: require('../../../assets/peppered-snail.jpg'), category: 'Vegetable', tags: ['tag1', 'tag2', 'tag3'], ingredients: ["ingredient 1", "ingredient 2"]},
  {title: "Pizza", thumbnail: require('../../../assets/peppered-snail.jpg'), category: 'Vegetable', tags: ['tag1', 'tag2', 'tag3'], ingredients: ["ingredient 1", "ingredient 2"]},
  {title: "Pizza", thumbnail: require('../../../assets/peppered-snail.jpg'), category: 'Vegetable', tags: ['tag1', 'tag2', 'tag3'], ingredients: ["ingredient 1", "ingredient 2"]},
  {title: "Pizza", thumbnail: require('../../../assets/peppered-snail.jpg'), category: 'Vegetable', tags: ['tag1', 'tag2', 'tag3'], ingredients: ["ingredient 1", "ingredient 2"]},
  {title: "Pizza", thumbnail: require('../../../assets/peppered-snail.jpg'), category: 'Vegetable', tags: ['tag1', 'tag2', 'tag3'], ingredients: ["ingredient 1", "ingredient 2"]},
  {title: "Pizza", thumbnail: require('../../../assets/peppered-snail.jpg'), category: 'Vegetable', tags: ['tag1', 'tag2', 'tag3'], ingredients: ["ingredient 1", "ingredient 2"]},
  {title: "Pizza", thumbnail: require('../../../assets/peppered-snail.jpg'), category: 'Vegetable', tags: ['tag1', 'tag2', 'tag3'], ingredients: ["ingredient 1", "ingredient 2"]},
  {title: "Pizza", thumbnail: require('../../../assets/peppered-snail.jpg'), category: 'Vegetable', tags: ['tag1', 'tag2', 'tag3'], ingredients: ["ingredient 1", "ingredient 2"]},
  {title: "Pizza", thumbnail: require('../../../assets/peppered-snail.jpg'), category: 'Vegetable', tags: ['tag1', 'tag2', 'tag3'], ingredients: ["ingredient 1", "ingredient 2"]},
]
export default SelectCookThumbnail = ({navigation, route: { params }}) => {
  const [searchText, setSearchText] = React.useState(params.searchText);
  const onChangeText = (text) => {
    setSearchText(text);
    setThumbnails(items.filter(el => el.title.search(text) >= 0))
  }
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TextInput
          value={searchText}
          placeholder="Search food thumbail"
          style={[styles.padding_md, styles.font_md, styles.fontWeight_700, styles.slimBorder, styles.border_r_5, styles.marginBottom_sm, styles.marginRight_md, {flex: 1, width: 300}]}
          onChangeText={text => onChangeText(text)}
          autoFocus={true}
        />
      )
    })
  })
  const [thumbnails, setThumbnails] = React.useState([]);
  const [selectedItems, setSelectedItems] = React.useState([]);
  React.useEffect(() => {
    setThumbnails(items.filter(el => el.title.search(params.searchText) >= 0))
  }, [])
  return (
    <Screen>
      {thumbnails.length > 0 ? (
      <Animated.FlatList
        data={thumbnails}
        renderItem={({ item, index, separators }) => <DropdownItem dish={item} />}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        initialNumToRender={30}
        contentContainerStyle={[styles.flexCenter, styles.paddingTop_sm, {width: Dimensions.get('window').width}]}
      />
      ): <EmptyDropdown />}
    </Screen>
  )
}

const DropdownItem = ({dish}) => {
  const { navigate } = useNavigation()
  const { title, thumbnail, category, tags } = dish
  return (
    <FadeIn style={[dropdownStyles.item, styles.marginBottom_sm, styles.boxShadow_md]}>
      <Button style={[styles.padding_md]} activeOpacity={.6} action={() => navigate('CreateService', {dish, searchText: title})}>
        <View style={[styles.row]}>
          <View style={[styles.border_r_5, styles.overflow_h, styles.marginRight_sm, {width: 100, height: 100}]}>
            <Image source={thumbnail}
              resizeMethod="scale" style={[{width: '100%', flex: 1}]}
            />
          </View>
          <View style={[styles.justifyContent_between, {flex: 1}]}>
            <Text numberOfLines={1} style={[styles.font_lg, styles.fontWeight_700, styles.capitalize, styles.marginBottom_xsm]}>{title}</Text>
            <View style={[styles.row, styles.marginBottom_sm]}>
              <View style={[styles.bg_color3, styles.border_r_10, styles.padding_sm]}>
                <Text numberOfLines={1} style={[styles.color_white, styles.fontWeight_700, styles.font_sm,]}>{category}</Text>
              </View>
            </View>
            <View style={[styles.row]}>
              {tags.map((tag, index) => (
                <View key={index} style={[styles.bg_gray, styles.border_r_10, styles.padding_sm, styles.marginRight_xsm, styles.marginBottom_xsm]}>
                  <Text numberOfLines={1} style={[styles.fontWeight_700, styles.font_xsm,]}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Button>
    </FadeIn>
  )
}

const EmptyDropdown = () => {
  return (
    <Section style={[styles.flexCenter, {flex: 1, height: '100%'}]}>
      {/* <View> */}
        <Text style={[styles.font_lg, styles.color_gray, styles.text_center, styles.marginBottomsm]}>No item(s) found</Text>
        <Foundation name="photo" size={70} color={colors.gray_color} />
      {/* </View> */}
    </Section>
  )
}
const dropdownStyles = StyleSheet.create({
  item: {
    width: Dimensions.get('window').width - 45,
    height: 'auto',
    borderRadius: 5,
    ...styles.bg_white,
    // overflow: 'hidden'
  }
})