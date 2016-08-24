document.addEventListener("DOMContentLoaded", function() {

var wires = document.getElementsByClassName('wires');
document.getElementById('reset').addEventListener('click', resetB);

for (i = 0; i< wires.length ; i++ ){
  wires[i].addEventListener('click', cut);
  }
});

function cut(ev){
  this.src =  "img/cut-"+this.id+"-wire.png";
}

function resetB (){
  var wires = document.getElementsByClassName('wires');
  for (i = 0; i < wires.length; i ++){
    wires[i].src = "img/uncut-"+ wires[i].id+"-wire.png";
  }
}
