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

//#####################################################################
//Begin game logic
//#####################################################################

  //#####################################################################
  //Start Screen
  //#####################################################################

  $('.good-guy').click(function(event){
    event.preventDefault();
    setUserPlayer();
  });

  $('#select-button').on('click', function(event){
    event.preventDefault();
    showStartButtons();
    $('.start-buttons').on('click', function(event){
      event.preventDefault();
      if($(this).is('#start-game')){
        userPlayerCheck();
        playingScreen();
      }else if($(this).is('#choose-another-player')){
        changeCharacter();
      }
    });
  });

  //#####################################################################
  //Fight Screen
  //#####################################################################

  $('#potion').on('click', function(event){
    event.preventDefault();

    healthPotionCheck();
    strongAttackCheck();
    $(this).hide();

    $('.potion-buttons').on('click', function(event){
      event.preventDefault();
      if($(this).is('#increase-health')){
        increaseUserHealth();
      }else if ($(this).is('#strong-attack')){
        userStrongAttack();
      }
    });
  });

  //#####################################################################
  //Functions library
  //#####################################################################

  function pickOpponent(){
    opponentPlayer = badGuysArray[Math.floor(Math.random()*badGuysArray.length)];
    return opponentPlayer;
  }

  function playingScreen(){
    alert('playingScreen has been triggered.');
    pickOpponent();
    console.log(opponentPlayer);
  }

  function minorAttack(){
    window.setTimeout(userPlayer.weakAttack(), 500);
    window.setTimeout(opponentPlayer.decreaseHealth(), 700);
    window.setTimeout($('#opponent-health-bar').css("width", opponentPlayer.health + '%'), 720);
  }

  function setUserPlayer(){
    var characterName = $(this).data('name');
    userPlayer = _.filter(goodGuysArray, {'name': characterName})[0];
  }

  function showStartButtons(){
    $('#start-game').show();
    $('#choose-another-player').show();
    $(this).hide();
  }

  function userPlayerCheck(){
    if(userPlayer === undefined){
      alert('Please choose a player!');
      return;
    }
  }

  function changeCharacter(){
    $('#start-game').hide();
    $('#select-button').show();
    $(this).hide();
  }

  function healthPotionCheck(){
    if(userPlayer.numOfHealthPotion <= 0){
      $('#increase-health').hide();
    }else{
      $('#increase-health').show();
    }
  }

  function strongAttackCheck(){
    if(userPlayer.numOfStrongAttackPotion <= 0){
      $('#strong-attack').hide();
    }else{
      $('#strong-attack').show();
    }
  }

  function increaseUserHealth(){
    userPlayer.increaseHealth();
    userPlayer.numOfHealthPotion -= 1;

    console.log(userPlayer);

    $('#increase-health').hide();
    $('#strong-attack').hide();
    $('#potion').show();
  }

  function userStrongAttack(){
    opponentPlayer.decreaseHealthStrong();
    userPlayer.numOfStrongAttackPotion -= 1;

    console.log(opponentPlayer);
    $('#increase-health').hide();
    $('#strong-attack').hide();
    $('#potion').show();
  }

}());
