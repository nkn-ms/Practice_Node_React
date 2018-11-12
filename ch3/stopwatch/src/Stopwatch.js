import React, { Component } from 'react'
import './Stopwatch.css'

// Stopwatchコンポーネントを定義
class Stopwatch extends Component {
  constructor (props) {
    super(props)
    this.state = { // 初期設定
      isLive: false,
      curTime: 0,
      startTime: 0
    }
    this.timerId = 0
  }
  // マウントしたとき
  componentWillMount () {
    // this.timerId = setInterval(e => {
    //   this.tick()
    // }, 1000)
  }
  // アンマウントしたとき
  componentWillUnMount () {
    console.log('componentWillUnMount()')
    // clearInterval(this.timerId)
  }
  // 毎秒実行される
  tick () {
    console.log('tick ()')
    if (this.state.isLive) {
      const v = new Date().getTime()
      this.setState({ curTime: v })
    }
  }
  // 開始・停止ボタンを押したとき
  clickHandler (e) {
    console.log('clickHandler (e)')
    // 停止するとき
    if (this.state.isLive) {
      this.setState({ isLive: false })
      clearInterval(this.timerId)
      return
    }
    // 開始するとき
    this.timerId = setInterval(e => {
      this.tick()
    }, 1000)
    const v = new Date().getTime()
    this.setState({
      curTime: v,
      startTime: v,
      isLive: true
    })
  }
  // 時刻表示ディスプレイを返す
  getDisp () {
    console.log('getDisp()')
    const s = this.state
    const delta = s.curTime - s.startTime
    const t = Math.floor(delta / 1000)
    const ss = t % 60
    const m = Math.floor(t / 60)
    const mm = m % 60
    const hh = Math.floor(mm / 60)
    const z = (num) => {
      const s = '00' + String(num)
      return s.substr(s.length - 2, 2)
    }
    return (
      <span className='disp'>
        {z(hh)}:{z(mm)}:{z(ss)}
      </span>)
  }
  // 画面描画
  render () {
    let label = 'START'
    if (this.state.isLive) {
      label = 'STOP'
    }
    const disp = this.getDisp()
    const fclick = (e) => this.clickHandler(e)
    return (
      <div className='Stopwatch'>
        <div>{disp}</div>
        <button onClick={fclick}>{label}</button>
      </div>
    )
  }
}

export default Stopwatch
