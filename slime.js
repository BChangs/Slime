// Set up screen variables
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.globalAlpha = 1.0;
canvas.width = 1200;
canvas.height = 710;
var audio;
var effectAudio = new Audio("music/victory.mp3");
var tickTime = 100;
var numLoaded = 0;
var started = false;
var t;

// Initialize main menu
ctx.fillStyle="#ffffff";
ctx.fillRect(0, 0, canvas.width, canvas.height);

var myImage = new Image();
myImage.src = 'sprites/menu.png';
myImage.onload = menuDraw;
var menu = {img: myImage, xPos: 220, yPos: 250};

function menuDraw() {
	ctx.drawImage(menu.img, menu.xPos, menu.yPos);
	audio = new Audio('music/main.mp3');
	audio.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
	}, false);
	audio.play();
	menuLoop();
}	

function menuLoop() {
	if (numLoaded > 14 && started) {
		introStart(); 
		return;
	}
	setTimeout(menuLoop, tickTime);
}


// Set up game variables
// Movement vars
var rLimit = 5;
var lLimit = 135;
var moveSpd = 40;
var playerBob = 0;
var bobRate = 12;
var credBob = 0;
var pressed = false;

// Position vars
var treeY = 230;
var gpaX = -400;
var realPlayerX = 0;

// Dialogue vars
var talking = false;
var contTalk = 0;
var text;
var dia;
var diaN;

// Character definitions
var PLAYER = -1;
var GRANDPA = 0;
var SLMELISSA = 1;
var SLALICE = 2;
var SLMICHAEL = 3;
var MOM = 4;
var DAD = 5;
var SCAR = 6;

// Cutscene vars
var cutscene = false;
var scene = -1;
var HIDING = 0;
var SCARATTACK = 1;
var DMG = 2;
var ADV = 3;
var TRANSITION = 4;
var sceneCounter = 0;


// Game stage vars
var introHap = false;
var contacted = [false, false, false, false, false, false, true];
var postTalks = false;
var postDeaths = false;
var deathCount = 0;
var staticShow = false;
var battle = false;
var battleStage = 0;
var actionMenu = false;
var showCredits = false;

// intro
var intro = loadImage('sprites/intro.png', 130, 150);
var wasd = loadImage('sprites/wasd.png', 470, 300);
var space = loadImage('sprites/space.png', 380, 400);

// Add player and stats
var player = loadImage('sprites/slime.png', 600, 550);
var player2 = loadImage('sprites/slimeup.png', 605, 536);
var sadPlayer = loadImage('sprites/slimesad.png', 800, 312);
var health = loadImage('sprites/health.png', 700, 0);
var exp = loadImage('sprites/exp.png', 950, 2);
var exp2 = loadImage('sprites/exp2.png', 950, 2);

// Add moving adventurer
var adv = loadImage('sprites/adventurer.png', 1200, 186);
var adv2 = loadImage('sprites/adventurer2.png', 1200, 186);

// Add random images
var dmgPt = loadImage('sprites/dmgPt.png', 490, 320);
var dmgPt2 = loadImage('sprites/dmgPt2.png', 315, 470);
var static = loadImage('sprites/static.png', 0, 0);

// Fight texts
var advLabel = loadImage('sprites/advLabel.png', 200, 490);
var action = loadImage('sprites/action.png', 620, 490);
var magic = loadImage('sprites/magic.png', 950, 490);
var bag = loadImage('sprites/bag.png', 620, 590);
var run = loadImage('sprites/run.png', 950, 590);
var selectorX = 580;
var selectorY = 452;
var selector = loadImage('sprites/selector.png', selectorX, selectorY);
var backMenu = loadImage('sprites/back.png', 620, 490);
var slam = loadImage('sprites/slam.png', 620, 590);
var cry = loadImage('sprites/cry.png', 620, 590);
var weep = loadImage('sprites/weep.png', 950, 490);
var beg = loadImage('sprites/beg.png', 620, 590);
var plead = loadImage('sprites/plead.png', 950, 490);
var implore = loadImage('sprites/implore.png', 950, 590);
var accept = loadImage('sprites/accept.png', 620, 490);


// Add background
var background = [];
for (var i = -6000; i < 1201; i += 1200) {
	background.push(loadImage('sprites/sky.png', i, 0));
}

for (var i = -5120; i < 1601; i += 320) {
	background.push(loadImage('sprites/ground.png', i, 610));
}
for (var i = -5120; i < 1601; i += 575) {
	background.push(loadImage('sprites/mountain.png', i, 388));
}

