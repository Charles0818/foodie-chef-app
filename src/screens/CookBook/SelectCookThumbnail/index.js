import React from 'react';
import { View, Text, ImageBackground, StyleSheet, FlatList, Animated, TextInput, Dimensions } from 'react-native';
import { Foundation, FontAwesome5 } from '@expo/vector-icons';
import { Animations, Button } from '../../../components';
import { styles, colors } from '../../styles';
import { Section, Screen } from '../../Wrapper';
import { useNavigation } from '@react-navigation/core';
const { FadeIn } = Animations;

const items = [
  {title: "Pizza", thumbnail: require('../../../assets/peppered-snail.jpg')},
  {title: "Garlic", thumbnail: require('../../../assets/peppered-snail.jpg')},
  {title: "Potato", thumbnail: require('../../../assets/peppered-snail.jpg')},
  {title: "Cheese", thumbnail: require('../../../assets/peppered-snail.jpg')},
  {title: "Noodles", thumbnail: require('../../../assets/peppered-snail.jpg')},
  {title: "Pizza", thumbnail: require('../../../assets/peppered-snail.jpg')},
  {title: "Pizza", thumbnail: require('../../../assets/peppered-snail.jpg')},
  {title: "Pizza", thumbnail: require('../../../assets/peppered-snail.jpg')},
  {title: "Pizza", thumbnail: require('../../../assets/peppered-snail.jpg')},
  {title: "Pizza", thumbnail: require('../../../assets/peppered-snail.jpg')},
  {title: "Pizza", thumbnail: require('../../../assets/peppered-snail.jpg')},
  {title: "Pizza", thumbnail: require('../../../assets/peppered-snail.jpg')},
  {title: "Pizza", thumbnail: require('../../../assets/peppered-snail.jpg')},
  {title: "Pizza", thumbnail: require('../../../assets/peppered-snail.jpg')},
  {title: "Pizza", thumbnail: require('../../../assets/peppered-snail.jpg')},
  {title: "Pizza", thumbnail: require('../../../assets/peppered-snail.jpg')},
]
export default SelectCookThumbnail = ({navigation}) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TextInput
          placeholder="Search food thumbail"
          style={[styles.padding_md, styles.font_md, styles.fontWeight_700, styles.slimBorder, styles.border_r_5, styles.marginBottom_sm, styles.marginRight_md, {flex: 1, width: 300}]}
          onChangeText={text => setThumbnails(items.filter(el => el.title.search(text) >= 0))}
          autoFocus={true}
        />
      )
    })
  })
  const [thumbnails, setThumbnails] = React.useState([]);
  const [selectedItems, setSelectedItems] = React.useState([]);
  return (
    <Screen style={[styles.paddingHorizontal_sm]}>
      {thumbnails.length > 0 ? (
      <Animated.FlatList
        data={thumbnails}
        renderItem={({ item, index, separators }) => <DropdownItem item={item} />}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        initialNumToRender={30}
        numColumns={2}
        contentContainerStyle={[ styles.paddingTop_sm, {width: Dimensions.get('window').width}]}
      />
      ): <EmptyDropdown />}
    </Screen>
  )
}

const DropdownItem = ({item}) => {
  const { navigate } = useNavigation()
  const { title, thumbnail } = item
  return (
    <FadeIn style={[styles.marginBottom_sm, styles.marginRight_sm]}>
      <Button style={[ dropdownStyles.item]} action={() => navigate('CreateService', {thumbnail}) }>
        <ImageBackground  source={thumbnail} style={[{width: '100%', flex: 1}]}>
          <View style={[styles.bg_darkOpacity, styles.justifyContent_end, styles.alignItems_center, { position: 'absolute', bottom: 0, width: '100%', height: 30}]}>
            <Text style={[styles.color_white, styles.text_center, styles.fontWeight_700, styles.font_md]}>{title}</Text>
          </View>
        </ImageBackground>
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
    width: Dimensions.get('window').width / 2,
    height: 150,
  }
})