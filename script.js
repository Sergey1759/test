let Obj = function(){
    this.arr = [];
    this.length = 0;
    this.addElement = function addElement(elem){
        this.arr[this.length] = elem;
        this.length++;
    }
    this.rand = function(){
        this.arr = _randomArray(this.arr.length,this.arr.length,this.arr);
    }
}
let Elem = function(elem){
    this.elem = elem;
    let level = this.elem.level;
    if(level == 1){
        this.add = function add(){
            let form = document.createElement('form');
            form.innerHTML = `
            
  <p>${elem.task}</p>
  <div>
    <input type="radio" id="${elem.answers[0].id}"
     name="contact" value="email">
    <label for="${elem.answers[0].id}">${elem.answers[0].value}</label>

    <input type="radio" id="contactChoice2"
     name="contact" value="phone">
    <label for="contactChoice2">Phone</label>

    <input type="radio" id="contactChoice3"
     name="contact" value="mail">
    <label for="contactChoice3">Mail</label>
  </div>
  <div>
    <button type="submit">Submit</button>
  </div>
</form>
`;
            document.body.appendChild(form);
        }
    }
    if(level == 2){
        this.add = function add(){
            let div = document.createElement('div');
            div.innerHTML = elem.task;
            document.body.appendChild(div);
        }
    }
    
}
let count = 0;
document.body.onclick = function(){
    let el = new Elem(array.arr[count++]);
    el.add();
}
let array = new Obj;

function Request(string,callback,kil){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if(request.readyState === 4) {
        if(request.status === 200) { 
            callback(request.responseText,kil);
        } else {
        } 
      }
    }
    request.open('Get', string);
    request.send();
}

four_level();
function getArrrayObjects(text,kil){
    let json = ToJson(text);
    if(kil > json.length){ kil = json.length; 
    alert("kil > json.length")}
    let buf_arr = _randomArray(kil,json.length,json);
    for(let i = 0; i < buf_arr.length; i++){
        array.addElement(buf_arr[i]);
    }
    array.rand();
    console.log(array.arr);
}
function four_level(){
    Request('exempleI.txt',getArrrayObjects,2);
    Request('exempleII.txt',getArrrayObjects,2);
//    Request('exempleII.txt',getArrrayObjects,5);
//    Request('exempleIII.txt',getArrrayObjects,5);
//    Request('exempleIV.txt',getArrrayObjects,5);
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
    function OneOfAll(text,level_II){
        text = text.split('-q-');
        let level = level_II || 1;//refactoring
        text.splice(0, 1); //delete "-level-"
        for(let i = 0;  i < text.length; i++){
            let buf = { id : i, task : '', right : [], answers : [], level : ""}; 
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
            buf.level = level;//refactoring
            text[i] = buf;
        }
        return text;
    }
    function SeveralOfAll(text){
        return OneOfAll(text,2); 
    }
    function MissingWord(text){
        text = text.split('-q-');
        let level = 3;//refactoring
        text.splice(0, 1); //delete "-level-"
        for(let i = 0;  i < text.length; i++){
            let buf = { id : i, task : '', answer : '', level : ''};   
            text[i] = text[i].split('-t-');
            buf.task = text[i][0] + '......' + text[i][2];
            buf.answer = text[i][1].split(' ');
            buf.answer = buf.answer.join('');
            buf.level = level;//refactoring
            text[i] = buf;
        }
        return text;
    }
    function WordsAndMeaning(text){
        text = text.split('-task-');
        let level = 4; //refactoring
        text.splice(0, 1); //delete "-level-"
        for(let i = 0;  i < text.length; i++){
            let buf = { id : i, task : '', question : [], answers : [], level : ''};           
            text[i] = text[i].split('-que-');
            buf.task = text[i][0];
                for(let j = 0; j < text[i].length; j++){
                    let que_ans = text[i][j].split('-ans-');
                        if(que_ans.length == 2){
                            buf.question.push({id : i*10+j+1000, value : que_ans[0]});
                            buf.answers.push({id : i*10+j+1000, value : que_ans[1]});
                        }
                }
        buf.level = level;//refactoring
        text[i] = buf;
        }
        return text;
    }   
}

function _randomArray(count,max,arr){
var mas1 = [];
var i = 0;
while( i < count){
  var num = Math.floor(Math.random() * (max - 1 + 1));
  if(arr[num] != -1){
    mas1[i] = arr[num];
    arr[num] = -1;
    i++; 
  }
}
return mas1;
}