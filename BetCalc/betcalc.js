// Launch Bet Calculator
betcalc();

// Declare Vars
odds_1=document.getElementById("odds_1"); stake_1=document.getElementById("stake_1");
odds_2=document.getElementById("odds_2"); stake_2=document.getElementById("stake_2");
odds_3=document.getElementById("odds_3"); stake_3=document.getElementById("stake_3");
odds_4=document.getElementById("odds_4"); stake_4=document.getElementById("stake_4");
odds_5=document.getElementById("odds_5"); stake_5=document.getElementById("stake_5");



function Browser(){
var ua,s,i;this.isIE=false;this.isNS=false;this.version=null;ua=navigator.userAgent;
s="MSIE";if((i=ua.indexOf(s))>=0){this.isIE=true;this.version=parseFloat(ua.substr(i+s.length));return}
s="Netscape6/";if((i=ua.indexOf(s))>=0){this.isNS=true;this.version=parseFloat(ua.substr(i+s.length));return}
s="Gecko";if((i=ua.indexOf(s))>=0){this.isNS=true;this.version=6.1;return}}
var browser=new Browser();var dragObj=new Object();dragObj.zIndex=0;

function dragStart(event,id){
var el;var x,y;
if(id){dragObj.elNode=document.getElementById(id);}else{if(browser.isIE)dragObj.elNode=window.event.srcElement;if(browser.isNS)dragObj.elNode=event.target;if(dragObj.elNode.nodeType==3)dragObj.elNode=dragObj.elNode.parentNode;}
if(browser.isIE){x=window.event.clientX+document.documentElement.scrollLeft;+document.body.scrollLeft;y=window.event.clientY+document.documentElement.scrollTop;+document.body.scrollTop;}
if(browser.isNS){x=event.clientX+window.scrollX;y=event.clientY+window.scrollY;}

dragObj.cursorStartX=x;dragObj.cursorStartY=y;dragObj.elStartLeft=parseInt(dragObj.elNode.style.left,10);dragObj.elStartTop=parseInt(dragObj.elNode.style.top,10);
if(isNaN(dragObj.elStartLeft))dragObj.elStartLeft=event.clientX+window.scrollX-30;if(isNaN(dragObj.elStartTop))dragObj.elStartTop=event.clientY+window.scrollY-20;
dragObj.elNode.style.zIndex=++dragObj.zIndex;
if(browser.isIE){document.attachEvent("onmousemove",dragGo);document.attachEvent("onmouseup",dragStop);window.event.cancelBubble=true;window.event.returnValue=false}
if(browser.isNS){document.addEventListener("mousemove",dragGo,true);document.addEventListener("mouseup",dragStop,true);event.preventDefault()}}

function dragGo(event){
var x,y;
if(browser.isIE){x=window.event.clientX+document.documentElement.scrollLeft;+document.body.scrollLeft;y=window.event.clientY+document.documentElement.scrollTop;+document.body.scrollTop;}
if(browser.isNS){x=event.clientX+window.scrollX;y=event.clientY+window.scrollY}
dragObj.elNode.style.left=(dragObj.elStartLeft+x-dragObj.cursorStartX)+"px";dragObj.elNode.style.top=(dragObj.elStartTop+y-dragObj.cursorStartY)+"px";
if(browser.isIE){window.event.cancelBubble=true;window.event.returnValue=false;}
if(browser.isNS)
event.preventDefault()}
function dragStop(event){
if(browser.isIE){document.detachEvent("onmousemove",dragGo);document.detachEvent("onmouseup",dragStop);}
if(browser.isNS){document.removeEventListener("mousemove",dragGo,true);document.removeEventListener("mouseup",dragStop,true);}
}






// Closes Betcalc
function close_betcalc(elem) {   var t = document.getElementById(elem);	  t.parentNode.removeChild(t);	}

