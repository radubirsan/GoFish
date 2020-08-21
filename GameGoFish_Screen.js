Intro = [
	["0:38", "0:40"],
	["0:10", "0:40"]
];
VaryGood = [
	["1:17,5", "1:19,5"],
	["1:19,5", "1:20,8"],
	["1:20,8", "1:24"]
];
ThatsReallyGood = [
	["2:18", "2:18"],
	["2:18,8", "2:21"],
	["2:21", "2:25"]
];
SoryPartner = [
	["1:24", "1:26"],
	["", ""],
	["", ""]
];
DoYouHave = [
	["1:04:5", "1:07:1"],
	["1:06,1", "1:07,5"],
	["1:07,5", "1:10"],
	["1:10", "1:17"]
];

GetCardFromDeck = [
	["40", "42"],
	["43", "44"],
	["44", "47"],
	["47", "48,5"]
]
TakeHatOff = [
	["49.3", "52,5"],
	["52,5", "54,7"],
	["54,7", "57,1"],
	["57,1", "1:00"],
	["1:00", "1:03"]
]
AreYouTryingToTrickMe = [
	["1:23", "1:25,5"],
	["1:25,5", "1:28,5"],
	["1:28,5", "1:31,8"]
]
AnyMoreFishingAndIllneedMore = [
	["1:31,8", "1:34,5"],
	["1:34,5", "1:37,5"]
]
LadyLuckIsSmilingAtYou = [
	["1:37,5", "1:40"],
	["1:40", "1:42,8"],
	["1:42,8", "1:46"],
	["1:46", "1:48,5"]
]
YouPlayedRealyWellPartner = [
	["1:48,5", "1:55"]
]
MustBeDifficultHoldingOllThemCards = [
	["1:55", "01:58"],
	["01:58", "2:01"],
	["2:01", "2:03,8"],
	["2:03,8", "2:06,8"],
	["2:06,8", "2:16"]
]

NiceGoingButIDontHaveIt = [
	["2:25", "2:29"],
	["2:29", "2:33"],
	["2:33", "2:38"]
];
LetsMoveAlong = [
	["2:33,5", "2:42"],
	["2:42", "2:43,5"],
	["2:43,5", "2:47"],
	["2:47", "2:49"],
	["2:49", "2:50,3"]
]
Jockes = [
	["2:50,3", "2:53,5"],
	["2:53,5", "2:57,5"],
	["2:57,5", "3:00"],
	["3:00", "3:03"]
]
SorryPartnerYouDontHaveTheCard = [
	["3:03", "3:07,8"],
	["3:07,8", "3:11,8"],
	["3:11,8", "3:14"],
	["3:14", "3:16,4"],
	["3:16,4", "3:18,2"]
]

