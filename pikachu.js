const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
let cellWidth = isMobile ? 85 : 50;
let cellHeight = isMobile ? 85 : 50;
let gameWidth = 12;
let gameHeight = 12;
let shuffleTimes = [25, 20, 18, 15, 12, 10];
let shuffleIndex;
let timeDuration = [5000, 4500, 4000, 3500, 3000, 2500];
let timeIndex;
let totalCells = gameHeight * gameWidth;
var DONE = false;
let countDownTimer = 300; //5 phút
const cell_images = [
    "image/pokemon-1.jpg",
    "image/pokemon-2.jpg",
    "image/pokemon-3.jpg",
    "image/pokemon-4.jpg",
    "image/pokemon-5.jpg",
    "image/pokemon-6.jpg",
    "image/pokemon-7.jpg",
    "image/pokemon-8.jpg",
    "image/pokemon-9.jpg",
    "image/pokemon-11.jpg",
    "image/pokemon-12.jpg",
    "image/pokemon-13.jpg",
    "image/pokemon-14.jpg",
    "image/pokemon-15.jpg",
    "image/pokemon-16.jpg",
    "image/pokemon-17.jpg",
    "image/pokemon-18.jpg",
    "image/pokemon-19.jpg",
    "image/pokemon-20.jpg",
    "image/pokemon-21.jpg",
    "image/pokemon-22.jpg",
    "image/pokemon-23.jpg",
    "image/pokemon-24.jpg",
    "image/pokemon-25.jpg",
    "image/pokemon-26.jpg",
    "image/pokemon-27.jpg",
    "image/pokemon-28.jpg",
    "image/pokemon-29.jpg",
    "image/pokemon-30.jpg",
    "image/pokemon-30.jpg",
    "image/pokemon-30.jpg",
    "image/pokemon-31.jpg",
    "image/pokemon-32.jpg",
    "image/pokemon-33.jpg",
    "image/pokemon-34.jpg",
    "image/pokemon-35.jpg",
    "image/pokemon-36.jpg",
    "image/pokemon-37.jpg",
    "image/pokemon-38.jpg",
    "image/pokemon-39.jpg",
    "image/pokemon-40.jpg",
    "image/pokemon-41.jpg",
    "image/pokemon-42.jpg",
    "image/pokemon-43.jpg",
    "image/pokemon-44.jpg",
    "image/pokemon-45.jpg",
    "image/pokemon-46.jpg",
    "image/pokemon-47.jpg",
    "image/pokemon-48.jpg",
    "image/pokemon-49.jpg",
    "image/pokemon-50.jpg",
    "image/pokemon-51.jpg",
    "image/pokemon-52.jpg",
    "image/pokemon-53.jpg",
    "image/pokemon-54.jpg",
    "image/pokemon-55.jpg",
    "image/pokemon-56.jpg",
    "image/pokemon-57.jpg",
    "image/pokemon-58.jpg",
    "image/pokemon-59.jpg",
    "image/pokemon-60.jpg",
];

let wrapper = document.getElementById("wrapper");
let introFrame = document.getElementById("introFrame");
let gameFrame = document.getElementById("gameFrame");
let score_label = document.getElementById("score");
let score_title = document.getElementById("score_title");

let level_select = document.getElementById("levels");
let level = document.getElementById("level_index");
let shuffle = document.getElementById("shuffle_index");

let content = document.getElementById("content");
let countDownDiv = document.getElementById("countdownDiv");
let start_button = document.getElementById("startButton");
let inputCountdown = document.getElementById("dateTimes");

let end_frame = document.getElementById("end_game");
let end_score = document.getElementById("score_end");
let return_button = document.getElementById("backToMenu");
let retry_button = document.getElementById("tryAgain");
let level_retry;
return_button.onclick = function () {
    returnToMenuButton();
};

retry_button.onclick = function () {
    retryThisLevel();
};

var cells = [];
const themeAudio = new Audio();
themeAudio.src = "audio/theme.mp3";
themeAudio.volume = 0.8;

const scoreAudio = new Audio();
scoreAudio.src = "audio/connect (1).mp3";
scoreAudio.volume = 0.8;

