document.querySelector(".control-buttons span").onclick = function () {
  let yourName = prompt("What is your name ? ");
  if (yourName == "" || yourName == null) {
    document.querySelector(".info-container .name span").innerHTML = "unknown";
  } else {
    document.querySelector(".info-container .name span").innerHTML = yourName;
  }
  document.querySelector(".control-buttons").remove();
};
let blocksContainer = document.querySelector(".memory-game-blocks");
let blocksArr = Array.from(blocksContainer.children);
let orderRange = Array.from(Array(blocksArr.length).keys());
let duration = 1000;
shuffle(orderRange);
blocksArr.forEach((e,i)=>{
  e.style.order=orderRange[i];
  e.onclick=function(){
    flipBlock(e); 
  }   
})
function flipBlock(block){
  block.classList.add("is-flipped"); 
  if (document.getElementsByClassName("is-flipped").length == 2 ){
    stopClicking();
    let arr = Array.from(document.getElementsByClassName("is-flipped"));
    checkMatch(arr[0],arr[1]); 
  }
}
function checkMatch(first,second){
  let tries = document.querySelector(".tries span");
  if(first.dataset.images == second.dataset.images){
    first.classList.remove("is-flipped")
    second.classList.remove("is-flipped")
    first.classList.add("has-matched")
    second.classList.add("has-matched")
    document.getElementById("success").play();
  }
  else { 
    setTimeout(()=>{
      tries.innerHTML++;
      first.classList.remove("is-flipped")
      second.classList.remove("is-flipped")
      document.getElementById("fail").play()
    },duration)
  }
}
function stopClicking(){
  blocksContainer.classList.add("no-clicking")
    setTimeout(()=>{
      blocksContainer.classList.remove("no-clicking");   
    } , duration)
}
function shuffle(array){
  let current = orderRange.length,
      temp,
      random;
  while(current>0){
    current--;
    temp = array[current];
    
    random = Math.floor(Math.random() * current);
    array[current] = array[random];
    array[random]=temp;

  }
  return array;
}