score=0;
cross=true;

audio = new Audio('bg.mp3')

setTimeout(()=>{
    audio.play()
},200)

document.onkeydown = function(e) {
    console.log("keycode is:", e.keyCode);

    if(e.keyCode==38){
        virat = document.querySelector('.virat')  
        virat.classList.add('jumpvirat')
        setTimeout(()=>{
            virat.classList.remove('jumpvirat')
        },800)
    }
    
    if(e.keyCode==39){
        virat = document.querySelector('.virat')  
        viratX = parseInt(window.getComputedStyle(virat,null).getPropertyValue('left'))
        virat.style.left=viratX+112+'px'
        
    }
    if(e.keyCode==37){
        virat = document.querySelector('.virat')  
        viratX = parseInt(window.getComputedStyle(virat,null).getPropertyValue('left'))
        virat.style.left=viratX-112+'px'
        
    }
}

setInterval(() => {

    virat = document.querySelector('.virat')
    gameover = document.querySelector('.gameover')
    trophy = document.querySelector('.trophy')
    ash = document.querySelector('.name')
    

    viratX = parseInt(window.getComputedStyle(virat,null).getPropertyValue('left'))
    viratY = parseInt(window.getComputedStyle(virat,null).getPropertyValue('top'))

    trophyX = parseInt(window.getComputedStyle(trophy,null).getPropertyValue('left'))
    trophyY= parseInt(window.getComputedStyle(trophy,null).getPropertyValue('top'))

    offsetX=Math.abs(viratX-trophyX)
    offsetY=Math.abs(viratY-trophyY)

    console.log(offsetX, offsetY)

    if( offsetX<123  &&  offsetY<52){
        gameover.style.visibility='visible'
        // ash.style.visibility = 'hidden';
        trophy.classList.remove('movetrophy')

        audio.pause()
        // setTimeout(()=>{
        //     audio.pause()

        // },200)

    }

    else if(offsetX<145 && cross)
    {
        score+=1
        updatescore(score)
        cross=false
        setTimeout(() =>{
            cross=true;
        },1000)

        setTimeout(() => {
            
            anidur=parseFloat(window.getComputedStyle(trophy,null).getPropertyValue('animation-duration'))
            newdur=anidur - 0.1
            trophy.style.animationduration= newdur + 's'
            

        }, 500);
        

    }


}, 10);


function updatescore(score){
    scoreboard.innerHTML = "YOUR SCORE: " + score 
}


