const { Match } = require('./simulation');
/**************************************
 * Use 'npm start' to run this program
 *************************************/
const match = new Match(40, 4);
match.startTheMatch();
console.log('----------Match Summary------------')
console.log(match.getResult());
console.log('----------Individual Scores------------')
console.log(match.getBatsMenIndividualScore());
console.log('----------Commentary------------')
console.log(match.getCommentary());

