import React from 'react';
import { View, Text, ImageBackground, StyleSheet, FlatList, SafeAreaView, Animated, TextInput, Dimensions } from 'react-native';
import { Foundation, FontAwesome5 } from '@expo/vector-icons';
import { Animations, Button } from '../../../components';
import { styles, colors } from '../../styles';
import { Section, Screen } from '../../Wrapper';
import { useNavigation } from '@react-navigation/core';
const { FadeIn } = Animations;

const items = [
  {title: "Pizza", thumbnail: require('../../../assets/peppered-snail.jpg'), category: 'Vegetable', tags: ['tag1', 'tag2', 'tag3']},
  {title: "Garlic", thumbnail: require('../../../assets/peppered-snail.jpg'), category: 'Vegetable', tags: ['tag1', 'tag2', 'tag3']},
  {title: "Potato", thumbnail: require('../../../assets/peppered-snail.jpg'), category: 'Vegetable', tags: ['tag1', 'tag2', 'tag3']},
  {title: "Cheese", thumbnail: require('../../../assets/peppered-snail.jpg'), category: 'Vegetable', tags: ['tag1', 'tag2', 'tag3']},
  {title: "Noodles", thumbnail: require('../../../assets/peppered-snail.jpg'), category: 'Vegetable', tags: ['tag1', 'tag2', 'tag3']},
  {title: "Pizza", thumbnail: require('../../../assets/peppered-snail.jpg'), category: 'Vegetable', tags: ['tag1', 'tag2', 'tag3']},
  {title: "Pizza", thumbnail: require('../../../assets/peppered-snail.jpg'), category: 'Vegetable', tags: ['tag1', 'tag2', 'tag3']},
  {title: "Pizza", thumbnail: require('../../../assets/peppered-snail.jpg'), category: 'Vegetable', tags: ['tag1', 'tag2', 'tag3']},
  {title: "Pizza", thumbnail: require('../../../assets/peppered-snail.jpg'), category: 'Vegetable', tags: ['tag1', 'tag2', 'tag3']},
  {title: "Pizza", thumbnail: require('../../../assets/peppered-snail.jpg'), category: 'Vegetable', tags: ['tag1', 'tag2', 'tag3']},
  {title: "Pizza", thumbnail: require('../../../assets/peppered-snail.jpg'), category: 'Vegetable', tags: ['tag1', 'tag2', 'tag3']},
  {title: "Pizza", thumbnail: require('../../../assets/peppered-snail.jpg'), category: 'Vegetable', tags: ['tag1', 'tag2', 'tag3']},
  {title: "Pizza", thumbnail: require('../../../assets/peppered-snail.jpg'), category: 'Vegetable', tags: ['tag1', 'tag2', 'tag3']},
  {title: "Pizza", thumbnail: require('../../../assets/peppered-snail.jpg'), category: 'Vegetable', tags: ['tag1', 'tag2', 'tag3']},
  {title: "Pizza", thumbnail: require('../../../assets/peppered-snail.jpg'), category: 'Vegetable', tags: ['tag1', 'tag2', 'tag3']},
  {title: "Pizza", thumbnail: require('../../../assets/peppered-snail.jpg'), category: 'Vegetable', tags: ['tag1', 'tag2', 'tag3']},
]
export default SearchDish = ({ setSelectedDish }) => {
  const [dishes, setDishes] = React.useState([]);
  const maxHeight = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.timing(maxHeight, {
      toValue: dishes.length !== 0 ? 450 : 0,
      duration: 500,
    }).start() 
  }, [maxHeight])
  return (
    <View style={[styles.paddingHorizontal_sm]}>
      <TextInput
        placeholder="Search Dish"
        style={[styles.padding_md, styles.font_md, styles.fontWeight_700, styles.slimBorder, styles.border_r_5, styles.marginBottom_sm, styles.marginRight_md, {flex: 1, width: 300}]}
        onChangeText={text => setDishes(items.filter(el => el.title.search(text) >= 0))}
        autoFocus={true}
      />
      <Animated.View style={{maxHeight}}>
        <Animated.FlatList
          data={dishes}
          renderItem={({ item, index, separators }) => <DropdownItem item={item} setSelectedDish={setSelectedDish} />}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={true}
          initialNumToRender={30}
          numColumns={2}
          contentContainerStyle={[ styles.paddingTop_sm, {width: Dimensions.get('window').width}]}
        />
      </Animated.View>
    </View>
  )
}

const DropdownItem = ({item, setSelectedDish}) => {
  const { title, thumbnail } = item;
  const action = () => {
    setSelectedDish(item)
  }
  return (
    <FadeIn style={[styles.marginBottom_sm, styles.marginRight_sm]}>
      <Button style={[ dropdownStyles.item]} action={action}>
        <ImageBackground  source={thumbnail} style={[{width: '100%', flex: 1}]}>
          <View style={[styles.bg_darkOpacity, styles.justifyContent_end, styles.alignItems_center, { position: 'absolute', bottom: 0, width: '100%', height: 30}]}>
            <Text style={[styles.color_white, styles.text_center, styles.fontWeight_700, styles.font_md]}>{title}</Text>
          </View>
        </ImageBackground>
      </Button>
    </FadeIn>
  )
}

const dropdownStyles = StyleSheet.create({
  item: {
    width: Dimensions.get('window').width / 2,
    height: 150,
  }
})