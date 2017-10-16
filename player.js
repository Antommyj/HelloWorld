function Player(name){
    this.name = name;
    this.hp = 100;
    this.mp = 90;

    this.giveLife = function(targetPlayer){
        targetPlayer.hp += 20;
        console.log(targetPlayer.name + " is now " + targetPlayer.hp)

    }

}


Player.prototype.attackMagic = function(targetPlayer){
    targetPlayer.hp -= 35;
    this.mp -= 20;
    console.log(this.name + " use firebolt damaging " + targetPlayer.name)
};


module.exports = Player;