for (var i = -5500; i < 1100; i += (Math.random() * 900 + 200)) {
	background.push(loadImage('sprites/cloud.png', i, (Math.random() * 200) + 50));
}

background.push(loadImage('sprites/tree.png', 500, treeY));
background.push(loadImage('sprites/tree.png', 0, treeY));
background.push(loadImage('sprites/tree.png', -1250, treeY));
background.push(loadImage('sprites/tree.png', -1550, treeY));
background.push(loadImage('sprites/tree.png', -2400, treeY));
background.push(loadImage('sprites/tree.png', -2720, treeY));
background.push(loadImage('sprites/sign.png', 800, 503));
background.push(loadImage('sprites/bush.png', -2600, 511));
background.push(loadImage('sprites/bush.png', -1200, 511));
background.push(loadImage('sprites/bush.png', -100, 511));
background.push(loadImage('sprites/bush.png', 1200, 513));
background.push(loadImage('sprites/house.png', -900, 241));
background.push(loadImage('sprites/house2.png', -2100, 257));
background.push(loadImage('sprites/house3.png', -3550, 259));

// Add characters
var characters = [];
characters.push(loadImage('sprites/oldSlime.png', gpaX, 545));
characters.push(loadImage('sprites/melissa.png', -1450, 543));
characters.push(loadImage('sprites/slalice.png', -2200, 544));
characters.push(loadImage('sprites/slmichael.png', -2580, 537));
characters.push(loadImage('sprites/mom.png', -3050, 536));
characters.push(loadImage('sprites/dad.png', -3500, 548));
characters.push(loadImage('sprites/scar.png', -4250, 544));

var postCharacters = [];
postCharacters.push(loadImage('sprites/deadOld.png', -650, 379));
postCharacters.push(loadImage('sprites/deadM.png', -1650, 379));
postCharacters.push(loadImage('sprites/deadA.png', -2550, 379));
postCharacters.push(loadImage('sprites/deadMi.png', -2750, 379));
postCharacters.push(loadImage('sprites/deadMo.png', -3350, 379));
postCharacters.push(loadImage('sprites/deadD.png', -3750, 379));
postCharacters.push(loadImage('sprites/adventurer.png', -4475, 185));
var flipAdv = loadImage('sprites/adventurerFlip.png', 150, 185);
postCharacters.push(loadImage('sprites/scar.png', -4410, 544));
var flipScar = loadImage('sprites/deadScar.png', 45, 377);

// Add text
var endLeft = loadImage('text/endLeft.png', 10, 480);
var endRight = loadImage('text/endRight.png', 230, 480);

var gpa = [];
gpa.push({text:loadImage('text/gpa/greeting.png', 460, 480), speaker: PLAYER});
gpa.push({text:loadImage('text/gpa/response.png', 0, 480), speaker: GRANDPA, offset: 250});
gpa.push({text:loadImage('text/gpa/punch.png', 450, 480), speaker: PLAYER});

var slmelissa = [];
slmelissa.push({text:loadImage('text/slmelissa/0.png', 480, 480), speaker: PLAYER});
slmelissa.push({text:loadImage('text/slmelissa/1.png', 0, 480), speaker: SLMELISSA, offset: 370});
slmelissa.push({text:loadImage('text/slmelissa/2.png', 560, 480), speaker: PLAYER});
slmelissa.push({text:loadImage('text/slmelissa/3.png', 0, 480), speaker: SLMELISSA, offset: 70});

var slalice = [];
slalice.push({text:loadImage('text/slalice/0.png', 500, 480), speaker: PLAYER});
slalice.push({text:loadImage('text/slalice/1.png', 0, 480), speaker: SLALICE, offset: 270});
slalice.push({text:loadImage('text/slalice/2.png', 510, 480), speaker: PLAYER});

var slmichael = [];
slmichael.push({text:loadImage('text/slmichael/0.png', 490, 480), speaker: PLAYER});
slmichael.push({text:loadImage('text/slmichael/1.png', 0, 480), speaker: SLMICHAEL, offset: 300});
slmichael.push({text:loadImage('text/slmichael/2.png', 490, 480), speaker: PLAYER});

var mom = [];
mom.push({text:loadImage('text/mom/0.png', 515, 480), speaker: PLAYER});
mom.push({text:loadImage('text/mom/1.png', 0, 480), speaker: MOM, offset: 330});
mom.push({text:loadImage('text/mom/2.png', 510, 480), speaker: PLAYER});