//start game-
start_button.onclick = function () {
    init();
    introFrame.style.display = "none";
    gameFrame.style.display = "block";
    timer_bar.style.display = "inline-flex";
    labels.style.display = "inline-flex";
    score_label.style.display = "block";
    countDownDiv.style.display = "grid";
    content.style.display = "flex";
    clearInterval(countDown);
    timer.style.width = "300px";
    interval = 100;
    countDown = null;
    levelController();
    shuffle.innerHTML = shuffleIndex;
    themeAudio.play();
    level.innerHTML = level_select.options[level_select.selectedIndex].text;
    countDownTimer = inputCountdown.value != "" ? inputCountdown.value : 300;
    handleCountdown(countDownTimer, () => {
        setTimeout(() => {
            let score_title = document.getElementById("score_title");
            let gameFrame = document.getElementById("gameFrame");
            let alert = `<div class="time_out">
                                    <p>TIME OUT!</p>
                                 </div>                
                    `;
            gameFrame.innerHTML += alert;
            let x = confirm(
                `Chúng mừng bạn đã hoàn thành game với số điểm là: ${score_title?.innerHTML}`
            );
            if (x) {
                location.href =
                    location.href + "?timestamp=" + new Date().getTime();
            }
        }, 1000);
    });
};

//level controller
const levelController = () => {
    let level_info = level_select.options[level_select.selectedIndex].text;
    switch (level_info) {
        case "Easy":
            timeIndex = timeDuration[0];
            shuffleIndex = shuffleTimes[0];
            break;
        case "Medium":
            timeIndex = timeDuration[1];
            shuffleIndex = shuffleTimes[1];
            break;
        case "Hard":
            timeIndex = timeDuration[2];
            shuffleIndex = shuffleTimes[2];
            break;
        case "Extreme":
            timeIndex = timeDuration[3];
            shuffleIndex = shuffleTimes[3];
            break;
        case "Terrible":
            timeIndex = timeDuration[4];
            shuffleIndex = shuffleTimes[4];
            break;
        case "Nightmare":
            timeIndex = timeDuration[5];
            shuffleIndex = shuffleTimes[5];
            break;
    }
};

//level direction
const levelDirection = () => {
    let level_info = level_select.options[level_select.selectedIndex].text;
    switch (level_info) {
        case "Easy":
            break;
        case "Medium":
            flowToLeft();
            break;
        case "Hard":
            flowToRight();
            break;
        case "Extreme":
            flowToBottom();
            break;
        case "Terrible":
            flowToTop();
            break;
        case "Nightmare":
            moveRightHaftToLeft();
            moveLeftHaftToRight();
            break;
    }
};

//return to menu button
const returnToMenuButton = () => {
    location.reload();
};

const retryThisLevel = () => {
    gameFrame.innerHTML = "";
    end_frame.style.display = "none";
    gameFrame.style.display = "block";
    timer_bar.style.display = "inline-flex";
    labels.style.display = "inline-flex";
    levelController();
    init();
};

// timer countdown bar
let timer_bar = document.createElement("div");
let labels = document.createElement("div");
const timerBar = () => {
    timer_bar.style.display = "none";
    //timer
    let timer_wrapper = document.createElement("div");
    timer_wrapper.className = "timer_wrapper";
    let timer = document.createElement("div");
    timer.id = "timer_id";
    timer.className = "timer";

    //pause button
    let pause = document.createElement("div");
    pause.onclick = function () {
        pauseButton();
    };
    pause.className = "pause";
    pause.innerHTML = '<i class="fa-solid fa-pause"></i>';

    //restart game button
    let restart = document.createElement("div");
    restart.className = "restart";
    restart.innerHTML = '<i class="fa-solid fa-repeat"></i>';
    restart.onclick = function () {
        shuffleButton();
    };
    //label
    labels.style.display = "none";
    let pause_label = document.createElement("div");
    pause_label.className = "pause_label";
    pause_label.innerHTML = "Stop";
    let restart_label = document.createElement("div");

    restart_label.className = "restart_label";
    restart_label.innerHTML = "Shuffle";
    let timer_label = document.createElement("div");
    timer_label.className = "timer_label";
    timer_label.innerHTML = "Timer";

    wrapper.append(timer_bar);
    timer_bar.append(pause);
    timer_bar.append(restart);
    timer_bar.append(timer_wrapper);
    timer_wrapper.append(timer);

    wrapper.append(labels);
    labels.append(pause_label);
    labels.append(restart_label);
    labels.append(timer_label);
};
timerBar();

//get random images
let cellsLength;