SHUFFLE = function (array) {
	var currentIndex = array.length,
		temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

function Video()
{
  console.log("Video Player loaded");

}

window._setVideoSource = function  (screenName, autoplay, dimensionChange, getThumb) {//console.log("_set VideoSource")
	
	window.PAUSEAT = null;
	if (screenName) {
		$('#simVideo')[0].setAttribute("src", screenName);
	} else {
		$('#simVideo')[0].setAttribute("src", "");
		setVideoDimensions(null)
		$('#simVideo')[0].pause();
		$('#simVideo')[0].removeAttribute('src'); // empty source
		$('#simVideo')[0].load();
	}
	if(getThumb){
		_playVideoInterval(null, "00:00,00", "00:00,1");
	}
	else if(autoplay) {	
		$('#simVideo')[0].play();
	}
	
	if(dimensionChange){
		setVideoDimensions(dimensionChange)
	}
	

}

_playVideoInterval = function (funct, startAt, pauseAt, pausePlayback) {//console.log("_playVideoInterval")
	
	$("#simVideo")[0].currentTime = MINTOSEC(startAt);
	window.PAUSE_FUNCTION = funct;	
	window.PAUSEAT = MINTOSEC(pauseAt);
	if(!pausePlayback){
		$("#simVideo")[0].play();
		//console.log("Play from interval function" + startAt +"to:"+ pauseAt + "|" + pausePlayback);
	}
}

setVideoDimensions = function(e){
	if(e) {
	//animate video compoent is originaly 400w and 300h we have to scale it.
		//PLAYER.setTransform(e.x, e.y, e.nominalBounds.width * e.scaleX / 400, e.nominalBounds.height * e.scaleY / 300);
	}
	else{
		//PLAYER.setTransform("-100", "-100", "0.1", "0.1")
		
	}
}


$('#simVideo').on('timeupdate', function (e) {
	
	if (window.PAUSEAT && $("#simVideo")[0] && $("#simVideo")[0].currentTime >= window.PAUSEAT) {
		$("#simVideo")[0].pause();
		//console.log("time update has pause function?" )
		//console.log(window.PAUSE_FUNCTION?true:false);
		if (window.PAUSE_FUNCTION ) {
			console.log("calling pause function");
			//$('#simVideo')[0].load();
			window.PAUSE_FUNCTION();	
			
		}
	}
});

window.PAUSE_FUNCTION = null;
window.PAUSEAT = null;



MINTOSEC = function convert(input) {
	
	if(input.indexOf(":") == -1) {
		input = "0:" + input;
		}
    var parts = input.split(':'),
        minutes = +parts[0],
        seconds = +parts[1].split(',')[0];
	
	var resul = (minutes * 60 + seconds).toFixed(0);
	if(parts[1].split(',')[1])
		{
			resul = resul + "." + parts[1].split(',')[1]
		//console.log("IN", resul, parts[1].split(',')[1])
		}
    return parseFloat(resul);
}

MINTOSEC2 = function convert(input) {
    var parts = input.split(':'),
        minutes = +parts[0],
        seconds = +parts[1];
    return (minutes * 60 + seconds).toFixed(3);
}

//=================================================================

var currentFrame = new GameGoFish_Screen();
var selectedCard = null;
var oponentAsksForCardID;
var myCards = [];
var dogCards = [];
var cardDeck = [];
var xPos = 0;
var numDealCards = 5;
var myTurn = true;
var cards

if('webkitSpeechRecognition' in window){
           recognition =  new webkitSpeechRecognition() || new SpeechRecognition() ;//;
			recognition.continuous = true;
			recognition.interimResults = true;
			recognition.lang = 'de-DE';
        }else if ('SpeechRecognition' in window){
            recognition = new SpeechRecognition();
			recognition.continuous = true;
			recognition.interimResults = true;
			recognition.lang = 'de-DE';
        }
		
function GameGoFish_Screen()
{
    console.log("f7 Game GoFish" );	
	setTimeout(loadCards, 200);
	///_setVideoSource("https://www.lipy.cc/SE/videos/GoFish.mp4", true);
	
	
	_this.addEventListener("click" , startGame);
}
function startGame(){
	console.log("Click")
	_setVideoSource("https://www.lipy.cc/red.webm", true);
	_playVideoInterval(null, Intro[0][0],  Intro[0][1]);	
}
function loadCards() {
	

	if(!_this.card1.hasEventListener("click", clickonCard)){
		_this.card1.addEventListener("click", clickonCard);
		_this.card2.addEventListener("click", clickonCard);
		_this.card3.addEventListener("click", clickonCard);
		_this.card4.addEventListener("click", clickonCard);
		_this.card5.addEventListener("click", clickonCard);
		_this.leftArrow.addEventListener("click", leftArrowClick);
		_this.rightArrow.addEventListener("click", rightArrowClick);
	}
	setVideoDimensions(_this.videoPlace);
	
	_this.oponenctCards.visible = true;
	_this.myCars.visible = true;
	_this.dogSays.text = ""
	_this.oponenctCards.text = '';
	_this.oponenctCardsD.text = '';
	_this.myCars.text = '';
	_this.myCarsD.text = '';
	myTurn = true;
	myCards = []
	cardDeck = []
	xPos = 0;
	
	if (!cards || cards.length == 0) {
		var demoData = ["donde", "claro", "perdon", "seniora", "biblioteca", "aqui", "ok", "espania", "que", "senor", "carro","comida"]
		var demoDataTranslations = ["zilnic", "year", "special", "doamna", "briefcase", "here", "something", "to give", "to find", "to eat", "to wish","tohelp"]
		console.log("NO CARDS , populating...");	
		cards = [];
		for (var i = 0 ;  i < demoData.length; i++) {
		var obj = new Object();
			obj.name = demoData[i]//"A" + i;
			obj.trans = demoDataTranslations[ i]
			obj.svg = "pardon";
			obj.ex ="🐠"
			obj.audio = "SND_VS_SE01VSS0016";
			cards.push(obj);
		}	
	}

	console.log("Load cards!!", cards.length)
	if (cards && cards.length >= numDealCards + 1) {
		for (var i = 0; i < cards.length; i++) {
			var isEx = cards[i].ex;
			if (isEx && isEx.indexOf("🐠") >= 0) {
				cardDeck.push(i);
			}
		}
		SHUFFLE(cardDeck);
		//Duplicate cards
		var cardsString = cardDeck.join("*")
		cardsString += "*" + cardsString;
		cardDeck = cardsString.split("*");

		myCards = []
		dogCards = [];
		SHUFFLE(cardDeck);
		
		do {
			var randomCard  = Math.floor(Math.random() * cardDeck.length);
			if(myCards.indexOf(cardDeck[randomCard]) == -1){
				myCards.push(cardDeck[randomCard]);		
				cardDeck.splice(randomCard, 1);
			}
		}
		while(myCards.length < numDealCards)
		
		do {
			var randomCard  = Math.floor(Math.random() * cardDeck.length);
			if(dogCards.indexOf(cardDeck[randomCard]) == -1){
				dogCards.push(cardDeck[randomCard]);		
				cardDeck.splice(randomCard, 1);
			}
		}
		while(dogCards.length < numDealCards)
		
		_this.cardsLeftInDeck.text = cardDeck.length;
		SHUFFLE(cardDeck);
		refreshPlayersCards();
		_this.cardDeck.addEventListener("click", refreshPlayersCards);
	}
}

function leftArrowClick() {
	if (xPos > 0) {
		xPos -= 1;
		refreshPlayersCards()
	}
}
function rightArrowClick() {
	if(  myCards.length - xPos > 2){
		xPos += 1;
		refreshPlayersCards()
	}
}

function clickonCard(e) {
	window.document.dispatchEvent(new CustomEvent("stopRecodingAndPlayback", { detail: _this } ));

	if (!myTurn){//_this.dogSays.text.indexOf("Do you have") == 0)
		console.log("oponent turn",oponentAsksForCardID,  cards[oponentAsksForCardID].name ,  myCards.indexOf(oponentAsksForCardID) ); 
		if (oponentAsksForCardID > -1 && myCards.indexOf(oponentAsksForCardID) > -1) {
			
			
			_this.scoreD.text = parseInt(_this.scoreD.text) + 1
			_this.oponenctCardsD.text +=cards[oponentAsksForCardID].name +  "\n";			
			dogCards.splice(dogCards.indexOf(oponentAsksForCardID), 1);		
			myCards.splice(myCards.indexOf(oponentAsksForCardID), 1);
			console.log("yes I have it"); 
			
			if(e.currentTarget.id != oponentAsksForCardID) {
				
				console.log("Hmmm are you trying to trick me"  )
				e.currentTarget.bad.visible = true;
				selectedCard = e.currentTarget;
				for(var i=1; i<	6;i++){if(_this["card" + i].id==oponentAsksForCardID){_this["card" + i].selected.visible = true}}	
				setTimeout(function () {
					selectedCard.bad.visible = false;
								
					refreshPlayersCards();
					_playVideoInterval(oponentAsksAgain, DoYouHave[0][0], DoYouHave[0][1])
				}, 5000)
			}
			else{
				refreshPlayersCards();
				_playVideoInterval(oponentAsksAgain, DoYouHave[0][0], DoYouHave[0][1])
			}
			
			
			
			
		} else {
			_playVideoInterval(extractDeckCardForOpponent, GetCardFromDeck[1][0], GetCardFromDeck[1][1]);
		}
		oponentAsksForCardID = -1;	
	}

	else  {
		console.log("my turn"); 
		if(selectedCard) {
			selectedCard.selected.visible = false;			
		}
		selectedCard = e.currentTarget;
		selectedCard.selected.visible = true;
		if(e.nativeEvent.shiftKey){
			console.log("skyp mic turn"); 
			checkIfOpponentHasTheCardYouAskedFor();
			return
		}
		

		startRecognitionRequest();
		
	}
}

function refreshPlayersCards() {
	//console.log("refreshPlayersCards");
	for (var i = 0; i < 5; i++) {
		show_card(myCards[i + xPos], i + 1);
	}
	window.document.dispatchEvent(new CustomEvent("stopRecodingAndPlayback", { detail: _this } ));
	_this.oponenctCards.text = '';
	_this.myCars.text = '';
	//dogCards.sort()
	//myCards.sort()
	for (var i = 0; i<dogCards.length; i++) {		
		_this.oponenctCards.text += dogCards[i] + " " +  cards[dogCards[i] ].name + "\n"; 		
	}
	for (var i = 0; i<myCards.length; i++) {		
		if(dogCards.indexOf( myCards[i]) != -1){
			_this.myCars.text += ">"+ myCards[i] + " " +  cards[myCards[i]].name + "\n"; 	
		}	
		else{
			_this.myCars.text += myCards[i] + " " +  cards[myCards[i]].name + "\n"; 	
		}		
	}
	//_this.oponenctCards.text = dogCards.join("\n");
	//_this.myCars.text = myCards.join("\n");
}

function show_card(e, c) {
	
	var source_image = new Image();
	if (c + xPos > myCards.length) {
		_this["card" + c].visible = false;
		return;
	};

	_this["card" + c].visible = true
	source_image.name = cards[e].name;
	source_image.id = cards[e].name;
	source_image.src = "https://lipy.cc/img/" + cards[e].trans + ".png";
	source_image.onload = function () {
		var bmp = new createjs.Bitmap(event.currentTarget);
		_this["card" + c].imgPlace.removeAllChildren();
		_this["card" + c].id = e;
		_this["card" + c].imgPlace.addChild(bmp);
		_this["card" + c].check.visible = false;
		_this["card" + c].bad.visible = false;
		_this["card" + c].selected.visible = false;
		_this["card" + c].t.text = cards[e].name;
		_this["card" + c].c.text = e;
	}
}
if (recognition) {
	recognition.onresult = function (event) {

		var interim_transcript = '';
		var final_transcript = '';
		if (typeof (event.results) == 'undefined') {
			recognition.onend = null;
			recognition.stop();
			return;
		}

		for (var i = event.resultIndex; i < event.results.length; ++i) {
			if (event.results[i].isFinal) {
				final_transcript += event.results[i][0].transcript;
			} else {
				interim_transcript += event.results[i][0].transcript;
			}
		}
		checkAnswersGame(final_transcript, interim_transcript);
	}

}

function oponentAsksAgain() {

	_playVideoInterval(oponentsAsksIfYouHaveCardID, DoYouHave[0][0], DoYouHave[0][1]);
}

function oponentsAsksIfYouHaveCardID() {

	oponentAsksForCardID = dogCards[Math.floor(dogCards.length * Math.random())];

	var w = cards[oponentAsksForCardID]
	console.log("\nDo you have-->" + w.name);

	if (w) {

		speaker(w.name);
		myTurn = false;
		_this.dogSays.text = "Do you have\n" + w.name
	}
	//window.PAUSE_FUNCTION = null;
}

function extractCardForMe() {
	var scos = cardDeck.shift();
	
	console.log("Extracted card", cards[scos].name, cardDeck.length + " cards left in the deck");
	_this.cardsLeftInDeck.text = cardDeck.length;
	selectedCard.bad.visible = true;
	if (myCards.indexOf(scos) == -1) {
		myTurn = false;
		myCards.push(scos);
		refreshPlayersCards();
		console.log( "Your turn oponent!" )
		_playVideoInterval(oponentsAsksIfYouHaveCardID,DoYouHave[2][0],DoYouHave[2][1])
		
	} else {
		myTurn = true;
		console.log( "Lucky draw, My turn !" )
		
		 myCards.splice(myCards.indexOf(scos), 1);
		
		_this.scoreMe.text = parseInt(_this.scoreMe.text) + 1;
		_this.myCarsD.text +=cards[scos].name +  "\n";
		
		_playVideoInterval(refreshPlayersCards,LadyLuckIsSmilingAtYou[0][0],LadyLuckIsSmilingAtYou[0][1])
	}
	refreshPlayersCards();
}

function extractDeckCardForOpponent() {
	var scos = cardDeck.shift();
	console.log("Oponent extracted card" ,scos,  dogCards.indexOf(scos));
	console.log(dogCards)
	//selectedCard.bad.visible = true;
	if (dogCards.indexOf(scos) <= -1) {
		dogCards.push(scos);
		_this.dogSays.text = ""
		myTurn = true
		_playVideoInterval(refreshPlayersCards,AnyMoreFishingAndIllneedMore[0][0],AnyMoreFishingAndIllneedMore[0][1])

	} else {
		myTurn = false
		console.log("Lucky draw dog!" +  cards[scos].name)
		_this.scoreD.text = parseInt(_this.scoreD.text) + 1;
		_this.oponenctCardsD.text +=  cards[scos].name +  "\n";			
		dogCards.splice(dogCards.indexOf(scos), 1);
		_playVideoInterval(oponentsAsksIfYouHaveCardID,DoYouHave[0][0],DoYouHave[0][1])
	
		
	}
	refreshPlayersCards();
}

function getCardFromDog() {
	refreshPlayersCards()
	_playVideoInterval(refreshPlayersCards,GetCardFromDeck[3][0],GetCardFromDeck[3][1])
}

function checkIfOpponentHasTheCardYouAskedFor() {
	console.log("check if opponent has card:" + cards[selectedCard.id].name)
	_this.youSay.text = "Oponent do you have \n" + cards[selectedCard.id].name + "?"
	var indexOFDog = dogCards.indexOf(selectedCard.id)
	if (indexOFDog >= 0) {
		
		_this.scoreMe.text = parseInt(_this.scoreMe.text) + 1;
		_this.myCarsD.text += cards[dogCards[indexOFDog]].name +  "\n";
		
		dogCards.splice(indexOFDog, 1);
		myCards.splice(myCards.indexOf(selectedCard.id), 1);
		_playVideoInterval(getCardFromDog,ThatsReallyGood[0][0],ThatsReallyGood[0][1])
		console.log("Oponent has "+ cards[selectedCard.id].name);

	} else {
		console.log("Oponent doesent have "+ cards[selectedCard.id].name)		
		_playVideoInterval(extractCardForMe,GetCardFromDeck[1][0],GetCardFromDeck[1][1])
		
	}

}

function checkAnswersGame(ft, it) {
	
	console.log("Compare cards, ", selectedCard.t.text, ft, it);
	if (COMPARE(ft, selectedCard.t.text) > 0.1 || COMPARE(it, selectedCard.t.text) > 0.1) {
		window.document.dispatchEvent(new CustomEvent("stopRecodingAndPlayback", { detail: _this } ));
		selectedCard.selected.visible = false;
		selectedCard.check.visible = true;
		console.log("RECOGNIZED");
		soundbar.visible = false;
		checkIfOpponentHasTheCardYouAskedFor();
	}
}

function randomArrayItem(e) {
	return Math.floor((e.length - 1) * Math.random())
}