var dad = [];
dad.push({text:loadImage('text/dad/0.png', 510, 480), speaker: PLAYER});
dad.push({text:loadImage('text/dad/1.png', 0, 480), speaker: DAD, offset: 200});
dad.push({text:loadImage('text/dad/2.png', 500, 480), speaker: PLAYER});

var expt = [];
expt.push({text:loadImage('text/exp/0.png', 150, 480), speaker: PLAYER});
expt.push({text:loadImage('text/exp/1.png', 300, 480), speaker: PLAYER});

var scar1 = [];
scar1.push({text:loadImage('text/scar1/0.png', 380, 480), speaker: PLAYER});
scar1.push({text:loadImage('text/scar1/1.png', 0, 480), speaker: SCAR, offset: 70});

var scar2 = [];
scar2.push({text:loadImage('text/scar2/0.png', 0, 480), speaker: SCAR, offset: 150});
scar2.push({text:loadImage('text/scar2/1.png', 400, 480), speaker: PLAYER});
scar2.push({text:loadImage('text/scar2/2.png', 0, 480), speaker: SCAR, offset: 150});
scar2.push({text:loadImage('text/scar2/3.png', 500, 480), speaker: PLAYER});
scar2.push({text:loadImage('text/scar2/4.png', 0, 480), speaker: SCAR, offset: 150});
scar2.push({text:loadImage('text/scar2/5.png', 0, 480), speaker: SCAR, offset: 200});
scar2.push({text:loadImage('text/scar2/6.png', 0, 480), speaker: SCAR, offset: 170});
scar2.push({text:loadImage('text/scar2/7.png', 0, 480), speaker: SCAR, offset: 200});
scar2.push({text:loadImage('text/scar2/8.png', 0, 480), speaker: SCAR, offset: 220});
scar2.push({text:loadImage('text/scar2/9.png', 390, 480), speaker: PLAYER});
scar2.push({text:loadImage('text/scar2/10.png', 410, 480), speaker: PLAYER});
scar2.push({text:loadImage('text/scar2/11.png', 380, 480), speaker: PLAYER});
scar2.push({text:loadImage('text/scar2/12.png', 370, 480), speaker: PLAYER});

var leave = [];
leave.push({text:loadImage('text/leave/0.png', 300, 480), speaker: PLAYER});

var hide = [];
hide.push({text:loadImage('text/hide/0.png', 430, 480), speaker: PLAYER});
hide.push({text:loadImage('text/hide/1.png', 490, 480), speaker: PLAYER});

var back = [];
back.push({text:loadImage('text/back/0.png', 430, 480), speaker: PLAYER});
back.push({text:loadImage('text/back/1.png', 430, 480), speaker: PLAYER});
back.push({text:loadImage('text/back/2.png', 490, 480), speaker: PLAYER});

var dontLeave = [];
dontLeave.push({text:loadImage('text/dontLeave/0.png', 380, 480), speaker: PLAYER});

var death1 = [];
death1.push({text:loadImage('text/death/0.png', 530, 480), speaker: PLAYER});

var death2 = [];
death2.push({text:loadImage('text/death/1.png', 490, 480), speaker: PLAYER});

var death3 = [];
death3.push({text:loadImage('text/death/2.png', 510, 480), speaker: PLAYER});

var death4 = [];
death4.push({text:loadImage('text/death/3.png', 520, 480), speaker: PLAYER});

var scar3 = [];
scar3.push({text:loadImage('text/scar3/0.png', 0, 480), speaker: SCAR, offset: 360});
scar3.push({text:loadImage('text/scar3/1.png', 0, 480), speaker: SCAR, offset: 320});
scar3.push({text:loadImage('text/scar3/2.png', 0, 480), speaker: SCAR, offset: 310});

var angry = [];
angry.push({text:loadImage('text/angry/0.png', 490, 480), speaker: PLAYER});
angry.push({text:loadImage('text/angry/1.png', 460, 480), speaker: PLAYER});
angry.push({text:loadImage('text/angry/2.png', 460, 480), speaker: PLAYER});
angry.push({text:loadImage('text/angry/3.png', 450, 480), speaker: PLAYER});
angry.push({text:loadImage('text/angry/4.png', 400, 480), speaker: PLAYER});
angry.push({text:loadImage('text/angry/5.png', 500, 480), speaker: PLAYER});

var runT = [];
runT.push({text:loadImage('text/run/0.png', 380, 55), speaker: PLAYER});

