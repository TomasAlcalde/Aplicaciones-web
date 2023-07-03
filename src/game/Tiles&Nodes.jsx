import { useState } from 'react'
import axios from 'axios';
import './Game.css'

function drawTile(tileList, boardTile) {
    console.log("draw tile");
    // draw normal resource tile
    for (var i = 0; i < tileList.length; i++) {
        var x = tileList[i].location[0];
        var y = tileList[i].location[1];
        var val = tileList[i].number;
        // console.log(`${this.tileList[i].resource}`);

        if (tileList[i].number == null || tileList[i].resource == "desert") {
             boardTile.append(`
                <g class="tile ${tileList[i].resource}" id = t${tileList[i].id}>
                    <use xlink: href="#hexagon" transform="translate(${x}, ${y})" />
                </g>
            `);
        } else {
            boardTile.append(`
                <g class="tile ${tileList[i].resource}" id = t${tileList[i].id} val = ${val}>
                    <use xlink: href="#hexagon" transform="translate(${x}, ${y})"></use>
                    <circle class="circle" cx=${x} cy=${y} r="20"></circle>
                    <text class="tile-val" x=${x} y=${y + 10} > ${val}</text>
                </g>
            `);
        }
    }
}

function drawNode(nodeList, boardNode) {
    console.log("draw node");
    for (var i = 0; i < nodeList.length; i++) {
        var x = nodeList[i].location[0];
        var y = nodeList[i].location[1];

        boardNode.append(`
            <g class="node" id = ${nodeList[i].id} >
                <circle class="node-circle" cx=${x} cy=${y} r="10" />
                <circle class ="shadow" cx=${x} cy=${y} r="15" fill="#ffffe6"/>
            </g>
        `);
    }
}

async function render(tileList) {
    // loop over resource list
    for (var i = 0; i < tileList.length; i++) {
        $(`#t${tileList[i].id}`)[0].style.fill = `url(#pattern-${tileList[i].resource})`;
        
    }
    
    var temp = $('.shadow');
    for (var i = 0; i < temp.length; i++) {
        temp[i].style.filter = `url(#filter_shadow)`;
    }
}

export async function display(token, game_id) {
    try {
        var tileSize = 50;
        var w = Math.sqrt(3) * tileSize;
        var boardTile = $("<div>");
        var boardNode = $("<div>");
        const response = await axios({
            method: 'get',
            url: `https://aplicaciones-web.onrender.com/games/${game_id}`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }) 
        if (response) {
            const tileList = response.data.tiles;
            const nodeList = response.data.nodes;
            await drawTile(tileList, boardTile);
            await drawNode(nodeList, boardNode);
            $('#main_panel').empty(); // clear main_panel
            // define tile/hexagon pattern, hexagon shape
            $('#main_panel').html(`
                <svg id = "board" >
                    <defs>
                        <pattern id="pattern-desert" height="100%" width="100%" patternContentUnits="objectBoundingBox">
                            <image height="1" width="1" preserveAspectRatio="none" xlink:href="../src/assets/desert.jpg" />
                        </pattern>

                        <pattern id="pattern-wood" height="100%" width="100%" patternContentUnits="objectBoundingBox">
                            <image height="1" width="1" preserveAspectRatio="none" xlink:href="../src/assets/forest.jpg" />
                        </pattern>

                        <pattern id="pattern-clay" height="100%" width="100%" patternContentUnits="objectBoundingBox">
                            <image height="1" width="1" preserveAspectRatio="none" xlink:href="../src/assets/brick.jpg" />
                        </pattern>

                        <pattern id="pattern-stone" height="100%" width="100%" patternContentUnits="objectBoundingBox">
                            <image height="1" width="1" preserveAspectRatio="none" xlink:href="../src/assets/stone.jpg" />
                        </pattern>

                        <pattern id="pattern-wheat" height="100%" width="100%" patternContentUnits="objectBoundingBox">
                            <image height="1" width="1" preserveAspectRatio="none" xlink:href="../src/assets/grain.jpg" />
                        </pattern>

                        <pattern id="pattern-sheep" height="100%" width="100%" patternContentUnits="objectBoundingBox">
                            <image height="1" width="1" preserveAspectRatio="none" xlink:href="../src/assets/wool.jpg"/ >
                        </pattern>

                        <pattern id="pattern-sea" height="100%" width="100%" patternContentUnits="objectBoundingBox">
                            <image height="1" width="1" preserveAspectRatio="none" xlink:href="../src/assets/sea.jpg" />
                        </pattern>

                        <g id="hexagon">
                            <polygon points="0,${-tileSize} ,${w / 2},${-tileSize / 2}, ${w / 2},${tileSize / 2}, 0,${tileSize}, ${-w / 2},${tileSize / 2}, ${-w / 2},${-tileSize / 2}" />
                        </g>

                        <filter id="filter_shadow">
                            <feGaussianBlur stdDeviation="5"/>
                        </filter>
                    </defs>

                    <g id="group-tile">
                        ${boardTile.html()}
                    </g>
                    <g id="group-node">
                        ${boardNode.html()}
                    </g>
                </svg >
            `);
            render(tileList);
        }
    } catch(error) {
        console.log("Se produjo un error cargando el tablero");
    }
    return
}
