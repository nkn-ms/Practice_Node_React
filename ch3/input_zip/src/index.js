import React from 'react'
import ReactDOM from 'react-dom'
// import ZipInput from './ZipInput'
import FormInput from './FormInput'

class CustomForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      tel: '',
      url: '',
      allok: false
    }
    this.oks = {}
  }
  handleChange (e) {
    console.log('handleChange(e) CustomForm')
    console.log(e)
    console.log(this)
    // すべての項目がOKになったか?
    this.oks[e.name] = e.isOK
    this.setState({
      [e.name]: e.value,
      allok: (this.oks['email'] && this.oks['tel'] && this.oks['url'])
    })
  }
  handleSubmit (e) {
    window.alert(JSON.stringify(this.state))
    e.preventDefault()
  }
  render () {
    const doChange = e => this.handleChange(e)
    const doSubmit = e => this.handleSubmit(e)
    // Eメールを表すパターン
    const emailPat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    // ASCII文字以外全部
    const asciiFilter = /[^\u0020-\u007e]+/g
    // telcheck
    const telPat = /^[0-9-()+]+$/
    const telFilter = /[^0-9-()+]/g
    // URLを表すパターン
    const urlPat = /^https?(:\/\/[-_.!~*'()a-zA-Z0-9;/?:@&=+$,%#]+)$/
    return (
      <form onSubmit={doSubmit}>
        <FormInput name='tel' label='電話番号'
          value={this.state.tel}
          filter={telFilter}
          pattern={telPat}
          onChange={doChange} />
        <FormInput name='email' label='メール'
          value={this.state.email}
          filter={asciiFilter}
          pattern={emailPat}
          onChange={doChange} />
        <FormInput name='url' label='URL'
          value={this.state.url}
          filter={asciiFilter}
          pattern={urlPat}
          onChange={doChange} />
        <input type='submit' value='送信' disabled={!this.state.allok} />
      </form>

    )
  }
}
ReactDOM.render(<CustomForm />, document.getElementById('root'))