function getRandomImages() {
    let cellImages = [];
    //generate 100 cells = 50 pairs
    for (let i = 0; i < totalCells / 3 + 2; i++) {
        let randomIndex = Math.floor(Math.random() * cell_images.length);
        let randomImage = cell_images[randomIndex];
        //add 1 pair
        cellImages.push(randomImage);
        cellImages.push(randomImage);
    }
    cellsLength = cellImages.length;
    console.log(cellImages.length);
    return cellImages;
}

//shuffle cell images
function shuffleCellImages(cellImages) {
    for (let i = cellImages.length - 2; i > 1; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [cellImages[i], cellImages[j]] = [cellImages[j], cellImages[i]];
    }
    return cellImages;
}

//import images to game frame
const init = () => {
    for (let i = 0; i < gameWidth; i++) {
        let rs = [];
        for (let j = 0; j < gameHeight; j++) {
            rs.push(0);
        }
        cells.push(rs);
    }
    let cellImages = shuffleCellImages(getRandomImages());
    let k = 0;
    for (let i = 1; i < gameWidth - 1; i++) {
        for (let j = 1; j < gameHeight - 1; j++) {
            let value = cellImages[k];
            cells[i][j] = value;
            k = k + 1;
        }
    }
    for (let i = 0; i < gameWidth; i++) {
        for (let j = 0; j < gameHeight; j++) {
            draw(i, j, cells[i][j]);
        }
    }
};

//update the game frame after changes
const reRender = () => {
    gameFrame.textContent = "";
    for (let i = 0; i < gameWidth; i++) {
        for (let j = 0; j < gameHeight; j++) {
            draw(i, j, cells[i][j]);
        }
    }
};

//generate cells by div element to game frame
const draw = (x, y, value) => {
    let cell = document.createElement("div");
    cell.className = "cell cell_" + x + "-" + y;
    cell.style.backgroundImage = `url(${value})`;
    if (value === 0) {
        cell.style.backgroundColor = "#faebd700";
        cell.style.border = "none";
    }
    cell.style.left = `${y * cellWidth}px`;
    cell.style.top = `${x * cellHeight}px`;
    cell.style.backgroundRepeat = "no-repeat";
    cell.style.backgroundSize = `${cellWidth}px ` + `${cellHeight}px`;

    cell.addEventListener("click", (e) => {
        mouseClicked(x, y, e);
    });
    gameFrame.appendChild(cell);
};

//mouse clicked function
let cell1, cell2, div1, div2;
let visited = [];

//store and check visited cells
const initVisited = () => {
    visited = [];
    for (let i = 0; i < gameWidth; i++) {
        let row = [];
        for (let j = 0; j < gameHeight; j++) {
            row.push(false);
        }
        visited.push(row);
    }
};

let interval = 100;
let interval_update;
let bonus_score;
let interval_status = false;
let countDown = null;
let countdown_value;
//stop timer
let timer = document.getElementById("timer_id");
const pauseButton = () => {
    let width_stopped = interval_update;
    if (!interval_status) {
        interval_status = true;
        timer.style.width = width_stopped + "%";
        clearInterval(countDown);
        countDown = null;
        let pause = document.getElementsByClassName("pause")[0];
        let text = document.getElementsByClassName("pause_label")[0];
        text.textContent = "Play";
        gameFrame.style.backgroundImage = 'url("image/pokestop.jpg")';
        gameFrame.style.opacity = "0.05";
        pause.innerHTML = '<i class="fa-solid fa-play"></i>';
    } else {
        interval_status = false;
        let pause = document.getElementsByClassName("pause")[0];
        gameFrame.style.opacity = "1";
        gameFrame.style.backgroundImage = "none";
        pause.innerHTML = '<i class="fa-solid fa-pause"></i>';
        let text = document.getElementsByClassName("pause_label")[0];
        text.textContent = "Stop";
        countDown = setInterval(() => {
            interval--;
            let timer = document.getElementById("timer_id");
            let progressWidth = interval;

            if (interval > 0) {
                timer.style.width = progressWidth + "%";
                interval_update = progressWidth;
            } else {
                clearInterval(countDown);
                timer.style.width = "0%";
                // let alert = `<div class="time_out">
                //                 <p>TIME OUT!</p>
                //              </div>
                // `;
                // gameFrame.innerHTML += alert;
            }
        }, timeIndex);
    }
    countdown_value = countDown;
};

