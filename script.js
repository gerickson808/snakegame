var num = 601;
var prevNum=0;
var direction = "right";
var bodyArray = [601];
var foodLocation = Math.floor((Math.random() * 900) + 1);
var score = 0;
var timer = setInterval(runGame,75);
$(document).ready(function(){
	$("#lose").hide()
	populatePixels();
	startGame();
	eatsFood();
	$(document).keydown(function(e){
		direction = snakeDirection(e);
	})
	/*

	Stop button: Useful for testing, not so useful for finished game
	$('#stop').click(function(){
		stopTimer(timer);
	})*/
	$('#newGame').click(function(){
		newGame();
	})
});

function populatePixels(){
	for (i=1;i<=900;i++){
		$("#box").append("<div class=pixel></div>");
	}
}

function startGame(){
	$(".pixel:nth-child(2001)").addClass("head");
}

function runGame(){
	num = moveSnake();
	checkIfDead();
	$("#score").text("Score: "+score);
}


function snakeDirection(e) {
    switch (e.keyCode) {
        case 37:
            direction = 'left';
            break;
        case 38:
            direction='up';
            break;
        case 39:
            direction='right';
            break;
        case 40:
            direction = 'down';
            break;
    }
    return direction
};

function moveSnake(){
	$(".pixel:nth-child("+num+")").removeClass("head");
	$(".pixel:nth-child("+num+")").addClass("body");
	prevNum = num;
	switch(direction){
		case "left":
			num -= 1;
			if (num%30==0){
				num+=30;
			}
			break;
		case "right":
			num += 1;
			if (num%30==1){
				num-=30;
			}
			break;
		case "up":
			num -= 30;
			if (num<1){
				num+=900;
			}
			break;
		case "down":
			num += 30;
			if (num>900){
				num-=900;
			}
			break;
	}
	bodyArray.push(num);
	if (!$(".pixel:nth-child("+num+")").hasClass("food")){
		$(".pixel:nth-child("+bodyArray[0]+")").removeClass("body");
		bodyArray.splice(0,1);
	}
	else{
		eatsFood();
	}
	$(".pixel:nth-child("+num+")").addClass("head");
	return num;
}

function eatsFood(){
	$(".pixel:nth-child("+num+")").removeClass("food");
	foodLocation = Math.floor((Math.random() * 900) + 1);
	$(".pixel:nth-child("+foodLocation+")").addClass("food");
	score += 1;
	/*console.log(foodLocation);*/
}
function stopTimer(timer){
	clearInterval(timer);
}

function checkIfDead(){
	var dead = false;
	/*if (num%30 == 0 && prevNum%30 == 1){
		dead = true;
		$(".pixel:nth-child("+num+")").removeClass("head");
	}
	else if (num%30 ==1 && prevNum%30 ==0){
		dead = true;
		$(".pixel:nth-child("+num+")").removeClass("head");
	}
	else if (num<1 || num>900){
		dead = true;
		$(".pixel:nth-child("+num+")").removeClass("head");
	}
	else */if ($(".pixel:nth-child("+num+")").hasClass("body")){
		dead = true;
		$(".pixel:nth-child("+num+")").removeClass("body");
	}
	if (dead==true){
		var msg = "";
		stopTimer(timer);
		if (score<10){
			msg = "You suck!";
		}
		else if (score<30){
			msg = "Try harder!";
		}
		else if (score<60){
			msg = "Not bad!";
		}
		else if (score<900){
			msg = "Killed it!";
		}
		else{
			msg = "Wow. You did perfectly.";
		}
		$("#lose").text("You LOSE! Your score was "+score+"! "+msg);
		$("#lose").fadeIn(30);
	}
}

function newGame(){
	stopTimer(timer);
	$(".pixel").detach();
	$(".pixel").removeClass("head");
	$(".pixel").removeClass("body");
	$(".pixel").removeClass("food");
	$("#lose").fadeOut(30);
	num = 601;
	prevNum=0;
	direction = "right";
	bodyArray = [601];
	foodLocation = Math.floor((Math.random() * 900) + 1);
	score = 0;
	populatePixels();
	startGame();
	eatsFood();
	timer = setInterval(runGame,75);
	$('#stop').click(function(){
		stopTimer(timer);
	})
}