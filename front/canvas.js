window.addEventListener('keydown', function (e) {
  console.log(e.key)
  }, false);


  
const c=document.getElementById("canvas");
const kanvaasi=c.getContext("2d");

kanvaasi.moveTo(0, 0);
kanvaasi.lineTo(c.width, c.height);
kanvaasi.stroke();

