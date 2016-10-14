var $ = require('jquery');
var _ = require('underscore');

function Character(config){
  $.extend(this, config);
  this.health = 100;
  this.weakAttack = function(){
    console.log("Expelliarmus!");
  };
  this.decreaseHealth = function(){
    this.health -= 10;
  };
  this.decreaseHealthStrong = function(){
    this.health -= 30;
  };
  this.increaseHealth = function(){
    this.health += 10;
  };
  this.strongAttack = function(){};
  this.useHealthPotion = function(){
    this.numOfHealthPotion -= 1;
  };
  this.useStrongAttackPotion = function(){
    this.numOfStrongAttackPotion -= 1;
  };
  this.numOfHealthPotion = 1;
  this.numOfStrongAttackPotion = 1;
}

//#####################################################################
//Good Guys Construct
//#####################################################################

function GoodGuy(config){
  Character.call(this, config);
  this.isGood = true;
}

GoodGuy.prototype = new Character();

//#####################################################################
//Bad Guys Construct
//#####################################################################

function BadGuy(config){
  Character.call(this, config);
  this.isGood = false;
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

  console.log(availableAttacks);

  var selectedAttack = availableAttacks[_.random(0,availableAttacks.length-1)];

  this[selectedAttack](character);
};

BadGuy.prototype.opponentMinorAttack = function(character){
  this.weakAttack();
  character.decreaseHealth();
  console.log("Opponent minor attack");
};
BadGuy.prototype.opponentHealthPotion = function(character){
  this.increaseHealth();
  this.useHealthPotion();
  console.log('Health Potion taken by opponent!');
};
BadGuy.prototype.opponentStrongAttack = function(character){
  character.decreaseHealthStrong();
  this.useStrongAttackPotion();
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
