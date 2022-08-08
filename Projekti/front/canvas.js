window.addEventListener('keydown', function (e) {
  console.log(e.key);
  if(e.key=="w"){
    
  }
  }, false);


  
const c=document.getElementById("canvas");
const kanvaasi=c.getContext("2d");

kanvaasi.moveTo(0, 0);
kanvaasi.beginPath();
kanvaasi.arc(95, 50, 40, 0, 2 * Math.PI);
kanvaasi.stroke();