//shuffle pokemon
let shuffle_display;
const shuffleButton = () => {
    if (shuffleIndex >= 0) {
        for (let i = 1; i < cells.length - 1; i++) {
            for (let j = 1; j < cells[i].length - 1; j++) {
                if (cells[i][j] !== 0) {
                    let c1 = cells[i][j];
                    let i_r = Math.floor(Math.random() * (gameHeight - 2)) + 1;
                    let j_r = Math.floor(Math.random() * (gameHeight - 2)) + 1;
                    for (let k = 0; k < 10000; k++) {
                        if (cells[i_r][j_r] === 0) {
                            i_r =
                                Math.floor(Math.random() * (gameHeight - 2)) +
                                1;
                            j_r =
                                Math.floor(Math.random() * (gameHeight - 2)) +
                                1;
                        } else {
                            break;
                        }
                    }
                    let value_c1 = cells[i][j];
                    cells[i][j] = cells[i_r][j_r];
                    cells[i_r][j_r] = value_c1;
                }
            }
        }
        shuffleIndex = shuffleIndex - 1;
        shuffle_display = shuffleIndex;
        updateShuffle(shuffle_display);
    }
    reRender();
};

//click function
function mouseClicked(x, y, e) {
    if (countDown === null) {
        countDown = setInterval(() => {
            interval--;
            // let timer = document.getElementById("timer_id")
            let progressWidth = interval - interval * 0.0000000025;
            if (interval > 0) {
                timer.style.width = progressWidth + "%";
                interval_update = progressWidth;
            } else {
                clearInterval(countDown);
                timer.style.width = "0%";
                let alert = `<div class="time_out">
                                <p>TIME OUT!</p>
                             </div>`;
                gameFrame.innerHTML += alert;
            }
        }, timeIndex);
    }

    let count = 0;
    if (cells[x][y] !== 0) {
        e.target.style.opacity = "0.5";
        let clickedCell = e.target;
        if (clickedCell !== cell1) {
            if (!cell1 || cell1 === null) {
                div1 = clickedCell;
                cell1 = [x, y];
                count++;
            } else if (cell1[0] === x && cell1[1] === y) {
                e.target.style.opacity = "1";
                cell1 = null;
            } else {
                div2 = clickedCell;
                cell2 = [x, y];
                finishPath = false;
                initVisited();
                let first_cell = cells[cell1[0]][cell1[1]];
                let second_cell = cells[cell2[0]][cell2[1]];
                if (first_cell === second_cell) {
                    pathWay(cell1, cell2);
                }
                if (DONE) {
                    DONE = false;
                } else {
                    div1.style.opacity = "1";
                    div2.style.opacity = "1";
                    cell1 = null;
                    cell2 = null;
                }
            }
        }
    }
}

//shuffle times update
const updateShuffle = (shuffle_display) => {
    if (shuffle_display < 0) {
        return;
    }
    shuffle_display = shuffleIndex;
    // shuffleIndex = shuffle_times
    shuffle.innerHTML = shuffleIndex;
};

const decreaseShuffle = () => {
    updateShuffle(shuffleIndex - 1);
};

// score update
let score = 0;
const updateScore = (newScore) => {
    if (isNaN(newScore)) return;
    score = newScore;
    score_title.innerHTML = score;
};

const increaseScore = () => {
    updateScore(score + 100);
};

let count = 0;
const pathWay = (cell1, cell2) => {
    let stack = [];
    stack.push(cell1);
    while (stack.length !== 0) {
        //get next element in stack
        let getCell = stack.shift();
        //find neighbors for current cell
        const neighbors = [
            { row: getCell[0] - 1, col: getCell[1] },
            { row: getCell[0] + 1, col: getCell[1] },
            { row: getCell[0], col: getCell[1] - 1 },
            { row: getCell[0], col: getCell[1] + 1 },
        ];
        for (let i = 0; i < neighbors.length; i++) {
            let neighbor = neighbors[i];
            let neighborRow = neighbor.row;
            let neighborCol = neighbor.col;
            //check if the neighbor is within the size of the game then push to stack if correct
            if (
                neighborRow >= 0 &&
                neighborRow < gameWidth &&
                neighborCol >= 0 &&
                neighborCol < gameHeight
            ) {
                if (
                    cells[neighborRow][neighborCol] === 0 &&
                    visited[neighborRow][neighborCol] === false
                ) {
                    let tmp = [neighborRow, neighborCol];
                    stack.push(tmp);
                    visited[neighborRow][neighborCol] = getCell;
                }
                if (neighborRow === cell2[0] && neighborCol === cell2[1]) {
                    visited[cell2[0]][cell2[1]] = getCell;
                    logPath(visited);
                }
            }
        }
    }
    // updateShuffle()
};
var finishPath = false;

