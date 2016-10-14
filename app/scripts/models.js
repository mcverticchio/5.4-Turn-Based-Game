var $ = require('jquery');

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
  this.StrongAttack = function(){};
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

//#####################################################################
//Exporting
//#####################################################################

module.exports = {
  'Character' : Character,
  'GoodGuy' : GoodGuy,
  'BadGuy' : BadGuy
};
