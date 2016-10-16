var $ = require('jquery');
var _ = require('underscore');
var models = require('./models');
var goodGuysTemplate = require('../templates/goodGuysTemplate.hbs');
var badGuysTemplate = require('../templates/badGuysTemplate.hbs');
var listTemplate = require('../templates/listTemplate.hbs');

$(function(){
  var userPlayer,
      opponentPlayer;

  var goodGuysArray = [
    new models.GoodGuy({name:'Harry', imageURL: 'images/harry.png', description: 'The boy who lived!'}),
    new models.GoodGuy({name:'Hermione', imageURL: 'images/hermione.png', description: 'The smart Mudblodd'}),
    new models.GoodGuy({name:'Hagrid', imageURL: 'images/hagrid.png', description: 'The gamekeeper'}),
    new models.GoodGuy({name:'Neville', imageURL: 'images/neville.png', description: 'The surprise'}),
    new models.GoodGuy({name:'Professor Dumbledore', imageURL: 'images/dumbledore.png', description: 'The great'}),
  ];

  var badGuysArray = [
    new models.BadGuy({name:'Clown', imageURL: 'images/clown.gif'}),
    new models.BadGuy({name:'Zombie', imageURL: 'images/zombie.gif'}),
    new models.BadGuy({name:'Werewolf', imageURL: 'images/werewolf.gif'}),
    new models.BadGuy({name:'Dracula', imageURL: 'images/dracula.gif'}),
    new models.BadGuy({name:'Ghost', imageURL: 'images/EvilGhost.gif'}),
    new models.BadGuy({name:'Spider', imageURL: 'images/spider.gif'}),
    new models.BadGuy({name:'Frankenstein', imageURL: 'images/frankenstein.gif'}),
  ];

  var backgrounds = [
    'http://www.salsabo.com/wp-content/uploads/2015/10/124276_1280x720.jpg',
    'http://img15.deviantart.net/6193/i/2010/311/6/5/silver_doe_harry_potter_7_by_s_im-d32cbyq.jpg',
    'http://vignette3.wikia.nocookie.net/es.harrypotter/images/a/ac/B4C37M1.jpg/revision/latest?cb=20141008131510',
    'http://img12.deviantart.net/4925/i/2011/148/3/8/hogwarts_castle_wallpaper_by_hardgamerpt-d3gt1em.jpg',
    'http://vignette2.wikia.nocookie.net/harrypotter/images/c/c0/QuidditchWorldCup.png/revision/latest?cb=20140329010247'
  ]

  var randomBackground = backgrounds[Math.floor(Math.random()*backgrounds.length)];


//#####################################################################
//Begin game logic
//#####################################################################


  setTimeout(fade_out, 5000);


  function fade_out() {
    $(".openingScreen").fadeOut().empty();
    $(".selectionScreen").show();
  }

  $('#HPMusic').get(0).play();


  //#####################################################################
  //Start Screen
  //#####################################################################
  $('.good-guys-list').html(listTemplate(goodGuysObject));
  $('.good-guy').click(function(event){
    event.preventDefault();
    $(this).css('border', '1px solid white');
    $(this).siblings().css({'border' : '1px solid rgba(0,0,0,0)'});
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
    $(this).prop('disabled', true);
    console.log("This is disabled");
    checkWinVar = true;
    opponentPlayer.decreaseHealth();
    checkWin();
    if(checkWinVar !== true){return;}
    window.setTimeout(function(){
    opponentPlayer.attack(userPlayer);
    console.log(userPlayer);
    console.log(opponentPlayer);
    checkWin()}, 2000)
    // $('#attack').on('click');
    $(this).prop('disabled', false);
  });


  $('.potion-buttons').on('click', function(event){
    event.preventDefault();
    checkWinVar = true;
    if($(this).is('#increase-health')){
      $('.potionsLeftG').hide();
      $('.potionsLeftGPhantom').html('Increase Health: 0');
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
      $('.strongAttacksLeftG').hide();
      $('.strongAttacksLeftGPhantom').html('Strong Attacks: 0');
      opponentPlayer.decreaseHealthStrong();
      userPlayer.strongAttack();
      checkWin();
      if(checkWinVar !== true){return;}
      window.setTimeout(function(){
      opponentPlayer.attack(userPlayer);
      console.log(userPlayer);
      console.log(opponentPlayer);
      checkWin()}, 5000);
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
    $('.fightScreen').css({'background-image': 'url(' + randomBackground + ')', 'background-size': '100% 100%', 'background-repeat': 'none', 'height': '800px'});
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

  var thisClicked;

  function changeCharacter(){
    $('#start-game').hide();
    $('#select-button').show();
    $('#choose-another-player').hide();
    $('.good-guy').click(function(){
      thisClicked = true;
    });
    $('.good-guy').mouseenter(function(){
      thisClicked = false;
      $(this).css('border', '1px solid white');
    }).mouseleave(function(){
      if(thisClicked === false){
        $(this).css('border', '1px solid rgba(0,0,0,0)');
      }
    });

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
