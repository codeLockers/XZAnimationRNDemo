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
  Animated,
  Easing
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

      fadeInOpacity4:new Animated.Value(0),
      backgroundColor4:new Animated.Value(0),
      left4:new Animated.Value(0)
    };
  }

  componentDidMount() {
    //scale Animation
    this.state.bounceValue1.setValue(1.5)
    Animated.spring(this.state.bounceValue1,{
      toValue:0.8,
      friction:1,}).start(()=>{
        console.log('finish1')
      })

    //opacity Animation
    this.state.fadeInOpacity2.setValue(0)
    Animated.timing(this.state.fadeInOpacity2,{
      toValue:1,
      duration:1500,
      easing:Easing.linear
    }).start()

    //parallel Animation
    Animated.parallel(['fadeInOpacity3','fontSize3','rotation3'].map(property => {

      return Animated.timing(this.state[property],{
        toValue:1,
        duration:2000
      })

    })).start()

    //sequence Animation
    Animated.sequence([
      Animated.timing(this.state.fadeInOpacity4,{
        toValue:1,
        duration:2000
      }),
      Animated.timing(this.state.backgroundColor4,{
        toValue:1,
        duration:2000
      }),
      Animated.timing(this.state.left4,{
        toValue:1,
        duration:2000
      })
    ]).start(() => {
      console.log('finish4')
    })

  }

  render() {
    return (
      <View style={styles.container}>

        <Animated.View
          style={{marginTop:60,width:100,height:100,backgroundColor:'red',transform:[{scale:this.state.bounceValue1}]}}
        />
        <Animated.Text style={{marginTop:20,fontSize:25,color:'black',opacity:this.state.fadeInOpacity2}}>文字淡出</Animated.Text>
        
        <Animated.Text 
        style={{
          marginTop:20,
          color:'black',
          opacity:this.state.fadeInOpacity3,
          fontSize:this.state.fontSize3.interpolate({
            inputRange:[0,1],
            outputRange:[12,26]
          }),
          transform:[{rotateZ:this.state.rotation3.interpolate({
            inputRange:[0,1],
            outputRange:['0deg','360deg']
          })
        }]
          }}>组合动画
        </Animated.Text>

        <Animated.View 
        style={{
          marginTop:20,
          width:100,
          height:100,
          opacity:this.state.fadeInOpacity4,
          backgroundColor:this.state.backgroundColor4.interpolate({
            inputRange:[0,1],
            outputRange:['yellow','blue']
          }),
          left:this.state.left4.interpolate({
            inputRange:[0,1],
            outputRange:[0,100]
          })
        }}></Animated.View>

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