var magicT = [];
magicT.push({text:loadImage('text/magic/0.png', 510, 60), speaker: PLAYER});

var bagT = [];
bagT.push({text:loadImage('text/bag/0.png', 340, 50), speaker: PLAYER});

var slamT = [];
slamT.push({text:loadImage('text/slam/0.png', 280, 53), speaker: PLAYER});
slamT.push({text:loadImage('text/slam/1.png', 490, 53), speaker: PLAYER});

var cryT = [];
cryT.push({text:loadImage('text/cry/0.png', 280, 53), speaker: PLAYER});
cryT.push({text:loadImage('text/cry/1.png', 510, 53), speaker: PLAYER});

var begT = [];
begT.push({text:loadImage('text/beg/0.png', 390, 53), speaker: PLAYER});
begT.push({text:loadImage('text/beg/1.png', 510, 53), speaker: PLAYER});

var acceptT = [];
acceptT.push({text:loadImage('text/accept/0.png', 520, 353), speaker: PLAYER});
acceptT.push({text:loadImage('text/accept/1.png', 460, 353), speaker: PLAYER});
acceptT.push({text:loadImage('text/accept/2.png', 270, 353), speaker: PLAYER});
acceptT.push({text:loadImage('text/accept/3.png', 250, 353), speaker: PLAYER});
acceptT.push({text:loadImage('text/accept/4.png', 255, 353), speaker: PLAYER});
acceptT.push({text:loadImage('text/accept/5.png', 380, 353), speaker: PLAYER});
acceptT.push({text:loadImage('text/accept/6.png', 220, 353), speaker: PLAYER});

var credits = [];
credits.push({text:loadImage('text/credits/0.png', 480, 970), speaker: PLAYER});
credits.push({text:loadImage('text/credits/1.png', 170, 1150), speaker: PLAYER});
credits.push({text:loadImage('text/credits/2.png', 410, 1250), speaker: PLAYER});
credits.push({text:loadImage('text/credits/4.png', 420, 1380), speaker: PLAYER});
credits.push({text:loadImage('text/credits/5.png', 120, 1480), speaker: PLAYER});
credits.push({text:loadImage('text/credits/6.png', 430, 1580), speaker: PLAYER});

var credChar = [];
credChar.push(loadImage('sprites/slime.png', 540, 2292));
credChar.push(loadImage('sprites/slimeUp.png', 545, 2276));

// Wait to load images before beginning game
function loadImage(name, x, y) {
	var myImage = new Image();
	myImage.src = name;
	myImage.onload = loaded;
	return {type:name, img:myImage, xPos: x, yPos: y};
}

function loaded() {
	numLoaded++;
}

function introStart() {
	introHap = true;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(intro.img, intro.xPos, intro.yPos);
	ctx.drawImage(wasd.img, wasd.xPos, wasd.yPos);
	ctx.drawImage(space.img, space.xPos, space.yPos);
}

// Main animation loop
function mainLoop() {
	updateScene();
	if (talking) {
		checkContTalk();
	} else{
		// initiate exp scene
		var temp = contacted[contacted.length - 1];
		for (var i = 1; i < contacted.length - 1; i++) {
			temp = temp && contacted[i];
		}
		if (temp) {
			effectAudio.pause();
			effectAudio.src = 'music/victory.mp3';
			effectAudio.play();
			dia = expt;
			diaN = 0;
			setText();
			talking = true;
			contacted[contacted.length - 1] = false;
		}
	}
	if (staticShow) {
		if (Math.random() > .98) {
			effectAudio.pause();
			effectAudio.src = "music/static.mp3";
			effectAudio.play();
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.drawImage(static.img, static.xPos, static.yPos);
		}
	}
	clearTimeout(t);
	if (cutscene) {
		runScene();
	} else {
		t = setTimeout(mainLoop, tickTime);
	}
}

