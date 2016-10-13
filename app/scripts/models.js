var $ = require('jquery');

function Character(config){
  $.extend(this, config);
  this.health = 100;
  this.attack = function(){};
  this.decreaseHealth = function(){
    this.health -= 10;
  };
  this.decreaseHealthStrong = function(){
    this.health -= 30;
  };
  this.potionHealth = function(){
    this.health += 10;
  };
  this.potionStrongAttack = function(){};
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
