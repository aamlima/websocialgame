﻿/// <reference path="phaser.js" />

function mainMenu() {
    var mainMenu = new Phaser.State();

    mainMenu.create = function () {
        mainMenu.add.button(250, 130, 'play', playGame);
    }

    function playGame() {
        mainMenu.state.start('inGame');
    }

    return mainMenu;
}


function inGame() {
    var inGame = new Phaser.State();
    var player, enemies, ground, coins, backgrounds;
    var playerSpeed = 5;

    inGame.create = function () {
        inGame.physics.startSystem(Phaser.Physics.ARCADE);

        backgrounds = inGame.add.group();
        backgrounds.bg1 = backgrounds.create(0, 0, 'background');
        backgrounds.bg2 = backgrounds.create(1355, 0, 'background');

        player = inGame.add.sprite(0, 100, 'player');
        inGame.physics.arcade.enable(player);
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;
        player.animations.add('right', [0, 1, 2, 3, 4, 5, 6, 7], playerSpeed*2, true);
        player.animations.play('right');

        ground = inGame.add.sprite(0, 300, 'ground');
        ground.alpha = 0.5;
        inGame.physics.arcade.enable(ground);
        ground.body.immovable = true;
    }

    inGame.update = function () {
        inGame.physics.arcade.collide(ground, player);
        backgrounds.forEach(backgroundScroll, this);
        player.animations.getAnimation('right').speed = playerSpeed * 2;
    }

    function backgroundScroll(background) {
        background.position.x -= playerSpeed;
        if (background.position.x <= -1355) {
            background.position.x += 1355*2;
        }
    }

    return inGame;
}