//log the path between 2 cells
const logPath = (v) => {
    let path = [];
    let c = cell2;
    //loop until reach start cell
    while (c[0] !== cell1[0] || c[1] !== cell1[1]) {
        c = v[c[0]][c[1]];
        path.push(c);
    }
    let checkExistCell2 = false;
    for (let i = 0; i < path.length; i++) {
        if (path[i][0] === cell2[0] && path[i][1] === cell2[1]) {
            checkExistCell2 = true;
            break;
        }
    }
    if (!checkExistCell2) {
        path.reverse();
        path.push(cell2);
    } else {
        path.push(cell1);
    }
    //check path's length and mark cells in path
    let pathWay = new Map();
    if (path.length <= 2 && !finishPath) {
        pathWay.set(0, path);
        drawPathWay(pathWay, path);
    } else {
        let count = 0;
        pathWay.set(count, [path[0]]);
        pathWay.set(count, [...pathWay.get(count), path[1]]);
        for (let i = 2; i < path.length; i++) {
            if (
                path[i][0] !== path[i - 2][0] &&
                path[i][1] !== path[i - 2][1]
            ) {
                count++;
                if (pathWay.get(count) !== undefined) {
                    pathWay.set(count, [...pathWay.get(count), path[i]]);
                } else {
                    pathWay.set(count, [path[i]]);
                }
            } else {
                if (pathWay.get(count) !== undefined) {
                    pathWay.set(count, [...pathWay.get(count), path[i]]);
                } else {
                    pathWay.set(count, [path[i]]);
                }
            }
        }
        // console.log("Count: ", count)
        if (count <= 2 && !finishPath) {
            drawPathWay(pathWay, path, cell2);
        }
    }
};

