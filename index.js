function getData(){
  var xmlHttp = new XMLHttpRequest();
  var url = "http://localhost:3000/db";
  xmlHttp.open("GET", url, true);
  xmlHttp.send();
  
  xmlHttp.onreadystatechange = function() { 
      if(this.readyState == 4 && this.status == 200){
        var obj = JSON.parse(this.responseText);
        var btn = document.getElementById('btn');
        //hiding the button after click
        btn.classList.add("hide-me");
        //getting the variables from json file
        var standardNouns = obj.Standard.nouns;
        var standWordCount = obj.Standard.wordCount;
        var evalNouns = obj.Eval.nouns;
        var evalWordCount = obj.Eval.wordCount;
        var commonNouns = obj.Eval.commonNouns;
        var percentage = (commonNouns*100)/standardNouns;
        //html code that needs to be fired on button click
        var html_code = "<p id = \"new_content\">Comparison complete <br><br> <dl id = \"new_content1\"><dt>Perfect Document:</dt><dt>Word Count</dt><dd>"+standWordCount+"</dd><dt>Number of Nouns</dt><dd>"+standardNouns+"</dd><dt>Document to be evaluated :</dt><dt>Word Count</dt><dd>"+evalWordCount+"</dd><dt>Number of Nouns</dt><dd>"+evalNouns+"</dd><dt>Number of nouns common</dt><dd>"+commonNouns+"</dd><dt>Percentage Score</dt><dd>"+percentage+" %</dd></dl></p>";
        //where the content shall be inserted
        document.getElementById('desc').insertAdjacentHTML('afterend', html_code);
    }  
  }
}

