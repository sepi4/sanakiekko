// letter info from http://jkorpela.fi/kielikello/kirjtil.html
// kirjakielen
function newRandomLetters(letterCount) {
  let letterArr = []
  const arr = [
    ['a', 11.9],
    ['i', 10.64],
    ['t', 9.77],
    ['n', 8.67],
    ['e', 8.21],
    ['s', 7.85],
    ['l', 5.68],
    ['k', 5.34],
    ['o', 5.24],
    ['u', 5.06],
    ['ä', 4.59],
    ['m', 3.3],
    ['v', 2.52],
    ['r', 2.32],
    ['j', 1.91],
    ['h', 1.83],
    ['y', 1.79],
    ['p', 1.74],
    ['d', 0.85],
    ['ö', 0.49],
    ['g', 0.13],
    ['b', 0.06],
    ['f', 0.06],
    ['c', 0.04],
    ['w', 0.01],
    ['å', 0.0],
    ['q', 0.0],
  ]

  for (let a = 0; a < letterCount; a++) {
    let randomNum = Math.random() * 100
    let sum = 0
    // console.log(randomNum)
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i][1]
      // console.log(randomNum, sum)
      if (randomNum < sum) {
        letterArr.push(arr[i][0])
        break
      }
    }
  }
  return letterArr
}

module.exports = {
  newRandomLetters,
}
