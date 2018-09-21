import React, { Component } from 'react'
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { getAnime, getNextPage } from './../../reducers/ApiReducer'
import { setCurrentAnime } from './../../reducers/AnimeDetailReducer'
import { MyListItem } from './../HomeScreen/MyListItem'

const NUM_COLUMNS = 3
const MAX_ITEMS = 15
//const HEADER_HEIGHT = Dimensions.get('screen').width * 0.2

class HomeScreen extends Component {

  constructor(props){
    super(props)
  }

  componentDidMount() {
    this.props.getAnime(0)
  }

  addMoreAnime = () => {
    if(this.props.isLoading === false){
      this.props.getNextPage()
      this.props.getAnime((this.props.page + 1) * MAX_ITEMS)
      console.log('end reached ' + this.props.page)
    }
  }

  renderFooter = () => {
    return (
      <View style={styles.listFooter}>
        <ActivityIndicator animating size="large" />
      </View>
    )
  }

  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />
    }
    return (
      <MyListItem anime={item} setCurrentAnime={this.props.setCurrentAnime} navigation = {this.props.navigation} />
    )
  }

  render() {
    if(this.props.repos.length === 0){
      return (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }
    
    return (
      <FlatList
        data={this.props.repos}
        style={styles.container}
        renderItem={this.renderItem}
        numColumns={NUM_COLUMNS}
        onEndReached={this.addMoreAnime}
        onEndReachedThreshold={0.5}
        keyExtractor={(item, index) => item.id}
        ListFooterComponent={this.renderFooter}
      />
    )
  }
}

const mapStateToProps = state => {
  let listData = state.api.repos.map(repo => ({id: repo.id, image: repo.attributes.posterImage.small, name: repo.attributes.canonicalTitle}))
  return {
    repos: listData,
    page: state.page,
    isLoading: state.api.loading
  }
}

const mapDispatchToProps = {
  getAnime,
  getNextPage,
  setCurrentAnime
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  listFooter: {
    paddingVertical: 10
  }
});