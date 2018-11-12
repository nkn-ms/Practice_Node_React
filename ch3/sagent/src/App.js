import React, { Component } from 'react'
import './App.css'
import request from 'superagent'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      items: null // 読み込んだデータ保存用
    }
  }
  // マウントされるとき
  componentWillMount () {
    // JSONデータを読み込む
    request.get('./fruits.json')
      .accept('application/json')
      .end((err, res) => {
        this.loadedJSON(err, res)
      })
  }
  // データを読み込んだとき
  loadedJSON (err, res) {
    if (err) {
      console.log('JSON読み込みエラー')
      return
    }
    console.log(res)
    console.log(res.body)
    // 状態を更新
    this.setState({
      items: res.body
    })
  }
  render () {
    // JSONデータの読み込みが完了してるか？
    if (!this.state.items) {
      return <div className='App'>現在読み込み中</div>
    }
    // 読み込んだデータからselect要素を作る
    const options = this.state.items.map(e => {
      return <option value={e.price} key={e.name}>{e.name}</option>
    })
    return (
      <div className='App'>
          果物: <select>{options}</select>
      </div>
    )
  }
}

export default App