//generate path way between 2 cells
const drawPathWay = (path, arrr, cell2) => {
    finishPath = true;
    let frame = document.querySelector("#gameFrame");

    for (let i = 0; i < path.size; i++) {
        let arrayPath1 = path.get(i);
        if (
            arrayPath1[0][1] === arrayPath1[arrayPath1.length - 1][1] &&
            arrayPath1.length !== 1
        ) {
            console.log(arrayPath1);
            if (i > 0) {
                arrayPath1 = [
                    path.get(i - 1)[path.get(i - 1).length - 1],
                    ...arrayPath1,
                ];
            }
            let left = Number(
                document
                    .querySelector(
                        `.cell_${arrayPath1[0][0]}-${arrayPath1[0][1]}`
                    )
                    .style.left.split("px")[0]
            );
            let start = Number(
                document
                    .querySelector(
                        `.cell_${arrayPath1[0][0]}-${arrayPath1[0][1]}`
                    )
                    .style.top.split("px")[0]
            );
            let end = Number(
                document
                    .querySelector(
                        `.cell_${arrayPath1[arrayPath1.length - 1][0]}-${
                            arrayPath1[arrayPath1.length - 1][1]
                        }`
                    )
                    .style.top.split("px")[0]
            );
            // console.log(start, end , left);
            if (start > end) {
                let s = start;
                start = end;
                end = s;
            }
            let line = $("<div>").addClass("line");
            line.css({
                width: "3px",
                position: "absolute",
                top: start + 25 + "px",
                left: left + 25 + "px",
                height: end - start + "px",
                background: "red",
            });
            $(frame).append(line);
        } else {
            console.log(path.get(i));
            if (i > 0) {
                arrayPath1 = [
                    path.get(i - 1)[path.get(i - 1).length - 1],
                    ...arrayPath1,
                ];
            }
            let top = Number(
                document
                    .querySelector(
                        `.cell_${arrayPath1[0][0]}-${arrayPath1[0][1]}`
                    )
                    .style.top.split("px")[0]
            );
            let start = Number(
                document
                    .querySelector(
                        `.cell_${arrayPath1[0][0]}-${arrayPath1[0][1]}`
                    )
                    .style.left.split("px")[0]
            );
            let end = Number(
                document
                    .querySelector(
                        `.cell_${arrayPath1[arrayPath1.length - 1][0]}-${
                            arrayPath1[arrayPath1.length - 1][1]
                        }`
                    )
                    .style.left.split("px")[0]
            );
            if (start > end) {
                let s = start;
                start = end;
                end = s;
            }
            let line = $("<div>").addClass("line");
            line.css({
                position: "absolute",
                top: Number(top) + 25 + "px",
                left: Number(start) + 25 + "px",
                right: Number($(frame).width()) - Number(end) - 25 + "px",
                background: "red",
                height: "3px",
            });
            $(frame).append(line);
        }
        arrayPath1 = path.get(i);
        if (arrayPath1[0][1] === arrayPath1[arrayPath1.length - 1][1]) {
            console.log(arrayPath1);
            if (i > 0) {
                arrayPath1 = [
                    path.get(i - 1)[path.get(i - 1).length - 1],
                    ...arrayPath1,
                ];
            }
            let left = Number(
                document
                    .querySelector(
                        `.cell_${arrayPath1[0][0]}-${arrayPath1[0][1]}`
                    )
                    .style.left.split("px")[0]
            );
            let start = Number(
                document
                    .querySelector(
                        `.cell_${arrayPath1[0][0]}-${arrayPath1[0][1]}`
                    )
                    .style.top.split("px")[0]
            );
            let end = Number(
                document
                    .querySelector(
                        `.cell_${arrayPath1[arrayPath1.length - 1][0]}-${
                            arrayPath1[arrayPath1.length - 1][1]
                        }`
                    )
                    .style.top.split("px")[0]
            );
            if (start > end) {
                let s = start;
                start = end;
                end = s;
            }
            let line = $("<div>").addClass("line");
            line.css({
                width: "3px",
                position: "absolute",
                top: start + 25 + "px",
                left: left + 25 + "px",
                height: end - start + "px",
                background: "red",
            });
            $(frame).append(line);
        } else {
            console.log(path.get(i));
            if (i > 0) {
                arrayPath1 = [
                    path.get(i - 1)[path.get(i - 1).length - 1],
                    ...arrayPath1,
                ];
            }

            let top = Number(
                document
                    .querySelector(
                        `.cell_${arrayPath1[0][0]}-${arrayPath1[0][1]}`
                    )
                    .style.top.split("px")[0]
            );
            let start = Number(
                document
                    .querySelector(
                        `.cell_${arrayPath1[0][0]}-${arrayPath1[0][1]}`
                    )
                    .style.left.split("px")[0]
            );
            let end = Number(
                document
                    .querySelector(
                        `.cell_${arrayPath1[arrayPath1.length - 1][0]}-${
                            arrayPath1[arrayPath1.length - 1][1]
                        }`
                    )
                    .style.left.split("px")[0]
            );
            if (start > end) {
                let s = start;
                start = end;
                end = s;
            }
            let line = $("<div>").addClass("line");
            line.css({
                position: "absolute",
                top: Number(top) + 25 + "px",
                left: Number(start) + 25 + "px",
                right: Number($(frame).width()) - Number(end) - 25 + "px",
                background: "red",
                height: "3px",
            });
            $(frame).append(line);
        }
    }
    increaseScore();
    setTimeout(() => {
        arrr.map((j) => {
            cells[j[0]][j[1]] = 0;
        });
        scoreAudio.play();
        reRender();
        levelDirection();
        endGame();
    }, 400);
};

//swap 2 cells in same row by x index
const swapCellX = (i, index, x) => {
    let tmp = cells[x][i];
    cells[x][i] = cells[x][index];
    cells[x][index] = tmp;
};

//swap 2 cells in same column by y index
const swapCellY = (i, index, y) => {
    let tmp = cells[i][y];
    cells[i][y] = cells[index][y];
    cells[index][y] = tmp;
};

//MOVE TO TOP

const check0CellInColumnTop = (start, y) => {
    for (let i = start; i < cells.length - 1; i++) {
        if (cells[i][y] !== 0) {
            return i;
        }
    }
    return -1;
};
const isPossibleToMoveTop = (y) => {
    let index = 0;
    for (let i = 1; i < cells.length - 1; i++) {
        if (cells[i][y] === 0) {
            index = i;
            break;
        }
    }

    for (let i = 1; i < cells.length - 1; i++) {
        if (cells[i][y] !== 0 && i > index) {
            return false;
        }
    }
    return true;
};

