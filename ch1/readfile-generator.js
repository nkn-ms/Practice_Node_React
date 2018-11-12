const fs = require('fs')

// 非同期処理の完了を待って関数の続きを呼ぶ関数
function read_gfn (g, fname) {
  fs.readFile(fname, 'utf-8', (err, data) => {
    console.log('read_gfn')
    g.next(data)
  })
}

// Generator関数を定義する
const g = (function * () {
  console.log(1)
  const a = yield read_gfn(g, 'a.txt')
  console.log(2)
  console.log(a)
  console.log(3)
  const b = yield read_gfn(g, 'b.txt')
  console.log(4)
  console.log(b)
  console.log(5)
  const c = yield read_gfn(g, 'c.txt')
  console.log(6)
  console.log(c)
  console.log(7)
})()
g.next()
