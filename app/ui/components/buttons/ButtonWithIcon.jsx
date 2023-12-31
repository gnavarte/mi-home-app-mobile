import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';

export const ButtonWithIcon = ({ title, titleColor, icon, backgroundColor, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.button, { backgroundColor: backgroundColor || '#512F7B' }]}>
        <View style={styles.iconContainer}>
          <Image source={icon} style={styles.icon} resizeMode="contain" />
        </View>
        <Text style={[styles.buttonText, { color: titleColor ? titleColor : 'white' }]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.7,
    height: 60,
    marginVertical: 14,
    borderRadius: 10,
    alignSelf: 'center',
  },
  iconContainer: {
    width: '15%',
    aspectRatio: 1,
    marginRight: 10,
  },
  icon: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  buttonText: {
    color: 'white',
    fontSize: Dimensions.get('window').width * 0.05,
    textAlign: 'center',
  },
});

export default ButtonWithIcon;
