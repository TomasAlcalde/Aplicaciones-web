import { useEffect, useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Game.css'
import {display} from './Tiles&Nodes';
import { AuthContext } from '../auth/AuthContext';

async function updateResource(token, player) {
    try {
        const response = await axios({
            method: 'get',
            url: `https://aplicaciones-web.onrender.com/players/${player.id}`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const resources = response.data.resources;
        for (var i = 0; i < resources.length; i++) {
            $(`#player-${player.id} .val-${resources[i].resource}`).text(`${(resources[i].quantity)}`);
        }
    } catch (error) {
        console.log("ERROR")
    }
}

async function Control(token, game_id, player_id) {

    const info = $('<div>');

    try {
        const response = await axios({
            method: 'get',
            url: `https://aplicaciones-web.onrender.com/games/${game_id}/players`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }) 
        
        const game = response.data.game;
        const players = response.data.players;
        const houses = response.data.houses;
        for (var i = 0; i < game.number_players; i++) {
            info.append(`
            <div class="player-div" id="player-${players[i].id}">
            <p style="color:${players[i].color}">Player ${players[i].id}</p>
            <div>
            <div class="r-wood">
            <img class="icon" src="../../src/assets/images/icons_resource/wood.png">
            <span class="val-wood">?</span>
            </div>
            <div class="r-clay">
            <img class="icon" src="../../src/assets/images/icons_resource/brick.png">
            <span class="val-clay">?</span>
            </div>
            <div class="r-stone">
            <img class="icon" src="../../src/assets/images/icons_resource/stone.png">
            <span class="val-stone">?</span>
            </div>
            <div class="r-wheat">
            <img class="icon" src="../../src/assets/images/icons_resource/grain.png">
            <span class="val-wheat">?</span>
            </div>
            <div class="r-sheep">
            <img class="icon" src="../../src/assets/images/icons_resource/wool.png">
            <span class="val-sheep">?</span>
            </div>
            </div>
            </div>
            `);
        }

        const panel = $('<div>').html(`       
        <div class="player_info">${info.html()}</div>
        <div class="dice_panel">
        <div class="dice" id="d1"></div>
        <div class="dice" id="d2"></div>
        </div>
        <div class="center-div">
        <button class="btn btn-start">Start</button>
        <button class="btn btn-roll">Roll</button>
        <button class="btn btn-next">Next</button>
        <div>
        <div class="btn_panel">
        <button class="btn btn-road">Build Road</button>
        <button class="btn btn-build">Build House</button>
        <button class="btn btn-upgrade">Upgrade</button>
        <button class="btn btn-progress">Get Progress Card</button>
        <button class="btn btn-trade">Trade</button>
        <button class="btn btn-cancel">Cancel</button>
        
        </div>
        `);
        
        $('#main_panel').append(`
        <div class="control_panel">
        ${panel.html()}
        </div>
        `);
        $(`#player-${game.turn}`).css("font-weight", "bold");
        if (houses) {
            for (var i = 0; i < houses.length; i++) {
                const response2 = await axios({
                    method: 'get',
                    url: `https://aplicaciones-web.onrender.com/players/${houses[i].player_id}`,
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }) 
                $(`#${houses[i].node_id}`).css({
                    "fill": response2.data.player.color, "stroke": "white",
                    "stroke-width": "4px",
                    "visibility": "visible",
                    "opacity": 1
                });

            }
        }
        console.log(game);
        if (game.turn == 0) {
            $('.btn-start').on("click", () => { start(token, game_id, player_id) });
            $('.btn-start').addClass("btn-glowing");
        }
        if (game.turn == player_id)  {
            if (!game.dices_rolled) {
                $('.btn-roll').on("click", () => { roll(token, game_id, player_id) });
                $('.btn-roll').addClass("btn-glowing");
            }
            else {
                btnOn(token, game_id, player_id);
                $('.btn-next').addClass("btn-glowing");
            }
        }
        if (game.turn == -player_id) {
            placeCity(token, game_id, player_id)
        }
        for (var i = 0; i < game.number_players; i++) {
            updateResource(token, players[i]);
        }
    } catch(error) {
        console.log("Se ha producido un error al generar el juego")
        console.log(error)
    }

    return (
        <></>
    )
}

function btnOn(token, game_id, player_id) {
    $('.btn-road').on("click", () => { buildRoads(token, game_id, player_id) });
    /*build house button*/
    $('.btn-build').on("click", () => { build(token, game_id, player_id) });
    /* upgrade house button*/
    $('.btn-upgrade').on("click", () => { upgrade(token, game_id, player_id) });
    /*trade button*/
    $('.btn-trade').on("click", () => { trade(token, game_id, player_id) })
    /*cancel button*/
    $('.btn-cancel').on("click", () => { cancel() });
    /* next button*/
    $('.btn-next').on("click", () => { next(token, game_id, player_id); });
}

async function placeCity(token, game_id, player_id) {
    $('.node').css("visibility", "visible");

    const response = await axios({
        method: 'get',
        url: `https://aplicaciones-web.onrender.com/games/${game_id}/houses`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const house = response.data.houses;

    for (var i = 0; i < house.length; i++) {
        console.log(house[i])
        $(`#${house[i].id}`).off("click");                         // remove exsisting house listner
        var houseAdj = house[i].adjacent_nodes;
        for (var j = 0; j < houseAdj.length; j++) {
            // console.log(`off ${houseAdj[j]}`);
            $(`#${houseAdj[j]}`).off("click");
            $(`#${houseAdj[j]}`).css("visibility", "hidden");   // hide the exsisting house adjacent node
        }
    }

    $('.node').on("click", async function () {
        $('.node').off("click")
        var thisID = parseInt($(this).attr("id"));
        console.log(thisID)
        await axios({
            method: 'post',
            url: `https://aplicaciones-web.onrender.com/games/${game_id}/players/${player_id}/buildings/firstcities`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: {
                node: thisID
            }
        });

        const response = await axios({
            method: 'get',
            url: `https://aplicaciones-web.onrender.com/players/${player_id}`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });

        // change this node class and style
        $(`#${thisID}`).off("click");
        $(`#${thisID}`).removeClass("node");
        $(`#${thisID}`).css({
            "fill": response.data.player.color, "stroke": "white",
            "stroke-width": "4px",
            "visibility": "visible",
            "opacity": 1
        });
        $(`#${thisID} .shadow`).css("visibility", "hidden");

        $('.node').off("click");
        $('.node').css("visibility", "hidden");

    });
}

function draw(x1, y1, x2, y2, player) {

    var tileSize = 50;

    // get the vector (x1,y1)->(x2,y2)
    var ux = x2 - x1;
    var uy = y2 - y1;

    // get the unit vector
    ux /= tileSize;
    uy /= tileSize;

    // scale factor
    var a = 10;

    // adjust the end points of this line
    // do not want it cover the node svg element (for node click event)
    $("#board").append(`<line x1=${x1 + a * ux} y1=${y1 + a * uy} x2=${x2 - a * ux} y2=${y2 - a * uy} stroke-width="10" stroke=${player.color}/>`);
    // refresh the svg
    $('#board').html($('#board').html() + "");
}


/* ------------------------------------ Button functions ---------------------------------------- */

function cancel() {
    // console.log("cancel!")
    $('.btn').removeClass('btn-on');

    $('.node').off("click");
    $('.node-hover').off("click");
    $('.node-hover').removeClass("node-hover");
    $('.node').css("visibility", "hidden");

    $('.spot').off("click");
    $('.spot').removeClass("spot");

    $('.house').off("click");
    $('.house .shadow').css({ "visibility": "hidden" });
    $('.house').removeClass("house");
}

async function start(token, game_id, player_id) {
    const response = axios({
        method: 'get',
        url: `https://aplicaciones-web.onrender.com/games/${game_id}/start`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

async function roll(token, game_id, player_id) {
    $('.btn-roll').removeClass("btn-glowing");
    console.log("roll!")
    $('.btn').off("click"); // turn off all btn
    const response = await axios({
        method: 'get',
        url: `https://aplicaciones-web.onrender.com/games/${game_id}/players/${player_id}/roll`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    const game = response.data.game

    $('#d1').html(`
            <img src="../../src/assets/images/dice/d${game.dice1}.png">
        `);
    $('#d2').html(`
        <img src="../../src/assets/images/dice/d${game.dice2}.png">
        `);
    // 7, robber
    // free previous forbidden tile
    // console.log("rob!")
    if (game.dice1 + game.dice2 == 7) {
        $('.tile').addClass("tile-hover");
        $('.desert').removeClass("tile-hover");
        $(`#t${response.data.robber.tile_id}`).removeClass("tile-hover");

        $('.tile-hover').on("click", async function () {
            console.log("HOLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
            var pre = $(`#t${response.data.robber.tile_id}`).attr("class").split(" ")
            $(`#t${response.data.robber.tile_id}`)[0].style.fill = `url(#pattern-${pre[1]})`;

            // console.log($(this));
            $(this)[0].style.fill = "black";
            var tid = parseInt($(this).attr("id").slice(1));
            
            const response1 = await axios({
                method: 'patch',
                url: `https://aplicaciones-web.onrender.com/games/${game_id}/moveRobber`,
                headers: {
                    'Authorization': `Bearer ${token}`
                }, 
                body: {
                    'newTileId': tid
                }
            })

            $('.tile').off("click");
            $('.tile').removeClass("tile-hover");

        });
    }
    const response2 = await axios({
        method: 'get',
        url: `https://aplicaciones-web.onrender.com/games/${game_id}/players`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }) 

    const houses = response2.data.houses;
    if (houses) {
        for (var i = 0; i < houses.length; i++) {
            const response3 = await axios({
                method: 'get',
                url: `https://aplicaciones-web.onrender.com/players/${houses[i].player_id}`,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }) 
            $(`#${houses[i].node_id}`).css({
                "fill": response3.data.player.color, "stroke": "white",
                "stroke-width": "4px",
                "visibility": "visible",
                "opacity": 1
            });

        }
    }
    btnOn(token, game_id, player_id);
    $('.btn-next').addClass("btn-glowing");
}

async function next(token, game_id, player_id) {
    $('.btn-next').removeClass("btn-glowing");
    console.log("next!")
    cancel();
    const response1 = await axios({
        method: 'get',
        url: `https://aplicaciones-web.onrender.com/games/${game_id}`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    // console.log(`before:${this.players.currentPlayer.id}`);
    $(`#player-${response1.data.game.turn}`).css("font-weight", "normal");
    const response2 = await axios({
        method: 'get',
        url: `https://aplicaciones-web.onrender.com/games/${game_id}/turn`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    // console.log(`after:${this.players.currentPlayer.id}`);
    $(`#player-${response2.data.game.turn}`).css("font-weight", "bold");
    $('.dice').empty();

    $('.btn').off("click");
    const response3 = await axios({
        method: 'get',
        url: `https://aplicaciones-web.onrender.com/games/${game_id}/players`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }) 

    const houses = response3.data.houses;
    if (houses) {
        for (var i = 0; i < houses.length; i++) {
            const response4 = await axios({
                method: 'get',
                url: `https://aplicaciones-web.onrender.com/players/${houses[i].player_id}`,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }) 
            $(`#${houses[i].node_id}`).css({
                "fill": response4.data.player.color, "stroke": "white",
                "stroke-width": "4px",
                "visibility": "visible",
                "opacity": 1
            });

        }
    }
}

async function buildRoads(token, game_id, player_id) {
    $('.btn-road').removeClass("btn-glowing");
    console.log("Build Road!")
    $('.btn').off("click");
    $('.node').css("visibility", "visible");

    $('.node').addClass("node-hover");

    let node1 = null;

    $('.node-hover').on("click", async function () {
        if (node1 === null) {
            node1 = $(this).attr('id');
            console.log("Clicked on node: ", node1);
        } else {
            let node2 = $(this).attr('id');
            console.log("Clicked on node: ", node2);

            let url = `https://aplicaciones-web.onrender.com/games/${game_id}/players/${player_id}/buildings/road`;

            const response = await axios({
                method: 'post',
                url: url,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                data: {
                    node1: node1,
                    node2: node2
                }
            });

            console.log('Road built successfully', response.data);

            $('.node').off("click");
            $('.node').removeClass("node-hover");
        }
    });
}

async function build(token, game_id, player_id) {
    
    $('.node').css("visibility", "visible");

    const response = await axios({
        method: 'get',
        url: `https://aplicaciones-web.onrender.com/games/${game_id}/houses`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const house = response.data.houses;

    for (var i = 0; i < house.length; i++) {
        console.log(house[i])
        $(`#${house[i].id}`).off("click");                         // remove exsisting house listner
        var houseAdj = house[i].adjacent_nodes;
        for (var j = 0; j < houseAdj.length; j++) {
            // console.log(`off ${houseAdj[j]}`);
            $(`#${houseAdj[j]}`).off("click");
            $(`#${houseAdj[j]}`).css("visibility", "hidden");   // hide the exsisting house adjacent node
        }
    }

    $('.btn-build').removeClass("btn-glowing");
    console.log("Build City!")
    $('.btn').off("click");

    $('.node').on("click", async function () {
        var node1 = $(this).attr('id');  
        console.log("Clicked on node: ", node1);

        var url = `https://aplicaciones-web.onrender.com/games/${game_id}/players/${player_id}/buildings/city`;
                
        const response = await axios({
            method: 'post',
            url: url,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            data: {
                node1: node1
            }
        });

        console.log('City built successfully', response.data);
        $(`#${node1}`).off("click");
        $(`#${node1}`).removeClass("node");
        $(`#${node1}`).css({
            "fill": response.data.player.color, "stroke": "white",
            "stroke-width": "4px",
            "visibility": "visible",
            "opacity": 1
        });
        $(`#${node1} .shadow`).css("visibility", "hidden");

        $('.node').off("click");
        $('.node').css("visibility", "hidden");

        $('.node').off("click");
        $('.node').removeClass("node-hover");
    });
}

async function upgrade(token, game_id, player_id) {
    
    const response = await axios({
        method: 'get',
        url: `https://aplicaciones-web.onrender.com/games/${game_id}/houses`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const house = response.data.houses;

    for (var i = 0; i < house.length; i++) {
        console.log(house[i])
        $(`#${house[i].id}`).off("click");
        $(`#${house[j]}`).css("visibility", "visible");                        // remove exsisting house listner
        
    }
    $('.btn-upgrade').removeClass("btn-glowing");
    console.log("Upgrade City!")
    $('.btn').off("click");


    $('.node').on("click", async function () {
        var node1 = $(this).attr('id');  
        console.log("Clicked on node: ", node1);

        var url = `https://aplicaciones-web.onrender.com/games/${game_id}/players/${player_id}/buildings/city/${node1}`;
                
        const response = await axios({
            method: 'post',
            url: url,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            data: {
                node1: node1
            }
        });

        console.log('City upgraded successfully', response.data);

        $(`#${node1}`).off("click");
        $(`#${node1}`).removeClass("node");
        $(`#${node1}`).css({
            "fill": response.data.player.color, "stroke": "black",
            "stroke-width": "4px",
            "visibility": "visible",
            "opacity": 1
        });
        $(`#${node1} .shadow`).css("visibility", "hidden");

        $('.node').off("click");
        $('.node').css("visibility", "hidden");

        $('.node').off("click");
        $('.node').removeClass("node-hover");

        $('.node').off("click");
        $('.node').removeClass("node-hover");
    });
}





export default Control;