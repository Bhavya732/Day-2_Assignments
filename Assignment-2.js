//Task 1


const prompt = require("prompt-sync")();


let input = prompt("Enter a list of items separated by commas:");
let array = input.split(",").map(numStr => parseFloat(numStr.trim()));
console.log(array);

let output=array.map(a=>a**3);
console.log("Cube of array is: " , output);

//Task 2

let output2 = array.reduce((acc,a)=>acc + a,0);
console.log("Total Sum of array is :",output2);

//Task 3

function isPrime(num){

    if(num==0 || num==1)
        return false;
    else if(num==2)
        return true;
    else{

        for(let i=2;i<num;i++){
            if(num%i==0){
        
                return false;
            }
        }

        return true;

    }
}
let output3= array.filter(a=>isPrime(a));
console.log("Prime numbers is array are:",output3);


//Task 4

function isOdd(num){
    if(num%2==0)
        return false;
    return true;
}
let output41 = array.filter(a=>isOdd(a));
let output42 = output41.map(a1=>a1**2);

let output43 = output42.reduce((acc,a2)=> acc + a2, 0);
let output4 = output43/output42.length;


console.log("Avg of sqaured odd numbers in array is: ",output4);

//Task 5

let input2 = prompt("Enter a list of items separated by commas:");
let array2 = input2.split(",")
console.log(array2);
let output51 = array2.map(str => str.length);
let output52 = output51.reduce((max, length) => Math.max(max, length), 0);

let output5 = array2.filter(str => str.length === output52);

console.log(output5);


//Task 6
let sentence=prompt("Enter sentence");
let words = sentence.split(" ");
    
let capitalizedWords = words.map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
});

let capitalizedSentence = capitalizedWords.join(" ");

console.log("capitalized Sentence: ",capitalizedSentence);

//Task 7

let students=[{name:"bhavya",score:50},{name:"vishwa",score:62},{name:"ishwa",score:90}];

let result=students.filter(s=>s.score>60);

console.log("Passed Students:",result);





//Task 8


const createInstanceCounter = () => {
    let count = 0; 
    return () => {
        count++; 
        return count; 
    };
};

const counter1 = createInstanceCounter();
const counter2 = createInstanceCounter();


console.log(counter1());
console.log(counter1());
console.log(counter2()); 
console.log(counter2());



//Task 9


let numbers = prompt("Enter 2 numbers separated by commas: ");
let nums = numbers.split(",").map(numStr => parseFloat(numStr.trim()));

let opr = prompt("Enter Operator: ");


let calculate = (time, callback) => {
    return new Promise((resolve, reject) => {
        if (opr === "+" || opr === "-" || opr === "*" || opr === "/") {
            setTimeout(() => {
                try {
                    resolve(callback());
                } catch (error) {
                    reject(error.message);
                }
            }, time);
        } else {
            reject("Not a valid operator");
        }
    });
};




calculate(2000,()=>console.log(`${opr} was selected`))
.then (()=>{

    if(opr=="+")
    return calculate(1000,()=>console.log(`Addition of ${nums[0]} and ${nums[1]} is `,nums[0]+nums[1]))
})
.then (()=>{
    if(opr=="-")
        return calculate(1000,()=>console.log(`Subtraction of ${nums[0]} and ${nums[1]} is `,nums[0]-nums[1]))
})
.then (()=>{
    if(opr=="*")
        return calculate(1000,()=>console.log(`Multiplication of ${nums[0]} and ${nums[1]} is `,nums[0]*nums[1]))
})
.then(() => {
    if (opr === "/") {
        return calculate(1000, () => {
            if (nums[1] === 0) {
                throw new Error("Division by zero error");
            } else {
                console.log(`Division of ${nums[0]} and ${nums[1]} is `, nums[0] / nums[1]);
            }
        });
    }
})
.catch(error => {
    console.error("Error:", error);
});




//Task 10

let objects = [
    { score: 10 },
    { score: 20 },
    { score: 15 },
    { score: 5 }
];

console.log("Score: ",objects);
let totalscore=0;

objects.forEach(obj=>{
    totalscore+=obj.score;

});

console.log("Totalscore: ",totalscore);



