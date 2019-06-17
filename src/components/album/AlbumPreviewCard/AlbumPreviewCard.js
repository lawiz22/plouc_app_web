import React from 'react';
import { Badge, Button, View, Image, StyleSheet, PanResponder, Text, ScrollView, FlatList } from 'react-native';
// import glamorous from 'glamorous-native';

// app theme colors
import { colors } from '../../../config/theme';
import { COLOR } from '../../../config/styles';

// components
import {Title} from 'react-native-paper';




const AlbumPreviewCard = ({ name, imageUrl, colortitle }) => {
  return (
    <View style = {{ width : 125,  backgroundColor: COLOR.LIGHT_GRAY ,  borderColor : 'white', borderWidth : 5}}>
      <View style = {{ width : 120,  backgroundColor: COLOR.LIGHT_GRAY , borderColor : 'white', borderWidth : 3}}>
        <Image source={{ uri: imageUrl }} style={{
                            borderRadius: 100
                        }} style={styles.image}/>
      </View>
      <View style = {{ alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles.textView}>
        
          {name}
        
     </Text>
      </View>
    
    
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    
    //justifyContent: 'center',
    //margeRight: 20,
    paddingBottom: 20,
    borderBottomColor:  COLOR.POST,
    borderBottomWidth: 40,
  },
  image: {
    //borderRadius: 50,
    borderWidth: 3,
    borderColor: COLOR.GRAY,
    width: 110,
    height: 110,
  },
 
  imageView: {
   
      width: 125,
      //height: 100 ,
      margin: 7,
      borderRadius : 10
   
  },
   
  textView: {
   
    width: 280, 
    //textAlignVertical:'bottom',
    padding: 5,
    fontSize: 11,
    color: '#222',
    fontWeight : 'bold',
    justifyContent: 'flex-end',
    alignItems: 'center',
    // position: 'absolute', 
    marginRight: -175, 
    //paddingBottom: -50, 
    //backgroundColor: COLOR.ARTIST 
 
   
   
  }
  

});
export default AlbumPreviewCard;