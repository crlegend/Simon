var s1Sound = document.getElementById('s1Sound');
var s2Sound = document.getElementById('s2Sound');
var s3Sound = document.getElementById('s3Sound');
var s4Sound = document.getElementById('s4Sound');
var failedSound = document.getElementById('failedSound');
var winSound = document.getElementById('winSound');
var level = 1;
var timerId = 0;
var computerSeq = [];
var playerSeq = [];
var strictMode = false;

//controlClick("th",false);

$("#onButton").click(function(){
  
  $("#onButton").prop('disabled', true);
  $("#offButton").removeAttr("disabled");
  turnOn(true);
});
$("#offButton").click(function(){
  
  $("#offButton").prop('disabled', true);
  $("#onButton").removeAttr("disabled");
  turnOn(false);
  var id = window.setTimeout(function() {}, 0);

while (id--) {
    window.clearTimeout(id);
}
  $("#info").html("Welcome!");
  resetAll();
  level = 1; 
});

$("#strictButton").click(function(){
  
  if ($("#strictButton").hasClass('btn-outline-danger'))
    {
      //console.log("aaa")
      $("#strictButton").removeClass('btn-outline-danger');
      $("#strictButton").addClass('btn-danger');
      strictMode = true;
    }
  else
    {
      $("#strictButton").removeClass('btn-danger');
      $("#strictButton").addClass('btn-outline-danger');
      strictMode = false;
    }
  
});


$("th").click(function(){  
  var str = $(this).attr("id");
  str = str.split("");
  str = parseInt(str[1],10);
  blink(str); //get second char
  checkSession(str);
});


$("#startButton").click(function(){
  computerSession(level);
});

function toTen(num)
{
  if(num<10){num = '0' + num}
    return num;
}

function resetAll()
{
  computerSeq = [];
  playerSeq = [];
  controlClick("th",false);
  failTimer(3,false);
  $("#score").html("--");
}


function failGame()
{
  resetAll();
  failedSound.play();
  $("#info").html("Failed, restarting");
  
  if (strictMode)
    {
      level = 1;
    }
  
  setTimeout(function(){computerSession(level);}, 3000);
}



function checkSession(num)
{
  
  
  playerSeq.push(num);
  
  $("#score").html(toTen(playerSeq.length));
  if(playerSeq[playerSeq.length-1] === computerSeq[playerSeq.length-1])
    {
      failTimer(3,true);
      if(playerSeq.length === computerSeq.length)
        {
          resetAll();
          failTimer(3,false); 
          level++;
          setTimeout(function(){computerSession(level);}, 1500);
          
          
          
        }
      else if(playerSeq.length === 20)
        {
          winSound.play();
          $("#info").html("You win the game, press start to restart");
        }
    }
  else
    {
      failGame();
    }
  
  
}


function getSeq(lvl)
{
  var cSeq = [];
  for (var i =0; i<lvl;i++)
    {
      cSeq.push(getRandomInt(1,5));
    }
  return cSeq;
  
}

function computerSession(lvl)
{
  $("#info").html("Computer's turn, level" + lvl);
  controlClick("th",false);
  computerSeq = getSeq(lvl); //globle....again
  
  //console.log(computerSeq); 
  
  for (var i = 0; i<lvl; i++)
    {      
      doSetTime(i,computerSeq); 
    }
  setTimeout(function(){
    $("#score").html("--");
  },(lvl)*2000); 
  setTimeout(function(){playerSession()},(lvl+0.5)*2000); 
  
  
}

function playerSession()
{
  $("#info").html("Your turn");
  controlClick("th",true);
  failTimer(3,true);
}



function failTimer(sec,runing)
{
  clearTimeout(timerId);
  timerId = setTimeout(function(){
    failGame();
  },sec*1000);
  
  if(!runing)
    {
      clearTimeout(timerId);
    }
}

function doSetTime(n,seq)
{
  setTimeout(function(){
    $("#score").html(toTen(n+1));
        blink(seq[n]);
      },n*2000 + 1000); 
}

function turnOn(onOff)
{
  if(onOff)
    {
      $("#score").addClass("text-danger");
      $("#startButton").removeAttr("disabled");
      $("#strictButton").removeAttr("disabled");
    }
  else
    {
      $("#score").removeClass("text-danger");
      $("#startButton").attr("disabled",true);
      $("#strictButton").attr("disabled",true);
      controlClick("th",false);
    }
  
}

function restart()
{
  //resetAll();
  computerSession(4);
  
}



function blink(num)
{
  if(num === 1)
    {
      $("#s1").removeClass("bg-primary");
      s1Sound.play(); 
      setTimeout(function(){        
        s1Sound.load(); 
        $("#s1").addClass("bg-primary");
      }, 500);
    }
  else if(num === 2)
    {
      $("#s2").removeClass("bg-danger");
      s2Sound.play(); 
      setTimeout(function(){
        s2Sound.load();
        $("#s2").addClass("bg-danger");}, 500);      
    }
  else if(num ===3)
    {
      $("#s3").removeClass("bg-warning");
      s3Sound.play();
      setTimeout(function(){
        s3Sound.load();
        $("#s3").addClass("bg-warning");}, 500);
        
    }
  else if(num === 4)
    {
      $("#s4").removeClass("bg-info");
      s4Sound.play();
      setTimeout(function(){
        s4Sound.load();
        $("#s4").addClass("bg-info");}, 500);      
    }
}

function controlClick(obj,onOff)
{
  if(onOff)
    {
      $(obj).css( 'pointer-events', 'auto' );
    }
  else
    {
      $(obj).css( 'pointer-events', 'none' );
    }
  
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}










