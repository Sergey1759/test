let PerentObj = function(){
    this.body = document.body;
}
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
Request('exempleIII.txt',Main);

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
        text = text.split('-q-');
        text.splice(0, 1); //delete "-level-I-"
        for(let i = 0;  i < text.length; i++){
            let buf = { id : i, task : '', right : [], answers : []};           
            text[i] = text[i].split('-v-');
            buf.task = text[i][0];
            for(let j = 0; j < text[i].length; j++){
                if(!~text[i][j].indexOf("-t-") && j != 0){
                    buf.answers.push({id : i*10+j+1000, value : text[i][j]});
                }
                    let que_ans = text[i][j].split('-t-');
                        if(que_ans.length == 2){
                            buf.right.push(i*10+j+1000);
                            buf.answers.push({id : i*10+j+1000, value : que_ans[1]});
                        }
                }
             text[i] = buf;
        }
        return text;
    }
    function SeveralOfAll(text){
        return OneOfAll(text);
    }
    function MissingWord(text){
        text = text.split('-q-');
        text.splice(0, 1); //delete "-level-III-"
        for(let i = 0;  i < text.length; i++){
            let buf = { id : i, task : '', answer : ''};    
            text[i] = text[i].split('-t-');
            buf.task = text[i][0] + '......' + text[i][2];
            buf.answer = text[i][1].split(' ');
            buf.answer = buf.answer.join('');
            text[i] = buf;
        }
        return text;
    }
    function WordsAndMeaning(text){
        text = text.split('-task-');
        text.splice(0, 1); //delete "-level-IV-"
        for(let i = 0;  i < text.length; i++){
            let buf = { id : i, task : '', question : [], answers : []};           
            text[i] = text[i].split('-que-');
            buf.task = text[i][0];
                for(let j = 0; j < text[i].length; j++){
                    let que_ans = text[i][j].split('-ans-');
                        if(que_ans.length == 2){
                            buf.question.push({id : i*10+j+1000, value : que_ans[0]});
                            buf.answers.push({id : i*10+j+1000, value : que_ans[1]});
                        }
                }
            text[i] = buf;
        }
        return text;
    }
    
}