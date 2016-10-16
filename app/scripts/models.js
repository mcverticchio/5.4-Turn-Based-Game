var $ = require('jquery');
var _ = require('underscore');

function Character(config){
  $.extend(this, config);
  this.health = 100;
  this.numOfHealthPotion = 1;
  this.numOfStrongAttackPotion = 1;
}

//#####################################################################
//Good Guys Construct
//#####################################################################

function GoodGuy(config){
  Character.call(this, config);
  this.isGood = true;
  this.decreaseHealth = function(){
    this.health -= 10;
    $('#goodGuysHealthBar').css('width', this.health + "%");
    $('#zapSound').get(0).play();
  };
  this.increaseHealth = function(){
    this.health += 10;
    this.numOfHealthPotion -= 1;
    $('#goodGuysHealthBar').css('width', this.health + "%");
    $('#healSound').get(0).play();
    console.log($('#healSound'));
    console.log("User increased health!");
  };
  this.decreaseHealthStrong = function(){
    this.health -= 30;
    $('#goodGuysHealthBar').css('width', this.health + "%");
  };
  this.strongAttack = function(){
    this.numOfStrongAttackPotion -= 1;
    $('#goodGuysHealthBar').css('width', this.health + "%");
    console.log("User strong attack potion!");
  };
}

GoodGuy.prototype = new Character();

//#####################################################################
//Bad Guys Construct
//#####################################################################

function BadGuy(config){
  Character.call(this, config);
  this.isGood = false;
  this.decreaseHealth = function(){
    this.health -= 10;
    $('#badGuysHealthBar').css('width', this.health + "%");
    $('#zapSound').get(0).play();
  };
  this.increaseHealth = function(){
    this.health += 10;
    this.numOfHealthPotion -= 1;
    $('#badGuysHealthBar').css('width', this.health + "%");
    $('#healSound').get(0).play();
  };
  this.decreaseHealthStrong = function(){
    this.health -= 30;
    $('#badGuysHealthBar').css('width', this.health + "%");
  };
  this.strongAttack = function(){
    this.numOfStrongAttackPotion -= 1;
    $('#badGuysHealthBar').css('width', this.health + "%");
    console.log("User strong attack potion!");
  };
}

BadGuy.prototype = new Character();
BadGuy.prototype.attack = function(character){
  var availableAttacks = ['opponentMinorAttack'];

  if(this.numOfHealthPotion > 0){
    availableAttacks.push('opponentHealthPotion');
  }

  if(this.numOfStrongAttackPotion > 0){
    availableAttacks.push('opponentStrongAttack');
  }

  var selectedAttack = availableAttacks[_.random(0,availableAttacks.length-1)];

  this[selectedAttack](character);
};

BadGuy.prototype.opponentMinorAttack = function(character){
  character.decreaseHealth();
  console.log("Opponent minor attack");
};
BadGuy.prototype.opponentHealthPotion = function(character){
  this.increaseHealth();
  console.log('Health Potion taken by opponent!');
};
BadGuy.prototype.opponentStrongAttack = function(character){
  character.decreaseHealthStrong();
  this.strongAttack();
  console.log('Opponent strong attack!');
};

//#####################################################################
//Exporting
//#####################################################################

module.exports = {
  'Character' : Character,
  'GoodGuy' : GoodGuy,
  'BadGuy' : BadGuy
};
