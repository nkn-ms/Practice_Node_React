import React from 'react'
import ReactDOM from 'react-dom'

export class TextAreaForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = { value: 'Hello' }
  }
  render () {
    // フォームにテキストエリアを指定
    return (
      <div>
        <form onSubmit={e => this.doSubmit(e)}>
          <textarea
            onChange={e => this.doChange(e)}
            value={this.state.value} />
          <br />
          <input type='submit' value='決定' />
        </form>
      </div>
    )
  }
  // チェックボックスをクリックしたとき
  doChange (e) {
    this.setState({ value: e.target.value })
  }
  // フォームを送信したとき
  doSubmit (e) {
    e.preventDefault()
    window.alert(this.state.value)
  }
}

ReactDOM.render(
  <TextAreaForm />,
  document.getElementById('root')
)
