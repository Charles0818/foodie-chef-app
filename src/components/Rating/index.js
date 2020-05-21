import React from 'react';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { styles, colors } from '../styles';

export default useRating = (value = 0) => {
  const [rating, setRating] = React.useState(value);
  const CustomRating = ({readonly = false}) => {
    return (
      <Rating
        type='heart'
        ratingCount={5}
        ratingColor={colors.color1}
        startingValue={value}
        imageSize={20}
        readonly={readonly}
        onFinishRating={rating => setRating(rating)}
        ratingBackgroundColor="transparent"
        style={{alignItems: 'flex-start'}}
      />
    )
  }
  return { CustomRating, rating }
}