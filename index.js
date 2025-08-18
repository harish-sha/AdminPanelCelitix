// var largestGoodInteger = function (num) {
//   let largestNumber = num.slice(0, 3);
//   for (let i = 0; i < num.length; i++) {
//     if (num[i] == num[i + 1] && num[i] === num[i + 2]) {
//       if (number > largestNumber) {
//         largestNumber = number;
//       }
//     }

//   }
//   console.log("num.length", largestNumber);
//   return largestNumber;
// };

// console.log(largestGoodInteger("42352338"));

var addTwoNumbers = function (l1, l2) {
  const sum = Number(l1.join("")) + Number(l2.join(""));
  return sum.toString().split("");
};

const l1 = [9, 9, 9, 9, 9, 9, 9];
const l2 = [9, 9, 9, 9];

console.log(addTwoNumbers(l1, l2));
