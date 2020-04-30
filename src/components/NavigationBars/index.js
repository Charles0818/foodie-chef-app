import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { styles, colors } from '../styles';

export const BottomBar = ({ state, descriptors, navigation }) => {
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('tabLongPress', e => {
      // Do something
    });
  
    return unsubscribe;
  }, [navigation]);
  return (
    <View style={[styles.row, styles.bg_white, styles.slimBorderTop, styles.padding_sm]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const { icon, badgeCount } = options;
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity key={index}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <View style={[styles.alignItems_center, styles.padding_sm, styles.marginRight_sm, styles.nowrap]}>
                <View style={{...styles.marginBottom_sm}}>
                  <FontAwesomeIcon icon={icon} style={{...styles.font_md, color: isFocused ? colors.color1 : colors.color_dark}}/>
                  {badgeCount > 0 && (
                    <View
                      style={{
                        // On React Native < 0.57 overflow outside of parent will not work on Android, see https://git.io/fhLJ8
                        position: 'absolute',
                        right: -6,
                        top: -3,
                        backgroundColor: 'red',
                        borderRadius: 6,
                        width: 12,
                        height: 12,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
                        {badgeCount}
                      </Text>
                    </View>
                  )}
                </View>
                <Text style={[styles.font_xsm, isFocused ? styles.color1 : styles.color_dark ]}>{label}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
