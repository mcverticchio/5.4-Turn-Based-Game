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
    new models.BadGuy({name:'Clown', imageURL: 'images/clown.gif', backgroundImageURL: 'http://i.ytimg.com/vi/lST0UVQaaXI/maxresdefault.jpg'}),
    new models.BadGuy({name:'Zombie', imageURL: 'images/zombie.gif', backgroundImageURL: 'http://il3.picdn.net/shutterstock/videos/2683964/thumb/1.jpg'}),
    new models.BadGuy({name:'Werewolf', imageURL: 'images/werewolf.gif', backgroundImageURL: 'https://i.ytimg.com/vi/uBjbe3UBg6U/maxresdefault.jpg'}),
    new models.BadGuy({name:'Dracula', imageURL: 'images/dracula.gif', backgroundImageURL: 'http://cdn.wallpapersafari.com/41/40/iNAyaW.jpg'}),
    new models.BadGuy({name:'Ghost', imageURL: 'images/EvilGhost.gif', backgroundImageURL: 'http://pre04.deviantart.net/2ff8/th/pre/i/2012/338/c/8/free_background_haunted_series_by_h_stock-d5n0xc1.jpg'}),
    new models.BadGuy({name:'Spider', imageURL: 'images/spider.gif', backgroundImageURL: 'http://2.bp.blogspot.com/-8xufGJljK4Q/TokaX6U_edI/AAAAAAAAAyY/hJkLAAodTVs/s1600/cobweb-wallpaper-7-731096.jpg'}),
    new models.BadGuy({name:'Frankenstein', imageURL: 'images/frankenstein.gif', backgroundImageURL: 'http://ksean.com/blog/wp-content/uploads/2010/08/haunted-house-VizDev-copy.jpg'}),
  ];

//#####################################################################
//Begin game logic
//#####################################################################

  setTimeout(fade_out, 2000);

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

    window.setTimeout(function(){
    opponentPlayer.attack(userPlayer);
    console.log(userPlayer);
    console.log(opponentPlayer);
    checkWin()}, 2000)
  });


  $('.potion-buttons').on('click', function(event){
    event.preventDefault();
    checkWinVar = true;
    if($(this).is('#increase-health')){
      userPlayer.increaseHealth();
      checkWin();
      if(checkWinVar !== true){return;}
      window.setTimeout(function(){
      opponentPlayer.attack(userPlayer);
      console.log(userPlayer);
      console.log(opponentPlayer);
      checkWin()}, 2000);
      if(userPlayer.numOfHealthPotion < 1){
        $(this).hide();
      }
    }else if ($(this).is('#strong-attack')){
      opponentPlayer.decreaseHealthStrong();
      userPlayer.strongAttack();
      checkWin();
      if(checkWinVar !== true){return;}
      window.setTimeout(function(){
      opponentPlayer.attack(userPlayer);
      console.log(userPlayer);
      console.log(opponentPlayer);
      checkWin()}, 2000);
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
    $('.fightScreen').css('background-image', opponentPlayer.backgroundImageURL);
    $(".fightScreen").show();
    $('.js-badGuysArray').html(badGuysTemplate(opponentPlayer));
    $('.js-goodGuysArray').html(goodGuysTemplate(userPlayer));
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
