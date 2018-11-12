var gen = (function * () {
  console.log(1)
  yield 1
  yield 2
  yield 3
})()
for (let o of gen) {
  console.log(o)
}

// The generator should not be re-used, the following does not make sense!
for (let o of gen) {
  console.log(2)
  console.log(o) // Never called.
}
