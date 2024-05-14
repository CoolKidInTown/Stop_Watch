var startId =document.querySelector("#start")
var pauseId =document.querySelector("#pause")
var stopId =document.querySelector("#stop")
var resetId =document.querySelector("#reset")
var timer = document.querySelector('.timer')
var ms = 0;
var sec = 0;
var min = 0;
var timerId= null; //globally function scoped to stop interval

//pause and start btn hide and show
pauseId.style.display = 'none';


startId.addEventListener('click',function(){

    pauseId.style.display = 'inline';
    startId.style.display = 'none';
    

    //first ms will increase then sec and then mins
    if(timerId !== null){
        clearInterval(timerId);
    }
    
    //nothing happens on clicking start more than once
    //else the strt will ncall nested setIntervals
    timerId = setInterval(startTimer ,10);
})

pauseId.addEventListener('click' ,function(){

    pauseId.style.display = 'none';
    startId.style.display = 'inline';
  
    if(timerId !== null){
    clearInterval(timerId);
    }
})

stopId.addEventListener('click' ,function(){

    pauseId.style.display = 'none';
    startId.style.display = 'inline';

    // updateBestTime(min,sec,ms,(min+sec+ms));

    if(timerId !== null){

        // updateBestTime(ms,sec,min);

        clearInterval(timerId)
        ms = 0;
        sec = 0;
        min = 0;
    }
})

resetId.addEventListener('click' ,function(){
    ms = 0;
    sec = 0;
    min = 0;

     //inner code format below on how to use code inside dynamic html updation to 00:00:00
     document.querySelector(".timer").innerHTML = `
     ${min}0 :${sec}0 :${ms}0
 `;

})

function startTimer(){
    // console.log("inside interval");
    ms++;
    if(ms === 100){
        ms = 0;
        sec++;
        if(sec === 60){
            sec = 0;
            min++;
        }
    }
    //inner code format below on how to use code inside dynamic html updation
    document.querySelector(".timer").innerHTML = `
        ${min < 10 ? '0' : ''}${min} : ${sec < 10 ? '0' : ''}${sec} : ${ms < 10 ? '0' : ''}${ms}
    `;
}

//UPDATE BEST TIME
function updateBestTime(min, sec, ms ,newTime) {//send as string "053015"=>parse and join???
  // get current besttime
  
    let bestTime = localStorage.getItem('time');    

  if (bestTime !== null  // if it doesn't exist yet
      ) { // or if it's smaller than the new time (I assume bigger means slower here)

    // current bestTime needs to be updated in LS
        localStorage.setItem('time', JSON.stringify(bestTime));
        // console.log("hello local storage "+ min, sec, ms);
        console.log(bestTime);
    // html needs to be updated
    document.getElementById("time-score").innerHTML = "My best time is " + localStorage.getItem('time') + " minsms"

  }
    else if(newTime < bestTime || bestTime == null){
    
        localStorage.setItem('time', JSON.stringify(newTime));
        console.log(newTime);
        document.getElementById("time-score").innerHTML = "My best time is " + localStorage.getItem('time') + " minsms"

    }
  
} 