// Highlights text in Stake fields
function selectall(elem){
  if (document.selection){
    var div = document.body.createTextRange();
    div.moveToElementText(document.getElementById(elem));div.select();
  } else {
    var div = document.createRange();
    div.setStartBefore(document.getElementById(elem));
    div.setEndAfter(document.getElementById(elem));
    window.getSelection().addRange(div);
  }
}

// Only allows numbers and dots to be input
var regex={'nums':/[^\d.\/]/g}
function v(change,reg){ change.value = change.value.replace(regex[reg],'');}


// Clears all fields
function clear_fields(){
countodds = document.getElementById('odds_values').getElementsByTagName("input");
  for(i = 1; i <= countodds.length; i++){
    document.getElementById("stake_" + i).innerHTML="---"; // Resets
    document.getElementById("returns_" + i).innerHTML="0.00"; // Resets
    document.getElementById("returns_1").style.color="black"; // Reset
    document.getElementById("odds_" + i).value=""; // Resets
  }

  odds_1.style.fontWeight="normal";
  stake_1.style.fontWeight="normal";
  document.getElementById("entered_cost").value="100"; // Resets
  document.getElementById("pcprofit").innerHTML="0"; // Resets
  document.getElementById("totalcost").innerHTML="0.00"; // Resets
  document.getElementById("totalprofit").innerHTML="0.00"; // Resets
}


function shift_odds_up(){
  if (odds_2.value == '' && (odds_3.value != '' || odds_4.value != '' || odds_5.value != '')){
    if (odds_3.value != ''){
      odds_2.value=odds_3.value;
      odds_3.value="";
    } else if (odds_4.value != ''){
      odds_2.value=odds_4.value;
      odds_4.value="";
    } else if (odds_5.value != ''){
      odds_2.value=odds_5.value;
      odds_5.value="";
    }
  } 

  if (odds_3.value == '' && (odds_4.value != '' || odds_5.value != '')){
    if (odds_4.value != ''){
      odds_3.value=odds_4.value;
      odds_4.value="";
    } else if (odds_5.value != ''){
      odds_3.value=odds_5.value;
      odds_5.value="";
    }
  }

  if (odds_4.value == '' && odds_5.value != ''){
    odds_4.value=odds_5.value;
    odds_5.value="";
  }
}

// Works out how many odds are filled in and discounts invalid entries
function count_valid_entries(){
  var valid_odds_num=0;
  for(i = 1; i <= 5; i++){
    document.getElementById("stake_" + i).innerHTML="0.00"; // Resets
    document.getElementById("returns_" + i).innerHTML="0.00"; // Resets
    if (document.getElementById("odds_" + i).value != ''){
      valid_odds_num++; // This odds value is a valid entry
    }
  }
  return valid_odds_num;
}

// This function converts fractionals to decimals
function convert_fractions (valid_odds_num){
  for(i = 1; i <= valid_odds_num; i++){ 
    if (document.getElementById("odds_" + i).value.indexOf("/") != -1){
      var change=eval(document.getElementById("odds_" + i).value);
      var converted_odd=((change/1)+1)/1;
      document.getElementById("odds_" + i).value=converted_odd.toFixed(2);
    }
  }
}






