const button=document.getElementById("button");
const score_label=document.getElementById("score");
const time_label=document.getElementById("time");
let count=0;
let timer_count=parseInt(time_label.innerHTML); //turns the innertext into integer
let timer=null;

button.addEventListener("click",()=>{
    if (timer===null){                  //for the first click
        timer=setInterval(function(){
            timer_count--;
            time_label.innerHTML=timer_count;
            if(timer_count<0){
                alert("Game Over!\nYour Score:"+count);
                time_label.innerHTML=10; 
                score_label.innerHTML=" ";
                count=0;
                clearInterval(timer);
                timer=null;
                timer_count=parseInt(time_label.innerHTML);
            }
        },1000);
    }

    count++;    //counts the button clicks
    score_label.innerHTML=count;    //shows the button click number in the label
    
    // if (count < 0) {        //in case of count being lower than zero
    //     clearInterval(timer);
    //     timer = null;
    //     count=0;
    //     score_label.innerHTML=" ";
    //     alert("Game Over!\nYour Score:"+count);
    // }

    // setTimeout(()=>{        //resets the counter and the score
    //     count=0;
    //     score_label.innerHTML=" ";
    // },10000);
});
