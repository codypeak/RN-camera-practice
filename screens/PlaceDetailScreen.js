import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PlaceDetailScreen = props => {
  return (
    <View>
      <Text>PlaceDetailScreen</Text>
    </View>
  );
};

PlaceDetailScreen.navigationOptions = navData => {
  return { 
    headerTitle: navData.navigation.getParam('placeTitle') //param from PlacesListScreen
  }
};

const styles = StyleSheet.create({});

export default PlaceDetailScreen;
