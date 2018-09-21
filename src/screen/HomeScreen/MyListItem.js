import React, { PureComponent } from 'react'
import { Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { Image } from 'react-native-expo-image-cache'
import { Transition } from 'react-navigation-fluid-transitions'

export class MyListItem extends PureComponent {

  getAnimeDetail = (anime) => {
    this.props.setCurrentAnime(anime)
    console.log(this.props.navigation)
    this.props.navigation.dispatch({type: 'Detail'})
  }

  render() {
    return (
        <TouchableOpacity style = { styles.item } onPress = { () => this.getAnimeDetail(this.props.anime) } >
            <Transition shared = { this.props.anime.id }>
              <Image uri = { this.props.anime.image } resizeMethod = 'auto' style = { styles.image } />
            </Transition>
            <Text style = { styles.itemText } >{ this.props.anime.name }</Text>
        </TouchableOpacity>
    )
  }
}

var styles = StyleSheet.create({
    item: {
      backgroundColor: '#283593',
      alignItems: 'center',
      flex: 1,
      margin: 3,
      height: Dimensions.get('window').width / 1.7, // approximate a square
    },
    itemText: {
      color: '#fff',
      height: '20%',
      textAlign: 'center',
      textAlignVertical: 'center',
      fontSize: 12,
    },
    image: {
      width: 130,
      height: 190
    }
});