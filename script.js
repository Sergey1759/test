
function Request(string,callback){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if(request.readyState === 4) {
        if(request.status === 200) { 
            callback(request.responseText);
        } else {
        } 
      }
    }
    request.open('Get', string);
    request.send();
    
}
Request('exemple.txt',Main);

function Main(text){
    let json = ToJson(text);
    console.log(json);
}

function ToJson(text){
    //selecting function to format
    if(~text.indexOf("-level-I-")) {
        return OneOfAll(text);
    } else if(~text.indexOf("-level-II-")) {
        return SeveralOfAll(text);
    } else if(~text.indexOf("-level-III-")) {
        return MissingWord(text); 
    } else if(~text.indexOf("-level-IV-")) {
        return WordsAndMeaning(text); 
    } // Expansion space
    
    function OneOfAll(text){
        
    }
    function SeveralOfAll(text){
        
    }
    function MissingWord(text){
        
    }
    function WordsAndMeaning(text){
        text = text.split('-task-');
        for(let i = 0;  i < text.length; i++){
            let buf = { id : i, task : '', question : [], answer : []};           
            text[i] = text[i].split('-que-');
            buf.task = text[i][0];
                for(let j = 0; j < text[i].length; j++){
                    let que_ans = text[i][j].split('-ans-');
                        if(que_ans.length == 2){
                            buf.question.push({id : i*10+j+1000, value : que_ans[0]});
                            buf.answer.push({id : i*10+j+1000, value : que_ans[1]});
                        }
                }
            text[i] = buf;
        }
        return text;
    }

}