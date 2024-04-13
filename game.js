var gamePattern = [];
var buttonColor = ['red', 'blue', 'green','yellow'];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function(){
    if (!started){
        $('#level-title').text('level ' + level);
        nextSequence();
        started = true;
    }
});

$('.btn').on('click', function(){
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1)
});


function nextSequence(){
    userClickedPattern = [];
    
    $('#level-title').text('level ' + level);
    level++
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColor[randomNumber];
    gamePattern.push(randomChosenColor)
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor)
};


function playSound(name){
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
};

function animatePress(currentColor){
    $('#' + currentColor).addClass('pressed');

    setTimeout(function(){
        $('#' + currentColor).removeClass('pressed');
    }, 100)
};

function checkAnswer(currentlevel){
    if (userClickedPattern[currentlevel] === gamePattern[currentlevel]){
        console.log('succes')
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else{
        $('#level-title').text('Game Over, Press Any Key to Restart');
        $('body').addClass('game-over');
        setTimeout(function(){
            $('body').removeClass('game-over'); 
        }, 200);
        startOver()
        
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}
