// This is an example object for javascript.

// This one needs to be in an anonymous function in order for it to be exportable
var player = function(name){
    // Properties
    this.name = name;
    this.hp = 100;
    this.mp = 90;

    // Method heal
    this.heal = function(targetPlayer){
        targetPlayer.hp += 20;
        this.mp -= 10;
        console.log(targetPlayer.name + " is now " + targetPlayer.hp)

    };

    // Method Attack
    this.attack = function(targetPlayer){
        targetPlayer.hp -= 35;
        console.log(this.name + " attack " + targetPlayer.name + " dealing 35 damage");
    };

    // Method magicAttack
    this.magicAttack = function(targetPlayer){
        targetPlayer.hp -= 50;
        this.mp -= 15;
        console.log(this.name + " used magic to deal 50 damage to " + targetPlayer.name);
    }

};

module.exports = player;

