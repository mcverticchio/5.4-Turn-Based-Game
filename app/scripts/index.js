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
    new models.GoodGuy({name:'Neville', imageURL: 'http://unsplash.it/40/40'}),
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

setTimeout(fade_out, 1000);

function fade_out() {
  $(".openingScreen").fadeOut().empty();
  $(".selectionScreen").show();
}

// $('#HPMusic').play();
// $('#start').on('click', function() {
//     $('#buzzer').get(0).play();
// });

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

  var checkWinVar;
  $('#attack').on('click', function(event){
    event.preventDefault();
    checkWinVar = true;
    opponentPlayer.decreaseHealth();
    checkWin();
    if(checkWinVar !== true){return;}
    opponentPlayer.attack(userPlayer);
    console.log(userPlayer);
    console.log(opponentPlayer);
    checkWin();
  });


  $('.potion-buttons').on('click', function(event){
    event.preventDefault();
    checkWinVar = true;
    if($(this).is('#increase-health')){
      userPlayer.increaseHealth();
      checkWin();
      if(checkWinVar !== true){return;}
      opponentPlayer.attack(userPlayer);
      console.log(userPlayer);
      console.log(opponentPlayer);
      checkWin();
      if(userPlayer.numOfHealthPotion < 1){
        $(this).hide();
      }
    }else if ($(this).is('#strong-attack')){
      opponentPlayer.decreaseHealthStrong();
      userPlayer.strongAttack();
      checkWin();
      if(checkWinVar !== true){return;}
      opponentPlayer.attack(userPlayer);
      console.log(userPlayer);
      console.log(opponentPlayer);
      checkWin();
      if(userPlayer.numOfStrongAttackPotion < 1){
        $(this).hide();
      }
    }
  });

  $('#replayGame').on('click', function(event){
    event.preventDefault();
    $(".fightScreen").hide();
    $(".openingScreen").show();
  });

  //#####################################################################
  //Functions library
  //#####################################################################

  function pickOpponent(){
    opponentPlayer = badGuysArray[Math.floor(Math.random()*badGuysArray.length)];
    return opponentPlayer;
  }

  function playingScreen(){
    // alert('playingScreen has been triggered.');
    pickOpponent();
    $(".selectionScreen").fadeOut().empty();
    $(".fightScreen").show();
      // if(opponentPlayer === badGuysArray[0]){
      //   $(".fightSreen").css("background", "url('http://cdn.wallpapersafari.com/41/40/iNAyaW.jpg')")
      //   $(".fightScreen").show();
      // }
      // if(opponentPlayer === badGuysArray[1]){
      //   $(".fightSreen").css("background", "url('http://cdn.wallpapersafari.com/41/40/iNAyaW.jpg')")
      // }
      // if(opponentPlayer === badGuysArray[2]){
      //   $(".fightSreen").css("background", "url('http://cdn.wallpapersafari.com/41/40/iNAyaW.jpg')")
      // }
      // if(opponentPlayer === badGuysArray[3]){
      //   $(".fightSreen").css("background", "url('http://cdn.wallpapersafari.com/41/40/iNAyaW.jpg')")
      // }
      // if(opponentPlayer === badGuysArray[4]){
      //   $(".fightSreen").css("background", "url('http://cdn.wallpapersafari.com/41/40/iNAyaW.jpg')")
      // }
      // if(opponentPlayer === badGuysArray[5]){
      //   $(".fightSreen").css("background", "url('http://cdn.wallpapersafari.com/41/40/iNAyaW.jpg')")
      // }
      // else{
      //   alert('no luck');
      // }
    console.log(opponentPlayer);
  }


  function showStartButtons(){
    $('#start-game').show();
    $('#choose-another-player').show();
    $(this).hide();
  }

  function changeCharacter(){
    $('#start-game').hide();
    $('#select-button').show();
    $('#choose-another-player').show();
    $(this).hide();
  }

  function checkWin(){
    if(userPlayer.health <= 0){
      alert('You lose!');
      checkWinVar = false;
      $('#replayGame').show();
      return;
    }else if(opponentPlayer.health <= 0){
      alert('You win!');
      checkWinVar = false;
      $('#replayGame').show();
      return;
    }
  }

}());