function workout(method){
  entered_cost=document.getElementById("entered_cost").value;

  if (odds_1.value == ''){
    if (method == 'cover'){alert("Please enter odds into the top text field."); return;}
    if (method == 'dutch'){alert("Please enter odds into the text fields."); return;}
  }

  if (entered_cost == ''){entered_cost="100";}

  shift_odds_up();
  valid_odds_num=count_valid_entries();
  convert_fractions(valid_odds_num);

  if (method == "cover"){
    odds_1.style.fontWeight="bold";	// Turns the text bold
    stake_1.style.fontWeight="bold";	// Turns the text bold
    var perbet=entered_cost/valid_odds_num;	// Divides the entered cost by the number of valid odds entries filled in ($600 / 3 = perbet is 200)
    var total_cost=valid_odds_num*perbet;	// Multiplies that cost for each valid odds entry by the odds specified

    var how_far_below_cost=0;

    for (i = 1; i <= valid_odds_num; i++){

      if (i > 1){
        var bet_amount=total_cost/document.getElementById("odds_" + i).value;
      } else {
        var bet_amount=total_cost;
      }
			
      document.getElementById("stake_" + i).innerHTML=bet_amount.toFixed(2); // Works out how much you should bet to create minimum
      var this_return=document.getElementById("odds_" + i).value*document.getElementById("stake_" + i).innerHTML;
      document.getElementById("returns_" + i).innerHTML=this_return.toFixed(2); // Gives accurate reuturn per bet

      if (i > 1){ // Work out how much you can add to the fave.
        var work_out_below_cost=perbet-document.getElementById("stake_" + i).innerHTML;
        var how_far_below_cost=how_far_below_cost+work_out_below_cost;
        stake_1.innerHTML=(perbet+how_far_below_cost).toFixed(2); // Add to top odd
        var top_return=odds_1.value*stake_1.innerHTML;
        document.getElementById("returns_1").innerHTML=top_return.toFixed(2); // Re-work out fave returns
      }
    }

  } else {
    odds_1.style.fontWeight="normal"; stake_1.style.fontWeight="normal";
    if (odds_1.value != ''){ implied_odds_1=(1 / odds_1.value) * 100; } else { implied_odds_1=0; }
    if (odds_2.value != ''){ implied_odds_2=(1 / odds_2.value) * 100; } else { implied_odds_2=0; }
    if (odds_3.value != ''){ implied_odds_3=(1 / odds_3.value) * 100; } else { implied_odds_3=0; }
    if (odds_4.value != ''){ implied_odds_4=(1 / odds_4.value) * 100; } else { implied_odds_4=0; }
    if (odds_5.value != ''){ implied_odds_5=(1 / odds_5.value) * 100; } else { implied_odds_5=0; }

    addedImpliedOdds=implied_odds_1 + implied_odds_2 + implied_odds_3 + implied_odds_4 + implied_odds_5;

    stake_1.innerHTML=((implied_odds_1 / addedImpliedOdds) * entered_cost).toFixed(2);
    stake_2.innerHTML=((implied_odds_2 / addedImpliedOdds) * entered_cost).toFixed(2);
    stake_3.innerHTML=((implied_odds_3 / addedImpliedOdds) * entered_cost).toFixed(2);
    stake_4.innerHTML=((implied_odds_4 / addedImpliedOdds) * entered_cost).toFixed(2);
    stake_5.innerHTML=((implied_odds_5 / addedImpliedOdds) * entered_cost).toFixed(2);
	
    for (i = 1; i <= valid_odds_num; i++){
      var this_return=document.getElementById("odds_" + i).value*document.getElementById("stake_" + i).innerHTML;
      document.getElementById("returns_" + i).innerHTML=this_return.toFixed(2); // Gives accurate reuturn per bet
    }
  }

  document.getElementById("totalcost").innerHTML=(entered_cost/1).toFixed(2);
  document.getElementById("entered_cost").value=entered_cost;
  document.getElementById("totalprofit").innerHTML=(document.getElementById("returns_1").innerHTML-(entered_cost/1)).toFixed(2);
  document.getElementById("pcprofit").innerHTML=((document.getElementById("totalprofit").innerHTML/(entered_cost/1))*100).toFixed(2);
}







