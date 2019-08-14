const input = [];
 
const RL = require('readline').createInterface({
   input : process.stdin,
   output : process.stdout
});

RL.on('line', (line) => {
    input.push(line);
});

RL.on('close', () => {
    const n = parseInt(input[0], 10);
    const str = input[1];

    let answer = ''; let mode = (str.length % 2 === 0) ? 1 : 0; 
    for(let i = 0; i < n; i += 1) {
        if(mode && i !== 0){
            answer = str.charAt(i) + answer;
            mode = !mode;
        } else if (!mode  && i !== 0) {
            answer += str.charAt(i);
            mode = !mode;
        } else if(i === 0) {
            answer = str.charAt(0);
        } 
    }
    global.console.log(answer.split("").reverse().join(""));
});

