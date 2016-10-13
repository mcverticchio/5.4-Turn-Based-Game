var $ = require('jquery');
var _ = require('underscore');
var models = require('./models');
var userPlayer,
    opponentPlayer;

$(function(){

});

var userPlayer = new models.GoodGuy({name: 'Harry'});

console.log(userPlayer);

userPlayer.decreaseHealth();

console.log(userPlayer);
