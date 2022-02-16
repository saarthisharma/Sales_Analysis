const logger = require("./utils/logger")

function palindrome() {
    let inputNumber = 120
    let number = inputNumber
    let reverse_num = 0
    reverse_num = reverse_num*10 + number%10
    number = Math.floor(number / 10)
    reverse_num = reverse_num*10 + number%10
    number = Math.floor(number / 10)
    reverse_num = reverse_num*10 + number%10
    if(inputNumber == reverse_num){
        logger.info("a palindrome number")
    }
    else{
        logger.error("not a palindrome number")
    }
}
palindrome()

