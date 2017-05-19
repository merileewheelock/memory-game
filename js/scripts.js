$(document).ready(function(){

	var cards = [
		'<img src="images/hp1.png">',
		'<img src="images/hp2.png">',
		'<img src="images/hp3.png">',
		'<img src="images/hp4.png">',
		'<img src="images/hp5.png">',
		'<img src="images/hp6.png">',
		'<img src="images/hp7.png">',
		'<img src="images/hp8.png">',
		'<img src="images/hp1.png">',
		'<img src="images/hp2.png">',
		'<img src="images/hp3.png">',
		'<img src="images/hp4.png">',
		'<img src="images/hp5.png">',
		'<img src="images/hp6.png">',
		'<img src="images/hp7.png">',
		'<img src="images/hp8.png">'
	];
	
	var copyCards = cards.slice();
	// console.log(copyCards);

	var randomCards = [];
	shuffleCards();


	// var theLength = cards.length - 1;
	// var toSwap; // The index we will swap  (i.e. the random number)
	// var temp; // A temporary variable to hold reference to index variable i points to
	// for (i = theLength; i > 0; i--) {
	//     toSwap = Math.floor(Math.random() * i);
	//     temp = cards[i];
	//     cards[i] = cards[toSwap];
	//     cards[toSwap] = temp;
	// }
	// console.log(cards);

	// var shuffledArray = [];
	// for (i = 0; i < cards.length; i++){
	// 	var rand = Math.floor(Math.random() * cards.length);
	// 	shuffledArray.push(cards[rand]);
	// 	cards.splice(rand, 1);
	// }
	// console.log(shuffledArray);

	// randomNumArray = [];
	// while (randomNumArray.length < cards.length){
	// 	randomSpot = Number(Math.floor(Math.random() * 8));
	// 	randomNumArray.push(randomSpot);
	// }
	// console.log(randomNumArray);

	var winMessage = '';

	var gridSize = 16;
	var memoryGameHTML = '';
	

	for (let i = 0; i < gridSize; i++){
		var card = randomCards[i];
		// if (i < 2){
		// 	card = cards[0];
		// }else if (i < 4){
		// 	card = cards[1];
		// }else if (i < 6){
		// 	card = cards[2];
		// }else if (i < 8){
		// 	card = cards[3];
		// }else if (i < 10){
		// 	card = cards[4];
		// }else if (i < 12){
		// 	card = cards[5];
		// }else if (i < 14){
		// 	card = cards[6];
		// }else{
		// 	card = cards[7];

		memoryGameHTML += '<div class="card col-sm-3">';
			memoryGameHTML += '<div class="card-holder">';
				memoryGameHTML += `<div class="card-front">${card}</div>`;
				memoryGameHTML += `<div class="card-back"></div>`;
			memoryGameHTML += '</div>';
		memoryGameHTML += '</div>';
	}
	// console.log(memoryGameHTML);
	$('.mg-contents').html(memoryGameHTML);

	$('.peek').click(function(){
		$('.card-holder').toggleClass('flip');
		setTimeout(function(){
			$('.card-holder').removeClass('flip');
		}, 1000);
	});

	$('.card-holder').click(function(){
		$(this).toggleClass('flip');

		// User has flipped card. If there is another one turned over, see if they match. Otherwise, do nothing.
		// Set up an array called cardsUp that contains all elements with a class of .flip. That's how we know they are face up.
		var cardsUp = $('.flip');
		if(cardsUp.length >= 2){
			// Two cards have a flip class (face up) or we wouldn't be here
			// Check to see if they are the same.
			// cardsUp[0] is targeting card-holder. We need to target card-front, which is .children[0] (look at console.dir)
			// the second children[0] tag is the img tag (need to grab the src attibute)
			var card1 = cardsUp[0].children[0].children[0].src;
			var card2 = cardsUp[1].children[0].children[0].src;
			// cardsUpImages = cardsUp.find('.card-front img'); // This will create an array, same as above
			if (card1 == card2){
				// They match! The images are exactly the same.
				cardsUp.removeClass('flip');
				cardsUp.addClass('matched'); // Once they match, the class .matched will replace the class .flip
				var matchedCards = $('.matched'); // This is an array
				if (matchedCards.length == gridSize){
					// Then every card has been matched. Game won!
					// alert("You have won the game!");
					winMessage = $('.win').html("<strong>Congratulations! You have passed your O.W.L.s!</strong>");
				}
			}else{
				// They are not the same, nice try. Flip them back over.
				setTimeout(function(){
					cardsUp.removeClass('flip');
				}, 2000) // Wait 2 seconds to flip back over
				
			}
		}

	});

	function shuffleCards(){
		for(let i = 0; i < cards.length; i++){
			var rand = Math.floor(Math.random() * copyCards.length);
			randomCards.push(copyCards.splice(rand,1)[0]);
		}
	}

	$('.reset').click(function(){
		copyCards = cards.slice();
		randomCards = [];
		shuffleCards();
		// $('.mg-contents').html(memoryGameHTML);
		$('.win').html('&nbsp');
		$('.card-holder').removeClass('flip matched');
	});

});