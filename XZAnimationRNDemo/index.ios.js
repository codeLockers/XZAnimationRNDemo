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
  Easing,
  PanResponder,
} from 'react-native';

export default class XZAnimationRNDemo extends Component {

  _panResponder:PanResponder

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
      left4:new Animated.Value(0),

      backgroundColor5:new Animated.Value(0),
      left5:new Animated.Value(0),

      left6:new Animated.Value(0),

      tranlate7:new Animated.ValueXY()
    };
  }

  _startAnimation(){
    this.state.bounceValue1.setValue(1.5)
    Animated.spring(this.state.bounceValue1,{
      toValue:0.8,
      friction:1,}).start(() => this._startAnimation())
  }

  componentWillMount() {
    //手势
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder:(evt,gestureState) => true,
      onStartShouldSetPanResponderCapture:(evt,gestureState) => true,
      onMoveShouldSetPanResponder:(evt,gestureState) => true,
      onMoveShouldSetPanResponderCapture:(evt,gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
        // console.log('Grant')
        // console.log(evt.nativeEvent.locationX)
        // console.log(evt.nativeEvent.locationY)
        // console.log(gestureState.moveX)
        // console.log(gestureState.moveY)
      },
      // onPanResponderMove: (evt, gestureState) => {
        // 最近一次的移动距离为gestureState.move{X,Y}

        // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
        // console.log('move')
        // console.log(evt.nativeEvent.locationX)
        // console.log(evt.nativeEvent.locationY)
        // console.log(gestureState.moveX)
        // console.log(gestureState.moveY)
      // },
      onPanResponderMove: Animated.event(
          [null,{dx:this.state.tranlate7.x,dy:this.state.tranlate7.y}]
        ),
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
        // 一般来说这意味着一个手势操作已经成功完成。
        console.log('Release')
        Animated.spring(this.state.tranlate7,{
          toValue:{x:0,y:0}
        }).start()
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
        console.log('Terminate')
        Animated.spring(this.state.tranlate7,{
          toValue:{x:0,y:0}
        }).start()
      },
    })
  }

  componentDidMount() {
    //scale Animation
    this._startAnimation()

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
      Animated.delay(1000),
      Animated.timing(this.state.left4,{
        toValue:1,
        duration:2000
      })
    ]).start(() => {
    })

    //stagger Animation
    Animated.stagger(5000,[
      Animated.timing(this.state.left5,{
        toValue:1,
        duration:2000
      }),
      Animated.timing(this.state.backgroundColor5,{
        toValue:1,
        duration:2000
      })
      ]).start()

    //跟踪动态值
    Animated.timing(this.state.left6,{
      toValue:this.state.left5.interpolate({
        inputRange:[0,1],
        outputRange:[0,50]
      }),
      duration:0
    }).start(() => {
      // console.log(this.state.left6)
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
          height:50,
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

        <Animated.View
        style={{
          marginTop:20,
          width:100,
          height:50,
          backgroundColor:this.state.backgroundColor5.interpolate({
            inputRange:[0,1],
            outputRange:['black','green'] 
          }),
          left:this.state.left5.interpolate({
            inputRange:[0,1],
            outputRange:[0,100]
          }),
          }}></Animated.View>

          <Animated.View
          style={{
            marginTop:20,
            backgroundColor:'purple',
            width:100,
            height:50,
            left:this.state.left6
          }}>
          </Animated.View>
          <Animated.View
          style={{
            marginTop:20,
            width:100,
            height:50,
            backgroundColor:'gray',
            transform:[
              {translateX:this.state.tranlate7.x},
              {translateY:this.state.tranlate7.y}
            ]
          }}
          {...this._panResponder.panHandlers}>
          </Animated.View>
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
