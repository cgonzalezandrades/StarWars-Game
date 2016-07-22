var attackerChosen = false;
var defenderChosen = false;

var attacker = [];
var attackerIndex = 0;
var defender = [];
var defenderIndex = 0;
var combatant = new Array(4);
combatant[0] = new jedi('Obi Wan', 'obiWan.png', 130, 6, 0, 'false');
combatant[1] = new jedi('Luke Skywalker', 'luke.jpg', 100, 12, 0, 'false');
combatant[2] = new jedi('Darth Sidious', 'darthSidious.jpeg', 150, 10, 0, 'false');
combatant[3] = new jedi('Darth Vader', 'darthVader.jpg', 180, 25, 0, 'false');

function jedi(name, image, health, attack, counter, chosen, state) {
    this.name = name;
    this.image = image;
    this.health = health;
    this.attack = attack;
    this.counter = counter;
    this.status = 'available';
    this.state = state;

}

$(document).ready(function () {

    function setCharacter(index) {
        $(".fighters").empty();

        if (combatant[index].status === 'available') {

            var $attackers = $("<div/>").addClass("jedi col-sm-3").attr('jedi-id', index).html('<span>' + combatant[index].name + '</span><img src=./assets/images/' + combatant[index].image + ' class="img-responsive">' + '<span>' + combatant[index].health + '</span>');


            combatant[index].status = 'unavailable'
                //  attackerChosen = true;
            combatant[index].state = true;
            attackerIndex = index;
            attacker[index] = combatant[index];

            $(".yourCharacter").append($attackers);

        }

        setEnemies();

    }

    function setEnemies(index) {

        $(".fighters").empty();

        for (var i = 0; combatant.length > i; i++) {

            if (combatant[i].status === 'available') {

                var $fighters = $("<div/>").addClass("jedi col-sm-3").attr('jedi-id', i).html('<span>' + combatant[i].name + '</span><img src=./assets/images/' + combatant[i].image + ' class="img-responsive">' + '<span>' + combatant[i].health + '</span>').css('border', 'solid black').css('background-color', 'red');

                $(".enemiesAvailable").append($fighters);
            }
        }
    }

    function setDefender(index) {

        $(".enemiesAvailable").empty();

        if (combatant[index].status === 'available')

            var $defenders = $("<div/>").addClass("jedi col-sm-3").attr('jedi-id', index).html('<span>' + combatant[index].name + '</span><img src=./assets/images/' + combatant[index].image + ' class="img-responsive">' + '<span>' + combatant[index].health + '</span>');

        combatant[index].status = 'unavailable'
            //  defenderChosen = true;
        combatant[index].state = true;
        defenderIndex = index;
        defender[index] = combatant[index];

        setEnemies(index);

        $(".defender").append($defenders);
    }

    function displayJedi() {

        $(".fighters").empty();

        for (var i = 0; combatant.length > i; i++) {

            if (combatant[i].status === 'available') {

                var $fighters = $("<div/>").addClass("jedi col-sm-3").attr('jedi-id', i).html('<span>' + combatant[i].name + '</span><img src=./assets/images/' + combatant[i].image + ' class="img-responsive">' + '<span>' + combatant[i].health + '</span>');

                $(".fighters").append($fighters);
            }

        }


        $(".jedi").on('click', function () {

            if (this.getAttribute('jedi-id') == '0') {

                displayJedi();

                if (!attackerChosen) {
                    setCharacter(0);
                }

            }

            if (this.getAttribute('jedi-id') == '1') {

                displayJedi();

                if (!attackerChosen) {
                    setCharacter(1);
                }

            }

            if (this.getAttribute('jedi-id') == '2') {


                displayJedi();
                if (!attackerChosen) {
                    setCharacter(2);
                }
            }

            if (this.getAttribute('jedi-id') == '3') {

                displayJedi();
                if (!attackerChosen) {
                    setCharacter(3);
                }

            }

            $(".jedi").on('click', function () {
                if (this.getAttribute('jedi-id') == '0') {

                    if (!defenderChosen) {
                        setDefender(0)
                    }

                }

                if (this.getAttribute('jedi-id') == '1') {

                    if (!defenderChosen) {
                        setDefender(1)
                    }
                }

                if (this.getAttribute('jedi-id') == '2') {

                    if (!defenderChosen) {
                        setDefender(2)
                    }
                }
                if (this.getAttribute('jedi-id') == '3') {

                    if (!defenderChosen) {
                        setDefender(3)
                    }
                }

                $(".attack").on('click', function () {


                    if ((attacker[attackerIndex].state === true) && (defender[defenderIndex].state === true)) {

                        $(".yourCharacter").empty();

                        console.log("attacker health is " + attacker[attackerIndex].health);
                        console.log("attacker attack is " + attacker[attackerIndex].attack);

                        console.log("defender health " + defender[defenderIndex].health);
                        console.log("defender attack is " + defender[defenderIndex].attack);

                        attacker[attackerIndex].health = attacker[attackerIndex].health - defender[defenderIndex].attack;

                        console.log("attacker health is " + attacker[attackerIndex].health);
                        console.log("attacker attack is " + attacker[attackerIndex].attack);

                        console.log("------------------------------");

                        defender[defenderIndex].health = defender[defenderIndex].health - attacker[attackerIndex].attack;

                        console.log("defender health " + defender[defenderIndex].health);
                        console.log("defender attack is " + defender[defenderIndex].attack);

                        var $attackers = $("<div/>").addClass("jedi col-sm-3").attr('jedi-id', attackerIndex).html('<span>' + attacker[attackerIndex].name + '</span><img src=./assets/images/' + attacker[attackerIndex].image + ' class="img-responsive">' + '<span>' + attacker[attackerIndex].health + '</span>');

                        $(".yourCharacter").append($attackers);



                        $(".defender").empty();


                        var $defenders = $("<div/>").addClass("jedi col-sm-3").attr('jedi-id', defenderIndex).html('<span>' + defender[defenderIndex].name + '</span><img src=./assets/images/' + defender[defenderIndex].image + ' class="img-responsive">' + '<span>' + defender[defenderIndex].health + '</span>');


                        $(".defender").append($defenders);

                        $(".action1").html("you attacked " + defender[defenderIndex].name + " for " + attacker[attackerIndex].attack);
                        $(".action2").html(defender[defenderIndex].name + " attack you back for " + defender[defenderIndex].attack + " Damage ");

                        attacker[attackerIndex].attack = attacker[attackerIndex].attack + attacker[attackerIndex].attack;

                        if (attacker[attackerIndex].health <= 0) {


                            $(".action1").html("Game Over, you have been defeated");

                            $(".attack").prop("disabled", true);

                            var $restartButton = $("<button/>").addClass("restart").html('<button>').text("Restart");

                            $(".action2").empty();

                            $(".action2").append($restartButton);

                            $(".action2").on("click", function () {
                                location.reload();

                            })
                        }

                        if (defender[defenderIndex].health <= 0) {

                            $(".defender").empty();
                            $(".action1").empty()
                            $(".action2").empty()

                            $(".action1").html("You have defeated " + attacker[attackerIndex].name + ", you can choose to fight another enemy");




//                            $(".jedi").on('click', function () {
//
//                                if (this.getAttribute('jedi-id') == '0') {
//
//                                    displayJedi();
//
//                                    if (!attackerChosen) {
//                                        setCharacter(0);
//                                    }
//
//                                }
//
//                                if (this.getAttribute('jedi-id') == '1') {
//
//                                    displayJedi();
//
//                                    if (!attackerChosen) {
//                                        setCharacter(1);
//                                    }
//
//                                }
//
//                                if (this.getAttribute('jedi-id') == '2') {
//
//
//                                    displayJedi();
//                                    if (!attackerChosen) {
//                                        setCharacter(2);
//                                    }
//                                }
//
//                                if (this.getAttribute('jedi-id') == '3') {
//
//                                    displayJedi();
//                                    if (!attackerChosen) {
//                                        setCharacter(3);
//                                    }
//
//                                }
//
//                                $(".jedi").on('click', function () {
//                                    if (this.getAttribute('jedi-id') == '0') {
//
//                                        if (!defenderChosen) {
//                                            setDefender(0)
//                                        }
//
//                                    }
//
//                                    if (this.getAttribute('jedi-id') == '1') {
//
//                                        if (!defenderChosen) {
//                                            setDefender(1)
//                                        }
//                                    }
//
//                                    if (this.getAttribute('jedi-id') == '2') {
//
//                                        if (!defenderChosen) {
//                                            setDefender(2)
//                                        }
//                                    }
//                                    if (this.getAttribute('jedi-id') == '3') {
//
//                                        if (!defenderChosen) {
//                                            setDefender(3)
//                                        }
//                                    }
//
//                                    $(".attack").on('click', function () {
//
//
//                                        if ((attacker[attackerIndex].state === true) && (defender[defenderIndex].state === true)) {
//
//                                            $(".yourCharacter").empty();
//
//                                            console.log("attacker health is " + attacker[attackerIndex].health);
//                                            console.log("attacker attack is " + attacker[attackerIndex].attack);
//
//                                            console.log("defender health " + defender[defenderIndex].health);
//                                            console.log("defender attack is " + defender[defenderIndex].attack);
//
//                                            attacker[attackerIndex].health = attacker[attackerIndex].health - defender[defenderIndex].attack;
//
//                                            console.log("attacker health is " + attacker[attackerIndex].health);
//                                            console.log("attacker attack is " + attacker[attackerIndex].attack);
//
//                                            console.log("------------------------------");
//
//                                            defender[defenderIndex].health = defender[defenderIndex].health - attacker[attackerIndex].attack;
//
//                                            console.log("defender health " + defender[defenderIndex].health);
//                                            console.log("defender attack is " + defender[defenderIndex].attack);
//
//                                            var $attackers = $("<div/>").addClass("jedi col-sm-3").attr('jedi-id', attackerIndex).html('<span>' + attacker[attackerIndex].name + '</span><img src=./assets/images/' + attacker[attackerIndex].image + ' class="img-responsive">' + '<span>' + attacker[attackerIndex].health + '</span>');
//
//                                            $(".yourCharacter").append($attackers);
//
//
//
//                                            $(".defender").empty();
//
//
//                                            var $defenders = $("<div/>").addClass("jedi col-sm-3").attr('jedi-id', defenderIndex).html('<span>' + defender[defenderIndex].name + '</span><img src=./assets/images/' + defender[defenderIndex].image + ' class="img-responsive">' + '<span>' + defender[defenderIndex].health + '</span>');
//
//
//                                            $(".defender").append($defenders);
//
//                                            $(".action1").html("you attacked " + defender[defenderIndex].name + " for " + attacker[attackerIndex].attack);
//                                            $(".action2").html(defender[defenderIndex].name + " attack you back for " + defender[defenderIndex].attack + " Damage ");
//
//                                            attacker[attackerIndex].attack = attacker[attackerIndex].attack + attacker[attackerIndex].attack;
//
//                                            if (attacker[attackerIndex].health <= 0) {
//
//
//                                                $(".action1").html("Game Over, you have been defeated");
//
//                                                $(".attack").prop("disabled", true);
//
//                                                var $restartButton = $("<button/>").addClass("restart").html('<button>').text("Restart");
//
//                                                $(".action2").empty();
//
//                                                $(".action2").append($restartButton);
//
//                                                $(".action2").on("click", function () {
//                                                    location.reload();
//
//                                                })
//                                            }
//
//
//
//
//
//                                        }
//                                    })
//                                })
//                            })


                        }

                    }
                })
            })
        })
    }

    displayJedi();

})