const flowToTop = () => {
    for (let i = 1; i < cells[0].length - 1; i++) {
        let y = i;
        let count = 0;
        for (let j = 1; j < cells.length - 1; j++) {
            if (cells[j][y] === 0) {
                count++;
                break;
            }
        }
        //cells[i][j] = 0 exist
        if (count !== 0 && count !== cells.length - 2) {
            while (!isPossibleToMoveTop(i)) {
                for (let k = 1; k < cells.length - 1; k++) {
                    if (cells[k][y] === 0) {
                        let index = check0CellInColumnTop(k, y);
                        if (index !== -1) {
                            swapCellY(k, index, y);
                            break;
                        }
                    }
                }
            }
        }
    }
    reRender();
};

//MOVE TO BOTTOM
const check0CellInColumnBottom = (start, y) => {
    for (let i = start; i > 0; i--) {
        if (cells[i][y] !== 0) {
            return i;
        }
    }
    return -1;
};

const isPossibleToMoveBottom = (y) => {
    let index = 0;
    for (let i = cells.length - 2; i > 0; i--) {
        if (cells[i][y] === 0) {
            index = i;
            break;
        }
    }

    for (let i = cells.length - 2; i > 0; i--) {
        if (cells[i][y] !== 0 && i < index) {
            return false;
        }
    }
    return true;
};

const flowToBottom = () => {
    for (let i = 1; i < cells[0].length - 1; i++) {
        let y = i;
        let count = 0;
        for (let j = 1; j < cells.length - 1; j++) {
            if (cells[j][y] === 0) {
                count++;
                break;
            }
        }
        if (count !== 0 && count !== cells.length - 2) {
            while (!isPossibleToMoveBottom(i)) {
                for (let k = cells.length - 2; k > 0; k--) {
                    if (cells[k][y] === 0) {
                        let index = check0CellInColumnBottom(k, y);
                        if (index !== -1) {
                            swapCellY(k, index, y);
                            break;
                        }
                    }
                }
            }
        }
    }
    reRender();
};

//MOVE TO LEFT
//check clone cell to swap, if don't have return -1
const check0CellInRowLeft = (start, x) => {
    for (let i = start; i < cells[x].length; i++) {
        if (cells[x][i] !== 0) {
            return i;
        }
    }
    return -1;
};

//check a row possible for moving to left
const isPossibleToMoveLeft = (x) => {
    let index = 0;
    for (let i = 1; i < cells.length - 1; i++) {
        if (cells[x][i] === 0) {
            index = i;
            break;
        }
    }

    for (let i = 1; i < cells.length - 1; i++) {
        if (cells[x][i] !== 0 && i > index) {
            return false;
        }
    }
    return true;
};

//move cells to left direction
const flowToLeft = () => {
    for (let i = 1; i < cells.length - 1; i++) {
        let x = i;
        let count = 0;
        for (let j = 1; j < cells[0].length - 1; j++) {
            if (cells[i][j] === 0) {
                count++;
            }
        }
        //cells[i][j] = 0 exist
        if (count !== 0 && count !== cells[0].length - 2) {
            while (!isPossibleToMoveLeft(i)) {
                for (let k = 1; k < cells[x].length - 1; k++) {
                    if (cells[x][k] === 0) {
                        let index = check0CellInRowLeft(k, x);
                        if (index !== 1) {
                            swapCellX(k, index, x);
                            break;
                        }
                    }
                }
            }
        }
    }
    reRender();
};

//MOVE TO RIGHT
const check0CellInRowRight = (start, x) => {
    for (let i = start; i > 0; i--) {
        if (cells[x][i] !== 0) {
            return i;
        }
    }
    return -1;
};

const isPossibleToMoveRight = (x) => {
    let index = 0;
    for (let i = cells[0].length - 2; i > 0; i--) {
        if (cells[x][i] === 0) {
            index = i;
            break;
        }
    }

    for (let i = cells[0].length - 2; i > 0; i--) {
        if (cells[x][i] !== 0 && i < index) {
            return false;
        }
    }
    return true;
};

