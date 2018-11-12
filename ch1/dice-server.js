const http = require('http')
const ctype = { 'Content-Type': 'text/html;charset=utf-8' }

const svr = http.createServer(handler)
svr.listen(8081)

function handler (req, res) {
  // URLの判断
  const url = req.url
  // トップページか？
  if (url === '/' || url === '/index.html') {
    showIndexPage(req, res)
    return
  }
  // サイコロページか？
  if (url.substr(0, 6) === '/dice/') {
    showDicePage(req, res)
    return
  }
  // その他
  res.writeHead(404, ctype)
  res.end('404 not found')
}

// インデックスページにアクセスがあったとき
function showIndexPage (req, res) {
  // HTTPヘッダーを出力
  res.writeHead(200, ctype)
  // レスポンスの本体を出力
  const html = '<h1>サイコロページの案内</h1>\n' +
    '<p><a href="/dice/6">6面体のサイコロ</a></p>' +
    '<p><a href="/dice/12">12面体のサイコロ</a></p>'
  res.end(html)
}

// サイコロページにアクセスがあったとき
function showDicePage (req, res) {
  // HTTPヘッダーを出力
  res.writeHead(200, ctype)
  // 何面体のサイコロが必要？
  const a = req.url.split('/')
  const num = parseInt(a[2])
  // 乱数を生成
  const rnd = Math.floor(Math.random() * num) + 1
  // レスポンスの本体を出力
  res.end('<p style="font-size:72px;">' + rnd + '</p>')
}
