import React, { Component } from 'react'
import ValueInput from './ValueInput'

// インチセンチの変換コンポーネント
export default class InchToCm extends Component {
  constructor (props) {
    console.log('InchToCm')
    super(props)
    console.log(this)
    // ValueInputに表示する値を状態として保持
    this.state = {
      inch: 0, cm: 0
    }
  }
  // インチが変更されたとき
  inchChanged (e) {
    console.log('inchChanged(e)')
    console.log(this)
    console.log(e)
    const inchValue = e.value
    const cmValue = inchValue * 0.393701
    this.setState({
      inch: inchValue,
      cm: cmValue
    })
    // this.props.pro_test = 'proInch'
  }
  // センチが変更されたとき
  cmChanged (e) {
    console.log('cmChanged(e)')
    console.log(this)
    console.log(e)
    const cmValue = e.value
    const inchValue = cmValue * 2.54
    this.setState({
      inch: inchValue,
      cm: cmValue
    })
    // this.props.pro_test = 'proCm'
  }
  //
  propChange (e) {
    console.log('propChange()')
    console.log(e)
    this.props.pro_test = 'changed'
    console.log(this)
  }

  // プロパティが変更されたとき ※なぜか呼ばれない→親要素から変更されると呼ばれる。
  componentWillReceiveProps (nextProps) {
    console.log('InchToCm_componentWillReceiveProps')
    console.log(nextProps)
  }
  // 画面の描画
  render () {
    console.log('InchToCm_render')
    return (
      <div>
        <ValueInput title='inch' onChange={e => this.inchChanged(e)} value={this.state.inch} />
        <ValueInput title='cm' onChange={e => this.cmChanged(e)} value={this.state.cm} />
        <button name='aaa' value='propchange' onClick={e => this.propChange(e)}>propchange</button>
      </div>
    )
  }
}
