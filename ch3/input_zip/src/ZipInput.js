import React, { Component } from 'react'

// 郵便番号を入力するコンポーネント
export default class ZipInput extends Component {
  constructor (props) {
    super(props)
    const v = (this.props.value) ? this.props.value : ''
    // 状態を初期化
    this.state = {
      value: v,
      isOK: this.checkValue(v)
    }
  }
  // パターンに合致するかチェック
  checkValue (s) {
    const zipPattern = /^\d{3}-\d{4}$/
    return zipPattern.test(s)
  }
  // 値がユーザーにより変更されたとき
  handleChange (e) {
    console.log('handleChange(e)')
    console.log(this)
    console.log(e)
    console.log(e.target)
    console.log(e.value)
    const v = e.target.value
    const newValue = v.replace(/[^0-9-]+g/, '')
    const newIsOK = this.checkValue(newValue)
    // 状態に設定
    this.setState({
      value: newValue,
      isOK: newIsOK
    })
    // イベントを実行する
    if (this.props.onChange) {
      this.props.onChange(e)
    }
  }
  // プロパティが変更されたとき
  componentWillReceiveProps (nextProps) {
    console.log('componentWillReceiveProps')
    // this.setState({
    //   value: nextProps.value,
    //   isOK: this.checkValue(nextProps.value)
    // })
  }
  // 描画
  render () {
    console.log('render()')
    const msg = this.renderStatusMessage()
    return (
      <div>
        <label>郵便番号: <br />
          <input type='text' placeholder='郵便番号を入力'
            value={this.state.value} onChange={e => this.handleChange(e)} />
          {msg}
        </label>
      </div>
    )
  }
  // 入力が正しいかどうかのメッセージ
  renderStatusMessage () {
    // メッセージ表示用の基本的なStyle
    const so = {
      margin: '8px',
      padding: '8px',
      color: 'white'
    }
    let msg = null
    if (this.state.isOK) {
      so.backgroundColor = 'green'
      msg = <span style={so}>OK</span>
    } else { // NGのとき (ただし空白の時は非表示)
      if (this.state.value !== '') {
        so.backgroundColor = 'red'
        msg = <span style={so}>NG</span>
      }
    }
    return msg
  }
}
