import * as React from 'react';
import { View, Text, Image, ScrollView } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { VictoryBar, VictoryChart } from 'victory-native';
import { Button } from '../../../components';
import { Screen, Section } from '../../Wrapper';
import { styles, colors } from '../../styles';
import { TransactionCard, TransactionChart } from '../Components';

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
      <ScrollView style={[styles.paddingTop_sm]}>
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
            <TransactionCard navigate={navigation.navigate} />
            <TransactionCard navigate={navigation.navigate} />
          </View>
        </Section>
      </ScrollView>
    </Screen>
  )
}

export default Transactions;