// Update entire scene
function updateScene() {
	// Clear scene and draw background
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (var i = 0; i < background.length; i++) {
		if (background[i].type == 'sprites/cloud.png') {
			background[i].xPos--;
			if (background[i].xPos < -6000) {
				background[i].xPos = 1300;
			}
		}
		if (background[i].type == 'sprites/sign.png' && scene == HIDING) {
			ctx.drawImage(player.img, player.xPos, player.yPos);
		}
		ctx.drawImage(background[i].img, background[i].xPos, background[i].yPos);
	}

	// Draw characters
	if (!postDeaths) {
		for (var i = 0; i < characters.length; i++) {
			ctx.drawImage(characters[i].img, characters[i].xPos, characters[i].yPos);
		}
	} else {
		for (var i = 0; i < postCharacters.length; i++) {
			ctx.drawImage(postCharacters[i].img, postCharacters[i].xPos, postCharacters[i].yPos);
		}
	}

	// Animate Player and stats
	if (scene != HIDING) {
		playerBob++;
		if (playerBob < bobRate) {
			ctx.drawImage(player.img, player.xPos, player.yPos);
		} else {
			ctx.drawImage(player2.img, player2.xPos, player2.yPos);
		}
		if (playerBob > (bobRate * 2) - 2) {
			playerBob = 0;
		}
		ctx.drawImage(health.img, health.xPos, health.yPos);
		if (contacted[contacted.length - 1]) {
			ctx.drawImage(exp.img, exp.xPos, exp.yPos);
		} else {
			ctx.drawImage(exp2.img, exp2.xPos, exp2.yPos);
		}
	}
		
	// Draw dialogue
	if (realPlayerX < -lLimit + 1) {
		ctx.drawImage(endLeft.img, endLeft.xPos, endLeft.yPos);
	}
	if (realPlayerX > rLimit - 1 && !postTalks) {
		ctx.drawImage(endRight.img, endRight.xPos, endRight.yPos);
	}
	if (talking) {
		ctx.drawImage(text.img, text.xPos, text.yPos);
	}
}

function battleLoop() {
	//delete these 2 lines when done testing
	flipAdv.xPos = 10;
	flipAdv.yPos = -50;

	updateBattle();

	if (talking) {
		checkContTalk();
	}
	
	clearTimeout(t);
	if (showCredits) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		runCredits();
	} else {
		t = setTimeout(battleLoop, tickTime);
	}
}

function updateBattle() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	if (dia != acceptT) {
		ctx.drawImage(sadPlayer.img, sadPlayer.xPos, sadPlayer.yPos);
		ctx.drawImage(flipAdv.img, flipAdv.xPos, flipAdv.yPos);

		ctx.drawImage(selector.img, selector.xPos, selector.yPos);
		ctx.drawImage(advLabel.img, advLabel.xPos, advLabel.yPos);

		if (!actionMenu) {
			ctx.drawImage(action.img, action.xPos, action.yPos);
			ctx.drawImage(magic.img, magic.xPos, magic.yPos);
			ctx.drawImage(bag.img, bag.xPos, bag.yPos);
			ctx.drawImage(run.img, run.xPos, run.yPos);
		} else {
			if (battleStage == 0) {
				ctx.drawImage(backMenu.img, backMenu.xPos, backMenu.yPos);
				ctx.drawImage(slam.img, slam.xPos, slam.yPos);
			}
			if (battleStage == 1) {
				ctx.drawImage(backMenu.img, backMenu.xPos, backMenu.yPos);
				ctx.drawImage(cry.img, cry.xPos, cry.yPos);
				ctx.drawImage(weep.img, weep.xPos, weep.yPos);
			}
			if (battleStage == 2) {
				ctx.drawImage(backMenu.img, backMenu.xPos, backMenu.yPos);
				ctx.drawImage(beg.img, beg.xPos, beg.yPos);
				ctx.drawImage(plead.img, plead.xPos, plead.yPos);
				ctx.drawImage(implore.img, implore.xPos, implore.yPos);
			}
			if (battleStage == 3) {
				ctx.drawImage(accept.img, accept.xPos, accept.yPos);
				accept.xPos += 330;
				ctx.drawImage(accept.img, accept.xPos, accept.yPos);
				accept.yPos += 100;
				ctx.drawImage(accept.img, accept.xPos, accept.yPos);
				accept.xPos -= 330;
				ctx.drawImage(accept.img, accept.xPos, accept.yPos);
				accept.yPos -= 100;
			}
		}
	}

	if (talking) {
		ctx.drawImage(text.img, text.xPos, text.yPos);
	}
}

