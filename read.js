//Headers to import required libraries
var fs = require('fs');
var natural = require('natural');
var tokenizer = new natural.WordTokenizer();
var WordPOS = require('wordpos'),
wordpos = new WordPOS();

//Document to be compare
var evalDocument = fs.readFileSync('toCompare.txt','utf-8');
//perfect document
var standardDocument = fs.readFileSync('perfect.txt','utf-8');

//Tokenizing both the documents
var standardTokens = tokenizer.tokenize(standardDocument);
var evalTokens = tokenizer.tokenize(evalDocument);
//setting word count range based on number of words in perfect document
var range = (standardTokens.length*20)/100
//evaluating the length of both documents
var standardLength = standardTokens.length;
var evalLength = evalTokens.length;

if(evalLength <= standardLength-range || evalLength >= standardLength+range){
  console.log("Word count not in the specified range");
    return;
}

//global variables
var evalNouns;
var standardNouns;
var similarNouns = [];
//Extracting nouns from both documents
wordpos.getNouns(evalDocument, function(result){
  evalNouns = result;
  
  wordpos.getNouns(standardDocument, function(output){
    standardNouns = output;
    compare();
    })
});

//Noun comparision
function compare(){
  var corpus = standardNouns;
  var spellcheck = new natural.Spellcheck(corpus);
  for(let i = 0; i < evalNouns.length; i++){
    if(spellcheck.isCorrect(evalNouns[i])){
        similarNouns.push(evalNouns[i]);
    }
}   
    end();
} 

//Creating JSON file
 function end(){
    var score = {
      Standard : 
        {
          wordCount : standardLength,
          nouns : standardNouns.length
        }, 

      Eval : 
        {
          wordCount : evalLength,
          nouns : evalNouns.length,
          commonNouns : similarNouns.length
        }
    }
  var json = JSON.stringify(score, null, 2);
  fs.writeFileSync('output.json',json)
     console.log(score);
 }
