import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Cards, Carousels, Button } from '../components';
import { Screen, Section } from './Wrapper';
import styles from '../styles/index'

const { SquareServiceCard } = Cards;
const { ComponentCarousel } = Carousels;

const Home = ({navigation}) => {
  return (
    <Screen>
      <Header />
      <ScrollView>
        <CategorizeServices
          navigation={navigation}
          screenName="RecentServices"
          section="Recent Services"
        />
        <CategorizeServices
          navigation={navigation}
          screenName="OngoingServices"
          section="Ongoing Services"
        />
      </ScrollView>
    </Screen>
  )
}

const Header = () => {
  return (
    <View style={[styles.bg_white]}>
      <Section
        style={[styles.row, styles.justifyContent_between, styles.alignItems_center, styles.boxShadow_sm, { width: '100%', height: 50 }]}>
        <View style={[styles.row, styles.alignItems_center]}>
          <View style={[styles.marginRight_md]}>
            <Button>
              <FontAwesomeIcon size={20} icon="bars" />
            </Button>
          </View>
          <Text numberOfLines={1} style={[styles.font_lg, styles.fontWeight_700]}>My Cook Book</Text>
        </View>
        <Button>
          <FontAwesomeIcon size={20} icon="bell" />
        </Button>
      </Section>
    </View>
  )
}

const CategorizeServices = ({ navigation, screenName, section }) => {
  const Services = [
    <SquareServiceCard navigation={navigation} />,
    <SquareServiceCard navigation={navigation} />,
    <SquareServiceCard navigation={navigation} />,
    <SquareServiceCard navigation={navigation} />
  ];
  return (
    <Section style={[styles.bg_white, styles.paddingVertical_md]}>
      <View style={[styles.row, styles.justifyContent_between, styles.alignItems_center, styles.marginBottom_md]} >
        <Text numberOfLines={1} style={[styles.font_lg, styles.fontWeight_700]}>{section}</Text>
        <Button action={() => navigation.navigate(screenName)}>
          <Text style={[styles.font_md, styles.color1]}>View all</Text>
        </Button>
      </View>
      <ComponentCarousel slides={Services} bullet={false} autoSlide={false} dimensions={{width: '100%', height: 'auto'}} />
    </Section>
  )
}

export default Home;