const flowToRight = () => {
    for (let i = 1; i < cells.length - 1; i++) {
        let x = i;
        let count = 0;
        for (let j = 1; j < cells[0].length - 1; j++) {
            if (cells[x][j] === 0) {
                count++;
            }
        }
        if (count !== 0 && count != cells[0].length - 2) {
            while (!isPossibleToMoveRight(i)) {
                for (let k = cells[x].length - 2; k > 0; k--) {
                    if (cells[x][k] === 0) {
                        let index = check0CellInRowRight(k, x);
                        if (index !== -1) {
                            swapCellX(k, index, x);
                            break;
                        }
                    }
                }
            }
        }
    }
    reRender();
};

//MOVE EACH HAFT TO LEFT AND RIGHT

//MOVE LEFT HAFT TO RIGHT

const check0CellInRowMoveLeftHaftToRight = (start, x) => {
    for (let i = start; i < cells[0].length - 1; i++) {
        if (cells[x][i] !== 0) {
            return i;
        }
    }
    return -1;
};

const isPossibleToMoveLeftHaftToRight = (x) => {
    let index = 0;
    for (let i = 6; i < cells[0].length - 1; i++) {
        if (cells[x][i] === 0) {
            index = i;
            break;
        }
    }
    for (let i = 6; i < cells[0].length - 1; i++) {
        if (cells[x][i] !== 0 && i > index) {
            return false;
        }
    }
    return true;
};

const moveLeftHaftToRight = () => {
    for (let i = 1; i < cells.length - 1; i++) {
        let x = i;
        let count = 0;
        for (let j = 6; j < cells[0].length - 1; j++) {
            if (cells[x][j] === 0) {
                count++;
            }
        }
        if (count !== 0 && count !== 6) {
            while (!isPossibleToMoveLeftHaftToRight(x)) {
                for (let k = 6; k < cells[0].length - 1; k++) {
                    if (cells[x][k] === 0) {
                        let index = check0CellInRowMoveLeftHaftToRight(k, x);
                        if (index !== -1) {
                            swapCellX(k, index, x);
                            break;
                        }
                    }
                }
            }
        }
    }
    reRender();
};

//MOVE RIGHT HAFT TO LEFT
const check0CellInRowMoveRightHaftToLeft = (start, x) => {
    for (let i = start; i > 0; i--) {
        if (cells[x][i] !== 0) {
            return i;
        }
    }
    return -1;
};

const isPossibleToMoveRightHaftToLeft = (x) => {
    let index = 0;
    for (let i = 5; i > 0; i--) {
        if (cells[x][i] === 0) {
            index = i;
            break;
        }
    }
    for (let i = 5; i > 0; i--) {
        if (cells[x][i] !== 0 && i < index) {
            return false;
        }
    }
    return true;
};

const moveRightHaftToLeft = () => {
    for (let i = 1; i < cells.length - 1; i++) {
        let x = i;
        let count = 0;
        for (let j = 1; j < 6; j++) {
            if (cells[x][j] === 0) {
                count++;
            }
        }
        if (count !== 0 && count !== 6) {
            while (!isPossibleToMoveRightHaftToLeft(x)) {
                for (let k = 5; k > 0; k--) {
                    if (cells[x][k] === 0) {
                        let index = check0CellInRowMoveRightHaftToLeft(k, x);
                        if (index !== -1) {
                            swapCellX(k, index, x);
                            break;
                        }
                    }
                }
            }
        }
    }
    reRender();
};

//end game
const endGame = () => {
    let count = 0;
    for (let i = 1; i < cells.length - 1; i++) {
        for (let j = 1; j < cells[i].length - 1; j++) {
            if (cells[i][j] === 0) {
                count++;
            }
        }
    }
    if (count === cellsLength) {
        introFrame.style.display = "none";
        gameFrame.style.display = "none";
        end_frame.style.display = "block";
        content.style.display = "none";
        score_label.style.display = "none";
        timer_bar.style.display = "none";
        labels.style.display = "none";
        score = score + Math.floor(interval_update) * 20;
        end_score.innerHTML = score;
        updateScore();
    }
};

function handleCountdown(seconds, callback) {
    let timer = seconds;
    console.log(`timer ${timer}`);

    function updateDisplay() {
        const minutes = Math.floor(timer / 60);
        document.getElementById("minutes").innerText = minutes;
        const remainingSeconds = timer % 60;

        document.getElementById("seconds").innerText = remainingSeconds;

        if (timer <= 0) {
            clearInterval(interval);
            if (typeof callback === "function") {
                callback();
            }
        }

        timer--;
    }

    updateDisplay();
    const interval = setInterval(updateDisplay, 1000);
}
