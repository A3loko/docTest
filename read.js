var textract = require('textract');
var natural = require('natural');
var fs = require('fs');
var readme;
var perfect;
var arr;
var key;

function read() {
	var readme;
	textract.fromFileWithPath('Anish_htmlCss960.docx', function (error, text) {
		if (error) {
			console.log("Error");
		} else {
			readme = text;
		}
		var tokenizer = new natural.WordTokenizer();
		arr = tokenizer.tokenize(readme);
	})
	var perfect;
	textract.fromFileWithPath('Lokesh_HTML,CSS,960 Grid.docx', function (error, text) {
		if (error) {
			console.log("Error");
		} else {
			perfect = text;
		}
		var tokenizer = new natural.WordTokenizer();
		key = tokenizer.tokenize(perfect);
	})
	setTimeout(function(){length(arr, key);},2000);
}

function length(arr, key) {
	console.log(arr.length);
	console.log(key.length);
	var per_len = key.length;
	var range = (per_len*20)/100;
	console.log(range);
	if((per_len - range) <= arr.length && arr.length <= (per_len + range))
		compare(arr,key);
	else
		console.log("Error");
}

function compare(arr,key){
	
}

read();