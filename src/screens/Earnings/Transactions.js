import * as React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, ImageBackground } from 'react-native'
import { FontAwesome5, Feather, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { VictoryAnimation, VictoryBar, VictoryArea, VictoryAxis, VictoryTheme, VictoryChart } from 'victory-native';
import { Button, useToggleButton, FilePicker, Utils } from '../../components';
import { Screen, Section } from '../Wrapper';
import { styles, colors } from '../styles';


const Transactions = ({navigation}) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button style={[styles.marginRight_sm]}>
          <FontAwesome5 name="filter" size={20} color={colors.white} />
        </Button>
      )
    })
  })
  return (
    <Screen>
      <ScrollView>
      <View style={[styles.bg_white]}>
        <Section>
          <View style={[styles.row, styles.alignItems_center, styles.justifyContent_between]}>
            <Text style={[styles.fontWeight_700, styles.font_md]}>Jan 2020</Text>
            <Button style={[styles.row, styles.flexCenter, styles.border_r_5, styles.bg_gray, {width: 100, height: 40}]}>
              <Text style={[styles.fontWeight_700, styles.font_md, styles.marginRight_xsm, styles.color1]}>Monthly</Text>
              <FontAwesome5 name="arrow-down" size={16} color={colors.color1} />
            </Button>
          </View>
          <TransactionChart />
        </Section>
      </View>
      <Section>
      <View>
        <Text numberOfLines={1} style={[styles.font_md, styles.fontWeight_700, styles.marginBottom_sm, styles.capitalize,]}>Transactions</Text>
        <TransactionCard />
        <TransactionCard />
      </View>
      </Section>
      </ScrollView>
    </Screen>
  )
}

const TransactionChart = () => {
  const data = [
    { quarter: '1-5', earnings: '1.3K' },
    { quarter: '6-10', earnings: '16.50K' },
    { quarter: '11-15', earnings: '14.25K' },
    { quarter: '16-20', earnings: '19.00K' },
    { quarter: '21-25', earnings: '19.00K' },
    { quarter: '26-31', earnings: '19.00K' }
  ];
  return (
        <VictoryChart style={{flex: 1}}>
          {/* <VictoryAxis
            style={{
              axis: {stroke: "transparent"},
              grid: {stroke: colors.gray_color, fill: 'blue',  backgroundColor: colors.gray_color, flex: 1},
              ticks: {stroke: "grey", size: 0},
            }}
          /> */}
          <VictoryBar
            data={data} x="quarter" y="earnings"
            barRatio={.5}
            cornerRadius={{ top: 10 }}
            animate={{ easing: 'exp' }}
            style={{
              data: { fill: colors.color1, width: 25 },
              axis: {stroke: "transparent"},
            }}
          />
        </VictoryChart>
  )
}

const TransactionCard = () => {
  return (
    <View style={[styles.row, styles.alignItems_center, styles.justifyContent_between, styles.bg_gray, styles.border_r_5, styles.paddingHorizontal_sm, styles.marginBottom_sm, {height: 100}]}>
      <View style={[styles.row, styles.alignItems_center, {flex: 1.2}]}>
        <View style={[styles.avatar_md, styles.marginRight_sm]}>
          <Image source={require('../../assets/avatar.jpg')} style={{width: '100%', flex: 1}} />
        </View>
        <View style={[{flex: 1}]}>
          <Text numberOfLines={1} style={[styles.font_md, styles.fontWeight_700, styles.marginBottom_xsm, styles.capitalize]}>Iyobosa Aghedo Evbayowieru</Text>
          <Text numberOfLines={1} style={[styles.font_sm, styles.fontWeight_700, styles.color_gray]}>15 Feb</Text>
        </View>
      </View>
      <View style={[styles.alignItems_end, {flex: .8}]}>
        <Text numberOfLines={1} style={[styles.font_lg, styles.fontWeight_700, {color: colors.google_green}]}>+ $334,652.00</Text>
      </View>
    </View>
  )
}


export default Transactions;
