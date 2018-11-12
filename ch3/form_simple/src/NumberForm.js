import React, { Component } from 'react'

export default class NumberForm extends Component {
  constructor (props) {
    super(props)
    // 状態を初期化
    this.state = { value: '' }
  }
  // 値が変更されたとき
  doChange (e) {
    const curValue = e.target.value
    const newValue = curValue.replace(/[^0-9]/g, '')
    this.setState({ value: newValue })
  }
  // 送信ボタンが押されたとき
  doSubmit (e) {
    window.alert('値を送信: ' + this.state.value)
    e.preventDefault()
  }
  render () {
    // イベントをメソッドにバインド
    const doSubmit = (e) => this.doSubmit(e)
    const doChange = (e) => this.doChange(e)
    return (
      <form onSubmit={doSubmit} >
        <input type='text' value={this.state.value} onChange={doChange} />
        <input type='submit' value='送信' />
      </form>
    )
  }
}