function moveLeft() {
	if (realPlayerX > -lLimit) {
		for (var i = 0; i < background.length; i++) {
			background[i].xPos += moveSpd;
		}
		for (var i = 0; i < characters.length; i++) {
			characters[i].xPos += moveSpd;
		}
		for (var i = 0; i < postCharacters.length; i++) {
			postCharacters[i].xPos += moveSpd;
		}

		if (postDeaths) {
			if (realPlayerX < -9 && deathCount < 1) {
				audio.pause();
				var element = document.getElementById('tint');
				element.style.opacity = "0.1";
				deathCount++;
			}
			if (realPlayerX < -14 && deathCount < 2) {
				dia = death1;
				diaN = 0;
				setText();
				talking = true;
				deathCount++;
			}
			if (realPlayerX < -39 && deathCount < 3) {
				var element = document.getElementById('tint');
				element.style.opacity = "0.15";
				dia = death2;
				diaN = 0;
				setText();
				talking = true;
				deathCount++;
				audio.src = "music/twisted.mp3";
				audio.play();
				staticShow = true;
			}
			if (realPlayerX < -64 && deathCount < 4) {
				var element = document.getElementById('tint');
				element.style.opacity = "0.2";
				dia = death3;
				diaN = 0;
				setText();
				talking = true;
				deathCount++;
			}
			if (realPlayerX < -86 && deathCount < 5) {
				var element = document.getElementById('tint');
				element.style.opacity = "0.25";
				dia = death4;
				diaN = 0;
				setText();
				talking = true;
				deathCount++;
			}
			if (realPlayerX < -116) {
				dia = scar3;
				diaN = 0;
				setText();
				talking = true;
			}
		}

		realPlayerX--;
	}
}

function moveRight() {
	if (realPlayerX < rLimit || postTalks) {
		for (var i = 0; i < background.length; i++) {
			background[i].xPos -= moveSpd;
		}
		for (var i = 0; i < characters.length; i++) {
			characters[i].xPos -= moveSpd;
		}
		for (var i = 0; i < postCharacters.length; i++) {
			postCharacters[i].xPos -= moveSpd;
		}
		realPlayerX++;
		if (realPlayerX == 14 && !postDeaths) {
			// initiate hiding scene
			audio.pause();
			dia = hide;
			diaN = 0;
			setText();
			talking = true;
		}
		if (realPlayerX == 17) {
			realPlayerX--;
			dia = dontLeave;
			diaN = 0;
			setText();
			talking = true;
		}
	}
}

function interact() {
	// Peaceful Half
	// Talking with each character
	if (!postTalks) {
		if (realPlayerX < -21 && realPlayerX > -29) {
			dia = gpa;
			diaN = 0;
			setText();
			talking = true;
			contacted[GRANDPA] = true;
		}

		if (realPlayerX < -47 && realPlayerX > -56) {
			dia = slmelissa;
			diaN = 0;
			setText();
			talking = true;
			contacted[SLMELISSA] = true;
		}

		if (realPlayerX < -66 && realPlayerX > -74) {
			dia = slalice;
			diaN = 0;
			setText();
			talking = true;
			contacted[SLALICE] = true;
		}

		if (realPlayerX < -76 && realPlayerX > -83) {
			dia = slmichael;
			diaN = 0;
			setText();
			talking = true;
			contacted[SLMICHAEL] = true;
		}

		if (realPlayerX < -87 && realPlayerX > -95) {
			dia = mom;
			diaN = 0;
			setText();
			talking = true;
			contacted[MOM] = true;
		}

		if (realPlayerX < -98 && realPlayerX > -106) {
			dia = dad;
			diaN = 0;
			setText();
			talking = true;
			contacted[DAD] = true
		}

		if (realPlayerX < -117 && realPlayerX > -125) {
			// Pre exp dia
			if(contacted[contacted.length - 1]) {
				dia = scar1;
				diaN = 0;
				setText();
				talking = true;
			} else {
				// Post exp dia
				dia = scar2;
				diaN = 0;
				setText();
				talking = true;
				postTalks = true;
			}
		}
	} else if (!postDeaths) {
		dia = leave;
		diaN = 0;
		setText();
		talking = true;
	}

	// Battle Mode

}

function setText() {
	text = dia[diaN].text;
	if (dia[diaN].speaker != PLAYER) {
		text.xPos = characters[dia[diaN].speaker].xPos - dia[diaN].offset;
	}
}

function checkContTalk() {
	// If interacted, continue dialogue. Else, keep waiting for interaction
	if (contTalk > diaN) {
		diaN++;
		// If no more dialogue, end talk
		if (dia.length <= diaN) {
			talking = false;
			contTalk = 0;
			switch(dia){
				case hide:
					cutscene = true;
					scene = HIDING;
					audio.src = "music/danger.mp3";
					audio.play();
					break;
				case back:
					audio.src = "music/chill.mp3";
					audio.play();
					break;
				case scar3:
					cutscene = true;
					scene = SCARATTACK;
					break;
				case angry:
					audio.pause();
					audio.src = "music/buildUp.mp3";
					audio.play();
					staticShow = false;
					cutscene = true;
					scene = TRANSITION;
					break;
				case slamT:
				case cryT:
				case begT:
					actionMenu = false;
					selector.xPos = selectorX;
					selector.yPos = selectorY;
					battleStage++;
					break;
				case acceptT:
					showCredits = true;
					break;
			}
			return;
		}
		setText();
		return;
	}
}

