var $ = require('jquery');
var _ = require('underscore');
var models = require('./models');

$(function(){
  var userPlayer,
      opponentPlayer;

  var goodGuysArray = [
    new models.GoodGuy({name:'Harry', imageURL: 'http://unsplash.it/40/40'}),
    new models.GoodGuy({name:'Hermione', imageURL: 'http://unsplash.it/40/40'}),
    new models.GoodGuy({name:'Hagrid', imageURL: 'http://unsplash.it/40/40'}),
    new models.GoodGuy({name:'Professor Lupin', imageURL: 'http://unsplash.it/40/40'}),
    new models.GoodGuy({name:'Professor Dumbledore', imageURL: 'http://unsplash.it/40/40'}),
  ];

  var badGuysArray = [
    new models.BadGuy({name:'Clown', imageURL: 'http://unsplash.it/40/40'}),
    new models.BadGuy({name:'Zombie', imageURL: 'http://unsplash.it/40/40'}),
    new models.BadGuy({name:'Werewolf', imageURL: 'http://unsplash.it/40/40'}),
    new models.BadGuy({name:'Dracula', imageURL: 'http://unsplash.it/40/40'}),
    new models.BadGuy({name:'Ghost', imageURL: 'http://unsplash.it/40/40'}),
    new models.BadGuy({name:'Spider', imageURL: 'http://unsplash.it/40/40'}),
    new models.BadGuy({name:'Frankenstein', imageURL: 'http://unsplash.it/40/40'}),
  ];

  function pickOpponent(){
    opponentPlayer = badGuysArray[Math.floor(Math.random()*badGuysArray.length)];
    return opponentPlayer;
  }

  pickOpponent();


});
