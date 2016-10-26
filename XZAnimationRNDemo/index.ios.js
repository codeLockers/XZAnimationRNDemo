/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Animated
} from 'react-native';

export default class XZAnimationRNDemo extends Component {

  constructor(props) {
    super(props);
  
    this.state = {

      bounceValue1:new Animated.Value(0),

      fadeInOpacity2:new Animated.Value(0),

      fadeInOpacity3:new Animated.Value(0),
      rotation3:new Animated.Value(0),
      fontSize3:new Animated.Value(0),
    };
  }

  componentDidMount() {
    //scale Animation
    this.state.bounceValue1.setValue(1.5)
    Animated.spring(this.state.bounceValue1,{
      toValue:0.8,
      friction:1,}).start()

    //opacity Animation
    this.state.fadeInOpacity2.setValue(0)
    Animated.timing(this.state.fadeInOpacity2,{
      toValue:1,
      duration:1500,
    }).start()


    // Animated.parallel(['fadeInOpacity3','rotation3','fontSize3'].map(porperty => {
      // console.log(porperty)
      // return Animated.timing(this.state.{porperty},{
      //   toValue:1,
      //   duration:2
      // })
      // 
      
    //   Animated.timing(this.state.fadeInOpacity3,{
    //     toValue:1,
    //     duration:2000
    //   })


    // })).start()
  }

  render() {
    return (
      <View style={styles.container}>

        <Animated.View
          style={{marginTop:60,width:100,height:100,backgroundColor:'red',transform:[{scale:this.state.bounceValue1}]}}
        />
        <Animated.Text style={{marginTop:20,fontSize:25,color:'black',opacity:this.state.fadeInOpacity2}}>文字淡出</Animated.Text>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('XZAnimationRNDemo', () => XZAnimationRNDemo);
