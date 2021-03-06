import React, { Component } from 'react'
import PropTypes from 'prop-types'

// 汎用的な入力コンポーネント
export default class FormInput extends Component {
  constructor (props) {
    super(props)
    console.log('constructor FormInput')
    const v = this.props.value
    this.state = {
      value: v,
      isOK: this.checkValue(v)
    }
  }
  // パターンに合致するかチェック
  checkValue (s) {
    console.log('checkValue')
    if (this.props.pattern === null) {
      return true
    }
    console.log('this.props.pattern.test(s)')
    return this.props.pattern.test(s)
  }
  // 値がユーザーにより変更されたとき
  handleChange (e) {
    console.log('handleChange(e) FormInput')
    console.log(this)
    console.log(e)
    console.log(e.target)
    const v = e.target.value
    // フィルタが指定されていればフィルタを適用
    const filter = this.props.filter
    let newValue = v
    if (filter !== null) {
      newValue = newValue.replace(filter, '')
    }
    const newIsOK = this.checkValue(newValue)
    // 状態を更新
    this.setState({
      value: newValue,
      isOK: newIsOK
    })
    // イベントを実行する
    if (this.props.onChange) {
      this.props.onChange({
        // target: this,
        value: newValue,
        isOK: newIsOK,
        name: this.props.name
      })
    }
  }
  // プロパティが変更されたとき
  componentWillReceiveProps (nextProps) {
    console.log('componentWillReceiveProps')
    console.log(nextProps)
    this.setState({
      value: nextProps.value,
      isOK: this.checkValue(nextProps.value)
    })
  }
  // 描画
  render () {
    console.log('render() FormInput')
    const msg = this.renderStatusMessage()
    return (
      <div>
        <label>{this.props.label}: <br />
          <input type='text' name={this.props.name}
            placeholder={this.props.placeholder}
            value={this.state.value}
            onChange={e => this.handleChange(e)} />
          {msg}
        </label>
      </div>
    )
  }
  // 入力が正しいかどうかのメッセージ
  renderStatusMessage () {
    console.log('renderStatusMessage()')
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

// プロパティの型を定義
FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  filter: PropTypes.object,
  pattern: PropTypes.object,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func
}

// プロパティの初期値の定義
FormInput.defaultProps = {
  filter: null,
  pattern: null,
  value: '',
  placeholder: '',
  onChange: null
}
