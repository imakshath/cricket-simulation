const assert = require('chai').assert;
const expect = require('chai').expect;
const simulation = require('../simulation');

describe('Simulation', function() {
	describe('Batsman', function () {
		const name = 'Akshath';
		const scoreWeight = [0.20, 0.30, 0.20, 0.15, 0.05, 0.01, 0.06, 0.03];
		const result = new simulation.Batsman(name, scoreWeight);
		it('should define batsman and it properties', function() {
			expect(result.getName()).to.equal(name);
			expect(result.getScoreWeight()).to.equal(scoreWeight);
		})
		it('should have some initial values', function () {
			expect(result.batsmanIsOut()).to.equal(false);
		});
	});

	describe('Match', function () {
		const match = new simulation.Match(40, 4);
		it('should return appropriate match summary', function () {
			expect(match.noOfBallsRemaining).to.equal(24);
		})
	});
});