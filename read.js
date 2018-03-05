//Headers to import required libraries
var fs = require('fs');
var natural = require('natural');
var tokenizer = new natural.WordTokenizer();
var path=require("path");
var perfetDoc="perfect.txt";
var imperfectDoc="toCompare.txt";
var length=20;

//global variables
var similarNouns = [];
var evalNouns=[];
var standardNouns=[];
var base_folder = path.join(path.dirname(require.resolve("natural")), "brill_pos_tagger");
var rulesFilename = base_folder + "/data/English/tr_from_posjs.txt";
var lexiconFilename = base_folder + "/data/English/lexicon_from_posjs.json";
var defaultCategory = 'N';
 
var lexicon = new natural.Lexicon(lexiconFilename, defaultCategory);
var rules = new natural.RuleSet(rulesFilename);
var tagger = new natural.BrillPOSTagger(lexicon, rules);


//Document to be compare
var evalDocument = fs.readFileSync(imperfectDoc,'utf-8');
//perfect document
var standardDocument = fs.readFileSync(perfetDoc,'utf-8');

//Tokenizing both the documents
var standardTokens = tokenizer.tokenize(standardDocument);
var evalTokens = tokenizer.tokenize(evalDocument);
//setting word count range based on number of words in perfect document
var range = (standardTokens.length*length)/100
//evaluating the length of both documents
var standardLength = standardTokens.length;
var evalLength = evalTokens.length;

if(evalLength <= standardLength-range || evalLength >= standardLength+range){
  console.log("Word count not in the specified range");
    return;
}
else{
	getNoun(standardTokens,standardNouns);
	getNoun(evalTokens,evalNouns);
			compare();

}

//Extracting nouns from both documents
function getNoun(document,addNoun){
	var documentTagged = tagger.tag(document);
  
	
	for(var i=0; i < documentTagged.length; i++){ 
    //Extracting nouns from document
    if(documentTagged[i][1] == "NN"|"NNS"|"NNP"|"NNPS")
      addNoun.push(documentTagged[i][0]);
	}	
}

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
