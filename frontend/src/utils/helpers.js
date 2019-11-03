export function subSet(arr1, arr2) {
  // console.log(smallArr)
  // console.log(bigArr)
  let smallArr = arr1.slice()
  let bigArr = arr2.slice()

  for (var x of smallArr) {
    let found;
    for (let i = 0; i < bigArr.length; i++) {
      if (x === bigArr[i]) {
        found = bigArr[i]
        bigArr.splice(i, 1)
        break
      }
    }
    if (!found) {
      return false
    }
  }
  return true
}
