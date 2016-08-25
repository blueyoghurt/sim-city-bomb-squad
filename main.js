var numOfSafeWires;
var numOfWiresCut = 0;
var GlobalTimer;
var liveWires = function(a,b){
  return a + b;
};

document.addEventListener("DOMContentLoaded", function() {

var wires = document.getElementsByClassName('wires');

document.getElementById('reset').addEventListener('click', resetB);

var display = document.getElementById('timer');
startTimer(30*100, display);

var fuseCombination = randomT();
numOfSafeWires = fuseCombination.reduce(liveWires);

console.log(fuseCombination);
for (i = 0; i< wires.length ; i++ ){
  wires[i].value = fuseCombination[i];
  wires[i].addEventListener('click', cut)
  }
});

function cut(){
  this.src =  "img/cut-"+this.id+"-wire.png";
  numOfWiresCut += 1;
  checkdefused();
  if (this.value == 0){
    setTimeout(triggered,750);
    }
}

// function showCutWires () {
//   CurrentWire.src =  "img/cut-"+CurrentWire.id+"-wire.png";
// }

function checkdefused(){
  if (numOfSafeWires == numOfWiresCut){
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

        display.textContent = minutes + ":" + Math.floor(seconds/100) + ":" + milliseconds;

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
  var wires = document.getElementsByClassName('wires');
  document.getElementsByTagName('body')[0].className = "unexploded";
  var fuseCombination = randomT();
  numOfSafeWires = fuseCombination.reduce(liveWires);
  numOfWiresCut = 0;
  console.log(fuseCombination);
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
  var wires = document.getElementsByClassName('wires')
  for (i = 0; i< wires.length; i++){
    wires[i].removeEventListener('click', cut);
  }
}

function defused() {
  console.log("Congragulations! It has been defused");
  clearInterval(GlobalTimer);
  document.getElementById('timer').textContent += " Rejoice!";
  var wires = document.getElementsByClassName('wires')
  for (i = 0; i< wires.length; i++){
    wires[i].removeEventListener('click',cut);
  }
}