function runScene() {
	sceneCounter++;
	updateScene();
	switch (scene) {
		case HIDING:
			if (adv.xPos > -620) {
				adv.xPos -= 20;
				adv2.xPos -= 20;
			} else {
				audio.pause()
				cutscene = false;
				scene = -1;
				dia = back;
				diaN = 0;
				setText();
				talking = true;
				postDeaths = true;
				clearTimeout(t);
				t = setTimeout(mainLoop, tickTime);
				sceneCounter = 0;
				return;
			}
			if (sceneCounter % 2 == 0) {
				ctx.drawImage(adv.img, adv.xPos, adv.yPos);
			} else {
				ctx.drawImage(adv2.img, adv2.xPos, adv2.yPos);
			}
			break;
		case SCARATTACK:
			if (sceneCounter % 2 == 0) {
				postCharacters[postCharacters.length - 1].xPos -= 50;
				postCharacters[postCharacters.length - 1].yPos += 50;
			} else {
				postCharacters[postCharacters.length - 1].xPos += 50;
				postCharacters[postCharacters.length - 1].yPos -= 50;
			}
			if (sceneCounter > 19) {
				scene = DMG;
				sceneCounter = 0;
			}
			break;
		case DMG:
			if (sceneCounter == 17) {
				effectAudio.pause();
				effectAudio.src = "music/attack.mp3";
				effectAudio.play();
			}
			if (sceneCounter >= 17) {
				ctx.drawImage(dmgPt.img, dmgPt.xPos, dmgPt.yPos);
			}
			if (sceneCounter >= 27) {
				scene = ADV;
				sceneCounter = 0;
			}
			break;
		case ADV:
			if (sceneCounter == 10) {
				postCharacters[postCharacters.length - 2].xPos -= 100;
			} 
			if (sceneCounter == 11) {
				postCharacters[postCharacters.length - 2].xPos += 100;
			}
			if (sceneCounter == 25) {
				effectAudio.src = "music/attack.mp3";
				effectAudio.play();
			}
			if (sceneCounter >= 25 && sceneCounter <= 35) {
				ctx.drawImage(dmgPt2.img, dmgPt2.xPos, dmgPt2.yPos);
			}
			if (sceneCounter == 45) {
				postCharacters[postCharacters.length - 1] = flipScar;
				audio.pause();
			}
			if (sceneCounter == 85) {
				postCharacters[postCharacters.length - 2] = flipAdv;
				audio.src = "music/slow.mp3";
				audio.play();
			}

			if (sceneCounter >= 105) {
				cutscene = false;
				scene = -1;
				dia = angry;
				diaN = 0;
				setText();
				talking = true;
				t = setTimeout(mainLoop, tickTime);
				sceneCounter = 0;
				return;
			}
			break;
		case TRANSITION:
			if (sceneCounter == 20) {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
			} 
			if (sceneCounter == 45) {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
			} 
			if (sceneCounter == 60) {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
			} 
			if (sceneCounter == 70) {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
			} 
			if (sceneCounter == 74) {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
			} 
			if (sceneCounter == 76) {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
			} 
			if (sceneCounter == 78) {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
			} 
			if (sceneCounter == 80) {
				audio.pause();
				audio.src = "music/battle.mp3";
				audio.play();
				ctx.clearRect(0, 0, canvas.width, canvas.height);
			} 
			if (sceneCounter > 80) {
				cutscene = false;
				scene = -1;
				t = setTimeout(battleLoop, tickTime);
				sceneCounter = 0;
				flipAdv.xPos = 10;
				flipAdv.yPos = -50;
				battle = true;
				return;
			} 
			break;
	}
	if (staticShow) {
		if (Math.random() > .98) {
			effectAudio.pause();
			effectAudio.src = "music/static.mp3";
			effectAudio.play();
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.drawImage(static.img, static.xPos, static.yPos);
		}
	}
	clearTimeout(t);
	t = setTimeout(runScene, tickTime);
}

