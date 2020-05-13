import * as React from 'react';
import { View, Text, ScrollView, StyleSheet, ImageBackground } from 'react-native'
import { FontAwesome5, Feather, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { Button, useToggleButton, FilePicker, Utils } from '../../components';
import { Screen, Section } from '../Wrapper';
import { styles, colors } from '../styles';

const { usePermission } = FilePicker;
const { dataConstants: { availableDocuments } } = Utils;

const DocumentInstruction = ({title, instruction}) => {
  return (
    <View style={[styles.marginBottom_md]}>
      <Text numberOfLines={2} style={[styles.font_lg, styles.fontWeight_700, styles.marginBottom_xsm]}>{title}</Text>
      <Text style={[styles.font_sm, styles.marginBottom_xsm]}>{instruction}</Text>
    </View>
  )
}
const VerificationProof = ({navigation, route: { params }}) => {
  const { document } = params;
  const { accessCamera: captureBackView, image: backView, setImage: setFrontView } = usePermission('camera');
  const { accessCamera: captureFrontView, image: frontView, setImage: setBackView } = usePermission('camera');
  const { title, instruction} = availableDocuments.find(el => el.title === document)
  const uploadedDocuments = [
    {
      view: 'front',
      image: frontView
    },
    {
      view: 'front',
      image: backView
    }
  ]
  return (
    <Screen style={[styles.bg_white]}>
      <Section style={[styles.paddingHorizontal_md]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <DocumentInstruction title={title} instruction={instruction} />
          <UploadArea documentSide="front" image={frontView} setImage={setFrontView} accessCamera={captureFrontView} />
          <UploadArea documentSide="back" image={backView} setImage={setBackView} accessCamera={captureBackView}/>
          <Button action={() => navigation.navigate('ProfileUpdate', {uploadedDocuments})} style={[styles.bg_color1, styles.flexCenter, styles.border_r_35, styles.padding_md]}>
            <View style={[styles.row, styles.alignItems_center]}>
              <Text style={[styles.color_white, styles.fontWeight_700, styles.font_md, styles.marginRight_sm]}>SAVE CAPTURES</Text>
              <FontAwesome5 name="image" icon={16} color={colors.white} />
            </View>
          </Button>
        </ScrollView>
      </Section>
    </Screen>
  )
}

const UploadArea = ({documentSide, image, setImage, accessCamera}) => {
  return (
    <View style={[styles.marginBottom_md]}>
      <View style={[styles.row, styles.alignItems_center, styles.justifyContent_between]}>
        <Text style={[styles.fontWeight_700, styles.color_gray, styles.font_md, styles.uppercase]}>{documentSide}</Text>
        <Button action={() => setImage(null)} style={[styles.flexCenter, styles.overflow_h, {width: 30, height: 30, borderRadius: 15}]}>
          <FontAwesome5 name="trash-alt" size={16} color={colors.color1} />
        </Button>
      </View>
      <ImageBackground source={{uri: image}} style={[compStyles.uploadArea]}>
        {!image ? (
        <Button action={accessCamera} style={[compStyles.cameraIcon]}>
          <Feather name="camera" size={30} color={colors.gray_color} />
        </Button>
        ) : null}
      </ImageBackground>
    </View>
  )
}

const compStyles = StyleSheet.create({
  uploadArea: {
    width: '100%',
    height: 300,
    borderStyle: 'dashed',
    borderColor: colors.gray_color,
    borderWidth: 1,
    backgroundColor: colors.white2,
    ...styles.border_r_5,
    ...styles.flexCenter,
  },
  cameraIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderStyle: 'dashed',
    ...styles.flexCenter,
    
  }
})

export default VerificationProof;
