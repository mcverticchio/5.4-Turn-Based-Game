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

  $('.good-guy').click(function(event){
    event.preventDefault();
    var characterName = $(this).data('name');
    userPlayer = _.filter(goodGuysArray, {'name': characterName})[0];
    console.log(userPlayer);
  });

  $('#select-button').on('click', function(event){
    event.preventDefault();
    $('#start-game').show();
    $('#choose-another-player').show();
    $(this).hide();
    $('.start-buttons').on('click', function(event){
      event.preventDefault();
      if($(this).is('#start-game')){
        if(userPlayer === undefined){
          alert('Please choose a player!');
          return;
        }
        playingScreen();              //WRITE PLAYING SCREEN FUNCTION!
      }else if ($(this).is('#choose-another-player')){
        $('#start-game').hide();
        $('#select-button').show();
        $(this).hide();
      }
    });
  });

  function playingScreen(){
    alert('playingScreen has been triggered.');
  }





































  function minorAttack(){
    window.setTimeout(userPlayer.weakAttack(), 500);
    window.setTimeout(opponentPlayer.decreaseHealth(), 700);
    window.setTimeout($('#opponent-health-bar').css("width", opponentPlayer.health + '%'), 720);
  }
});
