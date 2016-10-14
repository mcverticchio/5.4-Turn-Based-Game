var $ = require('jquery');
var _ = require('underscore');
var models = require('./models');

$(function(){
  var userPlayer,
      opponentPlayer;

  var opponentMinorAttack = function(){
    // window.setTimeout(opponentPlayer.weakAttack(), 500);
    // window.setTimeout(userPlayer.decreaseHealth(), 700);
    // window.setTimeout($('#user-health-bar').css("width", userPlayer.health + '%'), 720);
    opponentPlayer.weakAttack();
    userPlayer.decreaseHealth();
    console.log("Opponent minor attack");
  };

  var opponentHealthPotion = function(){
    opponentPlayer.increaseHealth();
    console.log('Health Potion taken by opponent!');
  };

  var opponentStrongAttack = function(){
    userPlayer.decreaseHealthStrong();
    console.log('Opponent strong attack!');
  };

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

  var badGuyActions = [
    opponentMinorAttack,
    opponentHealthPotion,
    opponentStrongAttack
  ];

//#####################################################################
//Begin game logic
//#####################################################################

  //#####################################################################
  //Start Screen
  //#####################################################################

  $('.good-guy').click(function(event){
    event.preventDefault();
    var characterName = $(this).data('name');
    userPlayer = _.filter(goodGuysArray, {'name': characterName})[0];
    console.log(userPlayer);
    return userPlayer;
  });

  $('#select-button').on('click', function(event){
    event.preventDefault();
    showStartButtons();
    $('.start-buttons').on('click', function(event){
      event.preventDefault();
      if($(this).is('#start-game')){
        if(userPlayer === undefined){
          alert('Please choose a player!');
          return;
        }
        playingScreen();
      }else if($(this).is('#choose-another-player')){
        changeCharacter();
      }
    });
  });

  //#####################################################################
  //Fight Screen
  //#####################################################################

  $('#attack').on('click', function(event){
    event.preventDefault();
    minorAttack();
    console.log(userPlayer);
    console.log(opponentPlayer);
    var opponentAttack = randomOpponentAttack();
    (opponentAttack)();
    checkWin();
  });

  $('#increase-health').on('click', function(event){
    event.preventDefault();
    healthPotionCheck();
    increaseUserHealth();
  });

<<<<<<< e7e7e52a39cc15718170c769bcb5749d7bab5a5a
  $('#strong-attack').on('click', function(event){
    event.preventDefault();
    strongAttackCheck();
    userStrongAttack();
=======
    console.log(userPlayer);

    $('.potion-buttons').on('click', function(event){
      event.preventDefault();
      if($(this).is('#increase-health')){
        increaseUserHealth();
      }else if ($(this).is('#strong-attack')){
        userStrongAttack();
      }
    });
>>>>>>> Working on things after speaking with Dan.
  });


  //#####################################################################
  //Functions library
  //#####################################################################

  function pickOpponent(){
    opponentPlayer = badGuysArray[Math.floor(Math.random()*badGuysArray.length)];
    // if (userPlayer === undefined){
    //
    // }
    return opponentPlayer;
  }

  function playingScreen(){
    alert('playingScreen has been triggered.');
    pickOpponent();
    console.log(opponentPlayer);
  }

  function minorAttack(){
    userPlayer.weakAttack();
    opponentPlayer.decreaseHealth();
    // window.setTimeout($('#opponent-health-bar').css("width", opponentPlayer.health + '%'), 720);
  }

  function showStartButtons(){
    $('#start-game').show();
    $('#choose-another-player').show();
    $(this).hide();
  }

  function changeCharacter(){
    $('#start-game').hide();
    $('#select-button').show();
    $('#choose-another-player').hide();
    $(this).hide();
  }

  function strongAttackCheck(){
    if(userPlayer.numOfStrongAttackPotion <= 0){
      $('#strong-attack').hide();

    }else{
      $('#strong-attack').show();
    }
  }

  function healthPotionCheck(){
    if(userPlayer.numOfHealthPotion <= 1){
      $('#increase-health').hide();
      // $('#increase-health').disabled = true;
    }else{
      $('#increase-health').show();
    }
  }

  function increaseUserHealth(){
    userPlayer.increaseHealth();
    userPlayer.numOfHealthPotion -= 1;
    console.log(userPlayer);



  }

  function userStrongAttack(){
    opponentPlayer.decreaseHealthStrong();
    userPlayer.numOfStrongAttackPotion -= 1;
    console.log(opponentPlayer);

    $('#strong-attack').hide();
  }

  function randomOpponentAttack(){
    var opponentAttack = badGuyActions[Math.floor(Math.random()*badGuyActions.length)];
    console.log(opponentAttack);
    return opponentAttack;
  }

  function checkWin(){
    if(userPlayer.health <= 0){
      alert('You lose!');
    }else if(opponentPlayer.health <= 0){
      alert('You win!');
    }
  }
}());
