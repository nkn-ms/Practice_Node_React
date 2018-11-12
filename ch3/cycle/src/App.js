import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

class App extends Component {
  // マウント
  constructor (props) {
    super(props)
    this.state = {
      r: Math.random()
    }
    console.log('constructor')
    console.log(this.state)
  }
  componentWillMount () {
    console.log('componentWillMount')
    console.log(this.state)
  }
  componentDidMount () {
    console.log('componentDidMount')
    console.log(this.state)
  }
  // 更新
  componentWillReceiveProps (nextProps) {
    console.log('componentWillReceiveProps')
    console.log(this.state)
  }
  shouldComponentUpdate (nextProps, nextState) {
    console.log('shouldComponentUpdate')
    console.log(this.state)
    return true
  }
  componentWillUpdate () {
    console.log('componentWillUpdate')
    console.log(this.state)
  }
  componentDidUpdate () {
    console.log('componentDidUpdate')
    console.log(this.state)
  }
  // アンマウント
  componentWillUnmount () {
    console.log('componentWillUnmount')
    console.log(this.state)
  }
  render () {
    console.log('render')
    console.log(this.state)
    const setStateHandler = (e) => {
      console.log('* call setState()')
      console.log('before_this.setState()')
      this.setState({ r: Math.random() })
      console.log('after_this.setState()')
    }
    return (
      <div className='App'>
        <button onClick={setStateHandler}>setState</button>
      </div>
    )
  }
}

export default App
