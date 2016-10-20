/* global Phaser*/
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
});
var platforms;
var player;
var cursors;
var stars;
var diamonds;
var diamond;
var score = 0;
var scoreText;
var gh;
var hg;
var pie;
function purplecow(diamond, platforms) {
    var i = 0;
    diamond.kill();
    for (i = 0; i < 1; i++) {
        diamond = diamonds.create(Math.random(0) * 800, 20, 'diamond');
        diamond.body.gravity.y = 10;
        diamond.body.bounce.y = 0.01;
    }
}


function collectStar(player, star) {
    //remove star from screen
    score = score + 4;
    star.kill();
    star = stars.create(Math.random(0) * 800, 1, 'star');
    star.body.gravity.y = 50;
    star.body.bounce.y = 0.00001;

}

function bob(player, diamond) {
    var i = 0;
    diamond.kill();
    score = score - 8;
    for (i = 0; i < 7; i++) {
        diamond = diamonds.create(Math.random(0) * 800, 20, 'diamond');
        diamond.body.gravity.y = 75;
        diamond.body.bounce.y = 0.001;
    }

}
//547,592
function preload() {


    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('dude', 'assets/dude.png', 38, 61);
    //Sprite Frisk made from undertale. Credit to undertale for sprite.
    game.load.image('diamond', 'assets/diamond.png');
    game.load.image('berrycute', 'assets/berrycute.png');
}

function create() {
    gh = game.input.keyboard.addKey(Phaser.Keyboard.M);
    hg = game.input.keyboard.addKey(Phaser.Keyboard.U);
    pie = game.input.keyboard.addKey(Phaser.Keyboard.F);
    //use physics, enable arcade physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(15, 10, 'sky');
    //simple background 4 sprite
    //platform group has ground and 2 ledges 2 jump on
    platforms = game.add.group();
    //enable physics for any thing created in group
    platforms.enableBody = true;
    //ground
    var ground = platforms.create(0, game.world.height - 64, 'ground');
    //scale to fit width of game (origion sprite 400x32)
    ground.scale.setTo(2, 2);
    //stops it from falling away when u jump on
    ground.body.immovable = true;
    var ledge3 = platforms.create(-300, 400, 'ground');
    ledge3.body.immovable = true;
    var ledge4 = platforms.create(200, 100, 'ground');
    ledge4.body.immovable = false;
    //player settings
    player = game.add.sprite(32, game.world.height - 148, 'dude');
    //enable physics on player
    game.physics.arcade.enable(player);
    //player physics properties
    player.body.bounce.y = 0.6;
    player.body.gravity.y = 350;
    player.body.collideWorldBounds = true;
    //animations, walking left and right
    player.animations.add('left', [3, 4], 10, true);
    player.animations.add('right', [0, 1], 10, true);
    cursors = game.input.keyboard.createCursorKeys();
    stars = game.add.group();
    stars.enableBody = true;
    //12 evenly spaced apart
    for (var i = 0; i < 20; i++) {
        var star = stars.create(Math.random(0) * 750, 0, 'star');
        star.body.gravity.y = 50;
        star.body.bounce.y = 0.00001;
    }
    diamonds = game.add.group();
    diamonds.enableBody = true;
    for (var i = 0; i < 25; i++) {
        var diamond = diamonds.create(Math.random(0) * 800, 0, 'diamond');
        diamond.body.gravity.y = 100;
        diamond.body.bounce.y = 0.01;
    }
    scoreText = game.add.text(16, 16, 'score: ', {
        fontsize: '32px',
        fill: '#2a0051'
    });
}

function update() {
    // collide player starts w/ platforms
    var hitPlatform = game.physics.arcade.collide(player, platforms);
    player.body.velocity.x = 0;


    if (cursors.left.isDown) {
        player.body.velocity.x = -250;
        player.animations.play('left');
    }
    else if (cursors.right.isDown) {
        player.body.velocity.x = 250;
        player.animations.play('right');
    }
    else {
        player.animations.stop();
        player.frame = 2;
    }
    if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
        player.body.velocity.y = -350;
    }
    else {
        player.animations.stop();
        player.frame = 2;
    }

    if (score === 40) {
        for (var i = 0; i < 5; i++) {
            diamond = diamonds.create(Math.random(0) * 800, 0, 'diamond');
            diamond.body.gravity.y = 25;

        }
    }
    if (score === 80) {
        for (var i = 0; i < 6; i++) {
            diamond = diamonds.create(Math.random(0) * 800, 0, 'diamond');
            diamond.body.gravity.y = 50;
        }
    }
    if (score === 120) {
        for (var i = 0; i < 7; i++) {
            diamond = diamonds.create(Math.random(0) * 800, 0, 'diamond');
            diamond.body.gravity.y = 100;
        }
    }
    if (score === 160) {
        for (var i = 0; i < 8; i++) {
            diamond = diamonds.create(Math.random(0) * 800, 0, 'diamond');
            diamond.body.gravity.y = 125;
        }
    }
    if (score === 200) {
        for (var i = 0; i < 10; i++) {
            diamond = diamonds.create(Math.random(0) * 800, 0, 'diamond');
            diamond.body.gravity.y = 125;
        }
    }
     if (score === 240) {
        for (var i = 0; i < 11; i++) {
            diamond = diamonds.create(Math.random(0) * 800, 0, 'diamond');
            diamond.body.gravity.y = 125;
        }
    }
     if (score === 280) {
        for (var i = 0; i < 12; i++) {
            diamond = diamonds.create(Math.random(0) * 800, 0, 'diamond');
            diamond.body.gravity.y = 125;
        }
    }
     if (score === 320) {
        for (var i = 0; i < 13; i++) {
            diamond = diamonds.create(Math.random(0) * 800, 0, 'diamond');
            diamond.body.gravity.y = 125;
        }
    }
     if (score === 160) {
        for (var i = 0; i < 8; i++) {
            diamond = diamonds.create(Math.random(0) * 800, 0, 'diamond');
            diamond.body.gravity.y = 125;
        }
    }
    if (gh.isDown && hg.isDown && pie.isDown){
        diamonds.callAll('kill');
    }
    game.physics.arcade.collide(stars, platforms);
    game.physics.arcade.overlap(player, stars, collectStar, null, this);
    game.physics.arcade.overlap(player, diamonds, bob, null, this);
    game.physics.arcade.overlap(diamonds, platforms, purplecow, null, this);
    scoreText.text = "Money: $" + score;

}