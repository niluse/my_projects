const ball = document.getElementById("ball");
const button=document.getElementById("click-me");

button.addEventListener("click", ()=> {
    ball.style.animation='bounce 2s ';
    ball.style.animationDirection = 'alternate';
    ball.style.animationIterationCount = '2';
    setTimeout(()=>{
        ball.style.animation = 'none';  // animasyon özelliğini sıfırla
        ball.offsetHeight;
    },4000)
    });
