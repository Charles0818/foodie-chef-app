import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Animated, ScrollView, Dimensions } from 'react-native';
import PropTypes from  'prop-types';
import { styles } from '../styles';
import { colors } from '../../styles';

const DEVICE_WIDTH = Dimensions.get('window').width;

const useComponentCarousel = () => {
  const [index, setIndex] = useState(0);
  const updateIndex = event => {
    //width of the view size
    const viewSize = event.nativeEvent.layoutMeasurement.width;
    //get current position of scrollView
    const contentOffset = event.nativeEvent.contentOffset.x;

    const selectedIndex = Math.round(contentOffset / viewSize);
    setIndex(selectedIndex);
  };
  return { updateIndex, index, setIndex };
};

const ComponentCarousel = ({ slides, autoSlide, duration, bullet, pagingEnabled, dimensions: { width, height } }) => {
  const { updateIndex, index: selectedIndex, setIndex } = useComponentCarousel();
  console.log('index', selectedIndex)
  const scrollRef = useRef();
  const slideWidth = useRef();
  const getSlideWidth = (event) => {
    const { width } = event.nativeEvent.layout;
    slideWidth.current = Math.round(width);
  }
  useEffect(() => {
    if(autoSlide) {
      const interval = setInterval(() => {
        setIndex(prev => (prev === slides.length - 1 ? 0 : prev + 1));
      }, duration);
      scrollRef.current.scrollTo({
        animated: true,
        y: 0,
        x: slideWidth.current * selectedIndex,
      });
      return () => clearInterval(interval);
    }
  }, [selectedIndex, setIndex, slides.length, width]);
  return (
    <View style={[styles.flexCenter, { width, height, ...styles.bg_white, ...styles.marginBottom_md }]}>
      <ScrollView
        horizontal
        // onMomentumScrollEnd={updateIndex}
        showsHorizontalScrollIndicator={false}
        ref={scrollRef}
        style={{width}}
        pagingEnabled={pagingEnabled}
        onScroll={updateIndex}>
        {slides.map((Slide, index) => (
          <View key={index} style={[CarouselStyles.slide, styles.alignItems_center ]} onLayout={event => getSlideWidth(event)}>
            {Slide}
          </View>
        ))}
      </ScrollView>
      <View style={CarouselStyles.circleDiv}>
        {bullet ? slides.map((_, index) => (
          <Animated.View
            key={index}
            style={[
              CarouselStyles.whiteCircle,
              {backgroundColor: index === selectedIndex ? colors.color1 : colors.white}
            ]}
          />
        )) : null}
      </View>
    </View>
  );
};

ComponentCarousel.propTypes = {
  duration: PropTypes.number.isRequired,
  bullet: PropTypes.bool,
  controls: PropTypes.bool,
  slideWidth: PropTypes.number,
  autoSlide: PropTypes.bool,
  cardAlign: PropTypes.bool,
  pagingEnabled: PropTypes.bool,
}
ComponentCarousel.defaultProps = {
  duration: 3500,
  bullet: true,
  controls: false,
  slideWidth: 100,
  autoSlide: true,
  cardAlign: false,
  pagingEnabled: false
}

const CarouselStyles = StyleSheet.create({
  slider: {
    width: DEVICE_WIDTH,
  },

  slide: {
    height: '100%',
    paddingHorizontal: 5,
  },
  circleDiv: {
    position: 'absolute',
    bottom: 15,
    height: 10,
    width: '100%',
    ...styles.justifyContent_center,
    ...styles.alignItems_center,
    ...styles.row,
  },
  whiteCircle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    ...styles.margin_sm,
    ...styles.bg_white,
  },
});

export default ComponentCarousel;
