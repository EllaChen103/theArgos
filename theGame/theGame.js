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
var score = 0;
var scoreText;

function collectStar(player, star) {
    //remove star from screen
    score++;
    star.kill();

}
function bob(player, diamond) {
    var i = 0;
    diamond.kill();
    score = score - 2;
    for (i = 0; i<1; i++){
        diamonds.create(Math.random(0) * 800, 0, 'diamond');
        diamond.body.gravity.y = 10;
        diamond.body.bounce.y = 0.01;
    }
}

function preload() {


    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    game.load.image('diamond', 'assets/diamond.png');
}

function create() {
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
    var ledge = platforms.create(0, 400, 'ground');
    ledge.body.immovable = true;
    var ledge1 = platforms.create(500, 200, 'ground');
    ledge1.body.immovable = true;
    var ledge2 = platforms.create(-300, 100, 'ground');
    ledge2.body.immovable = true;
    var ledge3 = platforms.create(500, 250
    , 'ground');
    //player settings
    player = game.add.sprite(32, game.world.height - 111, 'dude');
    //enable physics on player
    game.physics.arcade.enable(player);
    //player physics properties
    player.body.bounce.y = 1;
    player.body.gravity.y = 2;
    player.body.collideWorldBounds = true;
    //animations, walking left and right
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
    cursors = game.input.keyboard.createCursorKeys();
    stars = game.add.group();
    stars.enableBody = true;
    //12 evenly spaced apart
     for (var i = 0; i < 100; i++) {
       var star = stars.create(Math.random(0) * 800, 0, 'star');
        star.body.gravity.y = 2;
        star.body.bounce.y = 0.00001;
    }
    diamonds = game.add.group();
    diamonds.enableBody = true;
    for (var i = 0; i < 25; i++) {
        var diamond = diamonds.create(Math.random(0) * 800, 0, 'diamond');
        diamond.body.gravity.y = 5;
        diamond.body.bounce.y = 0.01;
    }
scoreText = game.add.text(16, 16, 'score: ', {fontsize: '32px',fill: '#000'});
}

function update() {
    // collide player starts w/ platforms
    var hitPlatform = game.physics.arcade.collide(player, platforms);
    //reset player velocity
    player.body.velocity.x = 0;
    if (cursors.left.isDown) {
        //Move to the left
        player.body.velocity.x = -150;
        player.animations.play('left');
    }
    else if (cursors.right.isDown) {
        //move to right
        player.body.velocity.x = 150;
        player.animations.play('right');
    }
    else {
        //stand still
        player.animations.stop();
        player.frame = 4;
    }
    //allow player 2 jump on ground
    if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
        player.body.velocity.y = -350;
    }
    game.physics.arcade.collide(stars, platforms);
    game.physics.arcade.collide(diamonds, platforms);
    game.physics.arcade.overlap(player, stars, collectStar, null, this);
    game.physics.arcade.overlap(player, diamonds, bob, null ,this)
    scoreText.text = "score: " + score;


}
