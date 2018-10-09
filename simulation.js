'use strict';

function Batsman(name, scoreWeight) {
	this._overSummary = [ 0, 1, 2, 3, 4, 5, 'out' ];
	
	this._runScored = 0;
	this._ballFaced = 0;

	this._name = name;
	this._scoreWeight = scoreWeight;
	this._gotOut = false;

	this.getRandomNo = (min, max) => {
		return Math.random() * (max - min) + min;
	}
	
	this.getRun = () => {
		const total_weight = this._scoreWeight.reduce(function (prev, cur, i, arr) {
			return prev + cur;
		});
	
		const random_num = this.getRandomNo(0, total_weight);
		let weight_sum = 0;

		for (let i = 0; i < this._overSummary.length; i++) {
			weight_sum += this._scoreWeight[i];
			weight_sum = +weight_sum.toFixed(2);

			if (random_num <= weight_sum) {
				return this._overSummary[i];
			}
		}
	}
}
	
Batsman.prototype.getBallFaced = function () {
	return this._ballFaced;
},
Batsman.prototype.setBallFaced = function () {
	this._ballFaced++;
}

Batsman.prototype.setRunScored = function(runs) {
	this._runScored+=runs;
}
Batsman.prototype.getRunScored = function() {
	return this._runScored;
}

Batsman.prototype.getName = function () {
	return this._name;
}

Batsman.prototype.getScoreWeight = function () {
	return this._scoreWeight;
}

Batsman.prototype.batsmanIsOut = function () {
	return this._gotOut;
}

Batsman.prototype.setOut = function () {
	this._gotOut = true;
}

function Match(target, overs) {
	this.target = target;
	this.noOfBallsRemaining = overs*6;
	this.overs = overs;

	// add 4 batsman to the batting order 
	this._battingOrder = [
		new Batsman('Kirat Boli', [0.05, 0.30, 0.25, 0.10, 0.15, 0.01, 0.09, 0.05]),
		new Batsman('NS Nodhi', [0.10, 0.40, 0.20, 0.05, 0.10, 0.01, 0.04, 0.10]),
		new Batsman('R Rumrah', [0.20, 0.30, 0.15, 0.05, 0.05, 0.01, 0.04, 0.20]),
		new Batsman('Shashi Henra', [0.30, 0.25, 0.05, 0.00, 0.05, 0.01, 0.04, 0.30])
	];

	this._commentaryList = [];
	this._wicketsFallen = [];
	this._scoredBatsMen = [...this._battingOrder];

	this._score = 0;
	this._ballNo = 1;

	this.startTheMatch = () => {
		this._commentaryList.push(`${this.overs} overs left ${this.target - this._score} runs to to win`)
		console.log('--------------starting the match--------------');
		while (this._ballNo <= this.noOfBallsRemaining) {
			if (this._battingOrder.length < 2) {
				break;
			}
			if (this._score > this.target) {
				break;
			}

			const activeBatsman = this._battingOrder[0];
			activeBatsman.setBallFaced();
			const runs = activeBatsman.getRun();
			switch (runs) {
				case 0:
				case 2:
				case 4:
				case 6:
					this._commentaryList.push(
						this.getCommentaryString(activeBatsman, runs, this._ballNo)
					)
					this._score += runs;
					activeBatsman.setRunScored(runs);
					if (this._ballNo && this._ballNo % 6 === 0) {
						this.changeStrike(this._battingOrder, 0);
					}
					break;
				case 1:
				case 3:
				case 5:
					this._commentaryList.push(
						this.getCommentaryString(activeBatsman, runs, this._ballNo)
					);
					this.changeStrike(this._battingOrder, 0);
					this._score += runs;
					activeBatsman.setRunScored(runs);
					break;
				default:
					this._commentaryList.push(
						this.getCommentaryString(activeBatsman, runs, this._ballNo)
					);
					this._wicketsFallen.push(activeBatsman.getName());
					this._battingOrder = this._battingOrder.slice(1);
					activeBatsman.setOut();
					break;
			}
			if ((this.noOfBallsRemaining - this._ballNo) % 6 === 0) {
				this._commentaryList.push(`${this.overs} overs left ${this.target - this._score} runs to to win`)
				this.overs--;
			}
			this._ballNo++;
		}
	}

	this.getCommentary = function () {
		return this._commentaryList;
	}

	this.getCommentaryString = function(batsman, runs, ball) {
		return `${parseFloat((ball*0.1).toFixed(1))} ${batsman.getName()} scores ${runs}`;
	}

	this.changeStrike = function (batsMen, index = 0) {
		const t = batsMen[index];
		batsMen[index] = batsMen[index + 1];
		batsMen[index] = t;
	}

	this.getResult = function () {
		if (this._score > this.target) {
			return `Won the match by ${4 - this._wicketsFallen.length} wicket and ${this.noOfBallsRemaining - this._ballNo} balls remaining`;
		} else if (this._score < this.target) {
			return `Lost the match by ${4 - this._wicketsFallen.length} wicket and ${this.noOfBallsRemaining - this._ballNo} balls remaining`;
		}
		return 'Match Drawn';
	}

	this.getCommentary = function() {
		return this._commentaryList;
	}

	this.wickets = function() {
		return this._wicketsFallen.length;
	}

	this.getBatsMenIndividualScore = function () {
		return this._scoredBatsMen.map(e => {
			return `${e.getName()} scored - ${e.getRunScored()}${!e.batsmanIsOut() ? '*' : ''}(${e.getBallFaced()})`
		});
	}

};

module.exports = {
	Match,
	Batsman,
}
