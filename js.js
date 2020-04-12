let allMaps = [];
let map0 = [
		[99,99,99,99,99,99,99,99,99,99,99,99,99],
		[99,1,1,1,1,1,1,1,1,1,1,1,99],
		[99,2,0,1,0,0,0,1,0,0,0,1,99],
		[99,1,0,1,0,1,0,1,0,1,0,1,99],
		[99,1,0,0,0,1,0,0,0,1,0,1,99],
		[99,1,0,1,1,1,1,1,1,1,0,1,99],
		[99,1,0,1,0,0,0,1,0,0,0,1,99],
		[99,1,1,1,0,1,0,1,0,1,0,1,99],
		[99,1,0,0,0,1,0,0,0,1,0,1,99],
		[99,1,0,1,1,1,1,1,1,1,0,1,99],
		[99,1,0,1,0,0,0,0,0,0,0,3,99],
		[99,1,1,1,1,1,1,1,1,1,1,1,99],
		[99,99,99,99,99,99,99,99,99,99,99,99,99],


];
allMaps[0] = map0;

let wholeMaze;
let squares = [];

let level = 1;
let currentMap = allMaps[0];
let squareType = ["grass", "wall", "player", "goal", "success"];
window.addEventListener("load", startGame);
let columnPos;
let rowPos;

function renderMap() {
	for (let row = 0; row < currentMap.length; row++) {
		let divRow = document.createElement("div");
		divRow.setAttribute("class", "row");
		wholeMaze.appendChild(divRow);
		squares[row] = [];
		for (let column = 0; column < currentMap[row].length; column++){
			squares[row][column] = document.createElement("div");
			squares[row][column].setAttribute("class", squareType[currentMap[row][column]]);
			divRow.appendChild(squares[row][column]);
			if (currentMap[row][column] === 2) {
				rowPos = row;
				columnPos = column;
			}
		}
	}
}

function startGame() {
	wholeMaze = document.getElementById("whole-maze");

	renderMap();
	document.addEventListener("keydown", movement);
}

function setGrass() {
	currentMap[rowPos][columnPos] = 0;
	squares[rowPos][columnPos].setAttribute("class", "grass");
}

function changeMoveWin() {
	currentMap[rowPos][columnPos] = 0;
	squares[rowPos][columnPos].setAttribute("class", "grass");
	squares[currentMap.length-2][currentMap[0].length-1].setAttribute("class", "success");
}

function movePlayer(newRowPos, newColumnPos) {
	currentMap[newRowPos][newColumnPos] = 2;
	squares[newRowPos][newColumnPos].setAttribute("class", "player");

	rowPos = newRowPos;
	columnPos = newColumnPos;

}

function movement(event) {
	if (event.code === "KeyW" || event.code === "ArrowUp") {
		if (currentMap[rowPos-1][columnPos] === 1 || currentMap[rowPos-1][columnPos] === 99) {
		} else if (currentMap[rowPos-1][columnPos] === 3){
			changeMoveWin();
		} else {
			setGrass();
			movePlayer(rowPos-1, columnPos);
		}
	} else if (event.code === "KeyD" || event.code === "ArrowRight") {
		if (currentMap[rowPos][columnPos+1] === 1 || currentMap[rowPos][columnPos+1] === 99) {
		} else if (currentMap[rowPos][columnPos+1] === 3){
			changeMoveWin();
		} else {
			setGrass();
			movePlayer(rowPos, columnPos + 1);
		}
	} else if (event.code === "KeyS" || event.code === "ArrowDown") {
		if (currentMap[rowPos+1][columnPos] === 1 || currentMap[rowPos][columnPos+1] === 99) {
		} else if (currentMap[rowPos+1][columnPos] === 3){
			changeMoveWin();
		} else {
			setGrass();
			movePlayer(rowPos +1, columnPos);
		}
	} else if (event.code === "KeyA" || event.code === "ArrowLeft") {
		if (currentMap[rowPos][columnPos-1] === 1 ||currentMap[rowPos][columnPos-1] === 99) {
		} else if (currentMap[rowPos][columnPos-1] === 3){
			changeMoveWin();
		} else {
			setGrass();
			movePlayer(rowPos, columnPos - 1);
		}
	}

}