function runCredits() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	if (sceneCounter < 105) {
		sceneCounter++;
	}
	credBob++;
	if (credBob > 1) {
		credBob = 0;
	}

	if (sceneCounter == 20) {
		effectAudio.src = "music/attack.mp3";
		effectAudio.play();
	}

	if (sceneCounter == 100) {
		audio.src = "music/main.mp3";
		audio.play();
	}

	for (var i = 0; i < credits.length; i++) {
		ctx.drawImage(credits[i].text.img, credits[i].text.xPos, credits[i].text.yPos);
		credits[i].text.yPos -= 3;
	}

	for (var i = 0; i < credChar.length; i++) {
		if (credBob < 1 && i % 2 == 0) {
			ctx.drawImage(credChar[i].img, credChar[i].xPos, credChar[i].yPos);
		} else if(credBob > 0 && i % 2 == 1){
			ctx.drawImage(credChar[i].img, credChar[i].xPos, credChar[i].yPos);
		}

		if (credChar[0].yPos > 400) {
			credChar[i].yPos -= 3;
		}
	}

	clearTimeout(t);
	t = setTimeout(runCredits, tickTime);
}

function selectorLeft() {
	if (selector.xPos > selectorX) {
		selector.xPos = selectorX;
	}
}

function selectorRight() {
	if (selector.xPos == selectorX) {
		selector.xPos += 330;
	}
}

function selectorUp() {
	if (selector.yPos > selectorY) {
		selector.yPos = selectorY;
	}
}

function selectorDown() {
	if (selector.yPos == selectorY) {
		selector.yPos += 100;
	}
}

function battleAction() {
	if (!actionMenu) {
		if (selector.xPos != selectorX && selector.yPos != selectorY) {
			dia = runT;
			diaN = 0;
			setText();
			talking = true;
			return;
		}
		if (selector.xPos != selectorX) {
			dia = magicT;
			diaN = 0;
			setText();
			talking = true;
			return;
		}
		if (selector.yPos != selectorY) {
			dia = bagT;
			diaN = 0;
			setText();
			talking = true;
			return;
		}
	} else {
		if (battleStage == 0) {
			if (selector.xPos == selectorX && selector.yPos != selectorY) {
				dia = slamT;
				diaN = 0;
				setText();
				talking = true;
				return;
			}
		}
		if (battleStage == 1) {
			if (selector.xPos == selectorX && selector.yPos != selectorY) {
				dia = cryT;
				diaN = 0;
				setText();
				talking = true;
				return;
			}
			if (selector.xPos != selectorX && selector.yPos == selectorY) {
				dia = cryT;
				diaN = 0;
				setText();
				talking = true;
				return;
			}
		}
		if (battleStage == 2) {
			if (!(selector.xPos == selectorX && selector.yPos == selectorY)) {
				dia = begT;
				diaN = 0;
				setText();
				talking = true;
				return;
			}
		}
		if (battleStage == 3) {
			audio.pause();
			dia = acceptT;
			diaN = 0;
			setText();
			talking = true;
			return;
		}
	}

	actionMenu = !actionMenu;
}

window.onkeyup = function(e) {
	var key = e.key;

	if (!started) {
		if (key == ' ') {
			started = true;
			return;
		}
	}

	if (introHap) {
		if (key == ' ') {
			audio.pause();
			audio.src = "music/chill.mp3";
			audio.play();
			mainLoop();
			introHap = false;
			return;
		}
	}

	if (!cutscene) {
		if (!talking) {
			if (key == 'a') {
				if (!battle) {
					moveLeft();
				} else {
					selectorLeft();
				}
				return;
			}
			if (key == 'd') {
				if (!battle) {
					moveRight();
				} else {
					selectorRight();
				}
				return;
			}
			if (key == 'w') {
				if (battle) {
					selectorUp();
				}
				return;
			}
			if (key == 's') {
				if (battle) {
					selectorDown();
				}
				return;
			}
			if (key == ' ') {
				if (!battle) {
					interact();
				} else {
					battleAction();
				}
			}
		} else {
			if (key == ' ') {
				contTalk++;
			}
		}
	}
}

window.onkeypress = function(e) {
	var key = e.key;

	if(pressed) {
        return;
    }
    pressed = true;
    setTimeout(function() { pressed = false }, 175);

	if (!cutscene) {
		if (!talking) {
			if (key == 'a') {
				if (!battle) {
					moveLeft();
				}
				return;
			}
			if (key == 'd') {
				if (!battle) {
					moveRight();
				}
				return;
			}
		}
	}
}