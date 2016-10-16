var $ = require('jquery');
var _ = require('underscore');
var models = require('./models');
var goodGuysTemplate = require('../templates/goodGuysTemplate.hbs');
var badGuysTemplate= require('../templates/badGuysTemplate.hbs');

$(function(){
  var userPlayer,
      opponentPlayer;

  var goodGuysArray = [
    new models.GoodGuy({name:'Harry', imageURL: 'images/harry.png'}),
    new models.GoodGuy({name:'Hermione', imageURL: 'images/hermione.png'}),
    new models.GoodGuy({name:'Hagrid', imageURL: 'images/hagrid.png'}),
    new models.GoodGuy({name:'Neville', imageURL: 'images/neville.png'}),
    new models.GoodGuy({name:'Professor Dumbledore', imageURL: 'images/dumbledore.png'}),
  ];

  var badGuysArray = [
    new models.BadGuy({name:'Clown', imageURL: 'images/clown.jpg'}),
    new models.BadGuy({name:'Zombie', imageURL: 'images/zombies.jpg'}),
    new models.BadGuy({name:'Werewolf', imageURL: 'images/werewolf.jpg'}),
    new models.BadGuy({name:'Dracula', imageURL: 'images/dracula.jpg'}),
    new models.BadGuy({name:'Ghost', imageURL: 'images/EvilGhost.png'}),
    new models.BadGuy({name:'Spider', imageURL: 'images/spider.jpg'}),
    new models.BadGuy({name:'Frankenstein', imageURL: 'images/frankenstein.jpg'}),
  ];

  var randomBackground;

  var backgrounds = [
    ({imageURL: 'http://2.bp.blogspot.com/-8xufGJljK4Q/TokaX6U_edI/AAAAAAAAAyY/hJkLAAodTVs/s1600/cobweb-wallpaper-7-731096.jpg'}),
    ({imageURL: 'https://s-media-cache-ak0.pinimg.com/originals/d1/b6/13/d1b613129846bf595ffe5b5a1bd767d9.jpg'}),
    ({imageURL: 'http://img02.deviantart.net/d273/i/2013/311/1/1/pig_cemetery_background_by_riverkpocc-d6tcm33.png'}),
    ({imageURL: 'http://img11.deviantart.net/9f0c/i/2012/352/c/a/laboratory__animation_bg_by_zerahoc-d5of62p.png'}),
    ({imageURL: 'http://cdn.wallpapersafari.com/41/40/iNAyaW.jpg'})
  ];

//#####################################################################
//Begin game logic
//#####################################################################

  setTimeout(fade_out, 1000);

  function fade_out() {
    $(".openingScreen").fadeOut().empty();
    $(".selectionScreen").show();
  }

  $('#HPMusic').get(0).play();


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
    location.reload();
  });

  //#####################################################################
  //Functions library
  //#####################################################################

  function pickOpponent(){
    opponentPlayer = badGuysArray[Math.floor(Math.random()*badGuysArray.length)];
    return opponentPlayer;
  }

  function playingScreen(){
    pickOpponent();
    $(".selectionScreen").fadeOut().empty();
    $(".fightScreen").show();
    $('.js-badGuysArray').html(badGuysTemplate(opponentPlayer));
    $('.js-goodGuysArray').html(goodGuysTemplate(userPlayer));
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

  // function showFightScreen (){
  //   randomBackground = backgrounds[Math.floor(Math.random()*backgrounds.length)];
  //   $(".fightScreen").css("background", "randomBackground")
  //   $(".fightScreen").show()
  // }


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
