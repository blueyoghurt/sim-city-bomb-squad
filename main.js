// Global Variables
var numOfSafeWires;
var numOfWiresCut = 0;
var GlobalTimer;
var liveWires = function(a,b){
  return a + b;
};

// functions that need to wait for the page to complete loading
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById('reset').addEventListener('click', resetB);
  var wires = document.getElementsByClassName('wires');
  var display = document.getElementById('timer');
  var fuseCombination = randomT();
  startTimer(30*100, display);
  numOfSafeWires = fuseCombination.reduce(liveWires);
  for (i = 0; i< wires.length ; i++ ){
    wires[i].value = fuseCombination[i];
    wires[i].addEventListener('click', cut)
  }
});

function cut(){
  this.src =  "img/cut-"+this.id+"-wire.png";
  numOfWiresCut += 1;
  checkdefused(this.value);
  if (this.value == 0){
    setTimeout(triggered,750);
    }
}

function checkdefused(value){
  if (numOfSafeWires == numOfWiresCut && value != 0){
    defused();
  }
}

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;

    var stopTimer = setInterval(function () {
        minutes = parseInt(timer / 6000, 10);
        seconds = parseInt(timer % 6000, 10);
        milliseconds = parseInt(timer % 6000 ,10) %100;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        DisplaySeconds = Math.floor(seconds/100) < 10 ? "0" + Math.floor(seconds/100) : Math.floor(seconds/100);
        milliseconds = milliseconds < 10 ? "0" + milliseconds : milliseconds;

        display.textContent = minutes + ":" + DisplaySeconds + ":" + milliseconds;

        if (--timer < 0) {
            triggered();
            clearTimer(GlobalTimer);
        }
    }, 10);
    GlobalTimer = stopTimer;
}

function clearTimer(){
  clearInterval(GlobalTimer);
}

function resetB (){
  clearInterval(GlobalTimer);
  var display = document.getElementById('timer');
  startTimer(30*100, display);
  document.getElementById('audioplayer').src = "sounds/Siren.wav";
  document.getElementById('audioplayer').loop = true;
  document.getElementsByTagName('body')[0].className = "unexploded";
  var fuseCombination = randomT();
  numOfSafeWires = fuseCombination.reduce(liveWires);
  numOfWiresCut = 0;
  var wires = document.getElementsByClassName('wires');
  for (i = 0; i < wires.length; i ++){
    wires[i].src = "img/uncut-"+ wires[i].id+"-wire.png";
    wires[i].value = fuseCombination[i];
    wires[i].addEventListener('click', cut);
  }
}

function randomT (){
  var fuseCombination = [];
  for ( i=0; i<5 ; i++){
    if (Math.random() < 0.5){
      fuseCombination[i] = 0;
    } else fuseCombination[i] = 1;
  } return fuseCombination;
}

function triggered () {
  clearInterval(GlobalTimer);
  document.getElementsByTagName('body')[0].className = "triggered";
  document.getElementById('audioplayer').src = "sounds/BldgExplode.wav";
  document.getElementById('audioplayer').loop = false;
  var wires = document.getElementsByClassName('wires');
  for (i = 0; i< wires.length; i++){
    wires[i].removeEventListener('click', cut);
  }
}

function defused() {
  document.getElementById('audioplayer').src = "sounds/CrowdYay.wav";
  document.getElementById('audioplayer').loop = false;
  clearInterval(GlobalTimer);
  document.getElementById('timer').textContent += "  Rejoice!";
  var wires = document.getElementsByClassName('wires')
  for (i = 0; i< wires.length; i++){
    wires[i].removeEventListener('click',cut);
  }
}