function betcalc(){ 

  if (!document.getElementById('betcalc')){
    var newdiv = document.createElement('div');
    newdiv.setAttribute('id', 'betcalc');
    newdiv.style.zIndex=Math.round(new Date().getTime()/1000);

    var text="";
    for (i = 1; i <= 5; i++) {
      if (i == 1){embolden="font-weight:bold;";} else {embolden="font-weight:normal;";}
      text = text + "&#163; <div id=\"stake_"+ i +"\" onClick=\"selectall(this.id)\" style=\""+ embolden +"\">---</div> @ <input onKeyUp=\"v(this,'nums');\" type=\"text\" id=\"odds_"+ i +"\" style=\""+ embolden +"\"> = &#163;<span id=\"returns_"+ i +"\">0.00</span><br>";
    }

var css = `
<style>
#betcalc div, span, strong, input[type=text] {
border: 0;
font-size: 100%;
font: inherit;
line-height: 1;
margin: 0;
padding: 0;
}

#betcalc {
background-color:rgba(230, 230, 230, 0.9);
border: 1px solid #aaa; 
box-shadow: 5px 5px 5px #888; 
-webkit-box-shadow: 5px 5px 5px #888; 
-moz-box-shadow: 5px 5px 5px #888;
-moz-border-radius: 15px;
-webkit-border-radius: 15px; 
border-radius: 15px;
bottom: 20px;
box-shadow: none;
box-sizing: content-box;
color: #000;
display: inline;
font-family: Arial;
font-size: 10px;
height: 242px;
line-height: 1.3;
padding: 5px;
position: fixed;
right: 20px;
text-align: left;
transition: all 0s ease 0s;
width: 195px;
vertical-align: baseline;
visibility: visible;
}

#betcalc div [id^=stake_], input[type=text][id^=odds_], #entered_cost {
background: white;
background: -webkit-linear-gradient(#ededed, white);
background: -o-linear-gradient(#ededed, white);
background: -moz-linear-gradient(#ededed, white);
background: linear-gradient(#ededed, white);
border:1px solid #ccc;
color: #555;
font-family:Arial;
font-size: 10px;
line-height:1.2;
padding:3px;
text-align:center;
}

#betcalc div [id^=stake_]{
cursor: default;
display:inline-block;
margin:0;
width:50px;
}

#betcalc input[type=text][id^=odds_]{
float:none;
margin-top:-4px 0 0 0;
width:35px;
}

#betcalc #entered_cost {
float:none;
margin: -5px 7px 0px 7px;
width:50px;
font-weight:bold;
}

#betcalc .title {
cursor: move;
float: left;
font-size: 13px;
font-weight: bold;
padding-top: 2px;
padding-bottom: 8px;
width: 190px;
}

#betcalc .button {
cursor: pointer;
background-color:#f0f0f0;
border: 1px solid #999999;
border-radius: 0px;
color:#000;
font-family:Arial;
font-size:10px;
font-weight:normal;
margin:0;
padding:2px 4px;
text-decoration:none;
}

#betcalc .bold {
font-weight: bold;
}
</style>
`;

    newdiv.innerHTML = css + "<div class=\"title\" onmousedown=\"dragStart(event, 'betcalc')\">Bet Calc</div><div id=\"odds_values\" style=\"margin-top:30px;\">" + text + "</div><br><span class=\"bold\">BET AMOUNT:</span><input type=\"text\" id=\"entered_cost\" onKeyUp=\"v(this,'nums');\" value=\"100\"><br><br><span class=\"bold\">TOTAL COST:</span> <span id=\"totalcost\">0.00</span><br><span class=\"bold\">TOTAL PROFIT:</span> <span id=\"totalprofit\">0.00</span><br><span class=\"bold\">% PROFIT:</span> <span id=\"pcprofit\">0</span>%<div style=\"margin-top:10px;text-align:center;\"><span onClick=\"workout('dutch');this.blur();\" class=\"button\">Dutch</span><span onClick=\"workout('cover');this.blur();\" class=\"button\" style=\"margin: 0px 16px;\">Cover</span><span onClick=\"clear_fields();this.blur();\" class=\"button\">Reset</span></div>";
	
	
    document.body.appendChild(newdiv);
  } else {
    close_betcalc('betcalc');
  }		
} 
