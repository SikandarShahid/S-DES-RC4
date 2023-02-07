// USE REDUCER:

const numbersArray = [10,20,30]

let total = 0;
for (const i of numbersArray) {
    total += i
}

console.log(total)


let newTotal = numbersArray.reduce((cv, n) => {
  console.log("cv", cv, "n", n)
  return cv + n
} ,0)
console.log(newTotal)



// USE STATE

function getState() {
    let value = 10
    return [value]
}


let [myValue] = getState();
myValue = 30
console.log(myValue)


let [myValueAgain] = getState();
console.log(myValueAgain)

