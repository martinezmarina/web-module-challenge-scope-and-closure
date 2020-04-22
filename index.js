// ⭐️ Example Challenge START ⭐️

/**
 * ### Challenge `processFirstItem`
 * 
 * @instructions
 * Implement a higher-order function called `processFirstItem`.
 * It takes two arguments:
 * @param stringList an array of strings.
 * @param callback function that takes a string as its argument.
 * @returns the result of invoking `callback` with the FIRST element in `stringList`.
 * 
 * Example of usage of this higher-order function:
 * Invoking `processFirstItem` passing `['foo', 'bar']` and `(str) => str + str`,
 * should return 'foofoo'.
*/
function processFirstItem(stringList, callback) {
  return callback(stringList[0])
}

// ⭐️ Example Challenge END ⭐️


///// M V P ///////

/* Task 1: `counterMaker`
 * Study the code for counter1 and counter2. Answer the questions below.
 * 
 * 1. What is the difference between counter1 and counter2?
 *  
 *    Counter1 has a function within another function. 
 * 
 * 2. Which of the two uses a closure? How can you tell?
 * 
 *    counter1 uses closure, because the variable count cannot escape the function counterMaker, but the anonymous 
 *    inner function has accessability to that variable.
 * 
 * 3. In what scenario would the counter1 code be preferable? In what scenario would counter2 be better? 
 *
 *    counter1 is useful if you would like to keep the variables exclusive to the function, it cannot be used
 *    anywhere else, however with counter2 the opposite might be helpful where multiple funtions can access the 
 *    count variable since it's in the global scope.
*/

// counter1 code
function counterMaker() {
  let count = 0;
  return function counter() {
    count++;
  }
}

const counter1 = counterMaker();

// counter2 code
let count = 0;

function counter2() {
  return count++;
}


/* Task 2: inning() 

Write a function called `inning` that generates a random number of points that a team scored in an inning. 
This should be a whole number between 0 and 2. */

function inning(){

  let points = Math.floor(Math.random()*3);
  return  points;

}
console.log(inning());

/* Task 3: finalScore()

Write a higher order function called `finalScore` that accepts the callback function `inning` (from above) 
and a number of innings and and returns the final score of the game in the form of an object.

For example, 

finalScore(inning, 9) might return: 
{
  "Home": 11,
  "Away": 5,
}

*/ 
//  let homeTeamScore = 0;
//  let awayTeamScore = 0;

// function finalScore(pointsPerInning, inningNumber){ 
 
//     for(let i = 0; i < inningNumber; i++){ 
//     homeTeamScore += pointsPerInning();
//     awayTeamScore += pointsPerInning();
    
//   }
//   let teamScores =  {
//     Home : homeTeamScore,
//     Away : awayTeamScore,
//   };
//   return teamScores;
//  }
 
//  console.log(finalScore(inning, 9));
function finalScore(pointsPerInning, inningNumber){

  const teamScores = [];
  
  for(let i = 0; i < inningNumber; i++){
    teamScores.push({Home : pointsPerInning(), Away : pointsPerInning()});
  } 

  return function addedScores(upTo){
    let homeTeamScore = 0;
    let awayTeamScore = 0;
    for(let i = 0; i < upTo; i++){ 
      homeTeamScore += teamScores[i].Home;
      awayTeamScore += teamScores[i].Away;
    }
    let results =  {
      Home : homeTeamScore,
      Away : awayTeamScore,
    };
    return results;
  }
}
 
 console.log(finalScore(inning, 9)());

/* Task 4: 

Create a function called `scoreboard` that accepts the following parameters: 

(1) Callback function `getInningScore`
(2) Callback function `inning`
(2) A number of innings

and returns the score at each pont in the game, like so:

1st inning: awayTeam - homeTeam
2nd inning: awayTeam - homeTeam
3rd inning: awayTeam - homeTeam
4th inning: awayTeam - homeTeam
5th inning: awayTeam - homeTeam
6th inning: awayTeam - homeTeam
7th inning: awayTeam - homeTeam
8th inning: awayTeam - homeTeam
9th inning: awayTeam - homeTeam

Final Score: awayTeam - homeTeam */



function scoreboard(cbInningScore, cbInning, inningNum) {

  let addedScores = cbInningScore(cbInning, inningNum);
  for(let i = 1; i <= inningNum; i++) {
    let teamScores = addedScores(i);
    console.log(`Inning ${i} : Home - ${teamScores.Home} vs ${teamScores.Away} - Away`);
    if (i === inningNum) {
      console.log(`Final Score : Home - ${teamScores.Home} vs ${teamScores.Away} - Away`);
    }
  }
}
scoreboard(finalScore, inning, 8);

