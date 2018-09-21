import React, { Component } from 'react'
import { Text, View, BackHandler, StyleSheet, ScrollView, Animated, Dimensions, Image } from 'react-native'
import { Image as Img } from 'react-native-expo-image-cache'
import { connect } from 'react-redux'
import { Transition } from 'react-navigation-fluid-transitions'

const CONTENT = 'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?'
const CONTENT_2 = 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?'

const HEADER_EXPANDED_HEIGHT = Dimensions.get('screen').width * 0.6
const HEADER_COLLAPSED_HEIGHT = Dimensions.get('screen').width * 0.2

const POSTER_IMAGE_WIDTH = Dimensions.get('screen').width * 0.4
const POSTER_IMAGE_HEIGHT = POSTER_IMAGE_WIDTH * 19/13

const SCROLL_Y = new Animated.Value(0)

class DetailScreen extends Component {

  headerHeight = SCROLL_Y.interpolate({
    inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
    outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
    extrapolate: 'clamp'
  })
  headerTitleOpacity = SCROLL_Y.interpolate({
    inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
    outputRange: [0, 1],
    extrapolate: 'clamp'
  })
  coverOpacity = SCROLL_Y.interpolate({
    inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  })

  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.state.params.title,
    }
  }

  constructor(props){
    super(props)
    console.log(props.detail.attributes.coverImage.original)
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
  }

  handleBackPress = () => {
    this.props.navigation.goBack()
    return true
  }

  handleScroll = Animated.event(
    [{ nativeEvent: {
         contentOffset: {
           y: SCROLL_Y
         }
       }
    }]
  )

  render() {
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.coverContainer, {height: this.headerHeight}]}>
          <View style={styles.coverImageContainer}>
            <Animated.Image 
              source={{uri: this.props.detail.attributes.coverImage.original}}
              style={[styles.coverImage, {opacity: this.coverOpacity}]}
            />
          </View>
          <Animated.Text style={[styles.headerTitle, {opacity: this.headerTitleOpacity}]}>{this.props.anime.name}</Animated.Text>
        </Animated.View>
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          onScroll={this.handleScroll}
          scrollEventThrottle={16}>
          <View style={styles.contentPosterImageRow}>
              <View>
                <Transition shared={this.props.anime.id}>
                  <Img uri={this.props.anime.image} style={styles.image} />
                </Transition>
              </View>
              <View style={styles.contentAttributes}>
                <Text style = { styles.animeTitle } >{this.props.anime.name}</Text>
                <View>
                  <Text>{this.props.detail.attributes.averageRating}</Text>
                </View>
              </View>
          </View>
          <Text>{CONTENT}</Text>
          <Text>{CONTENT_2}</Text>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = state => {
  let detail = state.api.repos.filter(function(anime){ return (anime.id === state.anime.current.id) })[0]
  return {
    anime: state.anime.current,
    detail: detail
  }
}

export default connect(mapStateToProps)(DetailScreen)

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    width: POSTER_IMAGE_WIDTH,
    height: POSTER_IMAGE_HEIGHT
  },
  coverImageContainer: {
    flex: 1
  },
  coverImage: {
    flex: 1, 
    resizeMode: 'cover', 
  },
  scrollContainer: {
    padding: 16,
    paddingTop: HEADER_EXPANDED_HEIGHT + 10
  },
  backgroundContainer: {
    flex: 1
  },
  coverContainer: {
    width: Dimensions.get('screen').width,
    position: 'absolute',
    backgroundColor: '#1a237e',
    top: 0,
    left: 0,
    zIndex: 999
  },
  headerTitle: { 
    position: 'absolute', 
    left: 16, 
    top: 40, 
    fontSize: 18, 
    color: 'white' 
  },
  contentPosterImageRow: { 
    flex: 1, 
    flexDirection: 'row'
  },
  contentAttributes: {
    marginLeft: 16,
    marginRight: 10,
    flexDirection: 'column',
    flex: 1
  },
  animeTitle: {
    fontWeight: 'bold',
    flexWrap: 'wrap',
    textAlign: 'center',
    fontSize: 18
  },
  ratingBox: {
    padding: 20,
    borderColor: 'red',
    borderWidth: 2,
  }
})