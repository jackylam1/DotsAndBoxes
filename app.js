// declaring all the important variables
var boxes = []; // this array will be our matrix
var turn = "p1"; // starting our game from player1

// default score of all the players
var player1 = 0;
var player2 = 0;
var player3 = 0;

function loadBoard() {
  boxes = [];
  turn = "p1"; // player 1 will have the first turn
  player1 = 0;
  player2 = 0;
  player3 = 0;
  var m = 3; // no of columns of matrix
  var n = 3; // no of rows of matrix
  var offset = 50; // spacing between columns and rows

  // creating the board of the perfect dimensions
  var sx = (sx = window.innerWidth / 2 - (m * offset) / 2),
    sy = offset * 2.5;

  // this html variable will store our dom elements
  var html = "";

  // rendering this html variable in the DOM
  $("#app").html(html);

  var c = 0;

  // now iterating over columns and rows to actually render the matrix
  for (var j = 0; j < m; j++) {
    for (var i = 0; i < n; i++) {
      var x = sx + i * offset,
        y = sy + j * offset;

      html += `
				<div class="box" data-id="${c}" style="z-index:${i - 1}; left:${
        x + 2.5
      }px; top:${y + 2.5}px;"></div>
				<div class="dot" style="z-index:${i}; left:${x - 5}px; top:${
        y - 5
      }px;" data-box="${c}"></div>						
				<div class="line lineh" data-line-1="${c}" data-line-2="${
        c - m
      }" style="z-index:${i}; left:${x}px; top:${y}px;" data-active="false"></div>
				<div class="line linev" data-line-1="${c}" data-line-2="${
        c - 1
      }" style="z-index:${i}; left:${x}px; top:${y}px;" data-active="false"></div>
				`;
      boxes.push(0);
      c++;
    }
  }

  //right boxes
  for (var i = 0; i < n; i++) {
    var x = sx + m * offset,
      y = sy + i * offset;
    html += `				
				<div class="dot" style="z-index:${i}; left:${x - 5}px; top:${
      y - 5
    }px;" data-box="${c}"></div>
				<div class="line linev" data-line-1="${
          m * (i + 1) - 1
        }" data-line-2="${-1}" style="z-index:${i}; left:${x}px; top:${y}px;" data-active="false"></div>
				`;
  }

  //bottom boxes
  for (var i = 0; i < m; i++) {
    var x = sx + i * offset,
      y = sy + n * offset;
    html += `				
				<div class="dot" style="z-index:${i}; left:${x - 5}px; top:${
      y - 5
    }px;" data-box="${c}"></div>
				<div class="line lineh" data-line-1="${
          (n - 1) * m + i
        }" data-line-2="${-1}" style="z-index:${i}; left:${x}px; top:${y}px;" data-active="false"></div>
				`;
  }

  //right-bottom most dot
  html += `<div class="dot" style="z-index:${i}; left:${
    sx + m * offset - 5
  }px; top:${sy + n * offset - 5}px;" data-active="false"></div>`;

  //append to dom
  $("#app").html(html);

  applyEvents(); // calling click event handler
}

function applyEvents() {
  $("div.line")
    .unbind("click")
    .bind("click", function () {
      // getting the line property on which user has clicked
      var id1 = parseInt($(this).attr("data-line-1"));
      var id2 = parseInt($(this).attr("data-line-2"));

      console.log(id1);

      // now using checkValid function to check if the that selected line is already active or not
      if (checkValid(this) && turn == "p1") {
        var a = false,
          b = false;

        if (id1 >= 0) var a = addValue(id1);
        if (id2 >= 0) var b = addValue(id2);

        // if the line is not active then making it active by adding the line-active class and setting the attribute to true
        $(this).addClass("line-active");
        $(this).attr("data-active", "true");

        // now checking if the line which user has clicked is the fourth line of the box or not. If it is then giving user another turn else giving turn to next user
        if (a === false && b === false) {
          turn = "p2";
        }
      } else if (checkValid(this) && turn == "p2") {
        var a = false,
          b = false;

        if (id1 >= 0) var a = addValue(id1);
        if (id2 >= 0) var b = addValue(id2);
        $(this).addClass("line-active");
        $(this).attr("data-active", "true");

        if (a === false && b === false) {
          turn = "p3";
        }
      } else {
        var a = false,
          b = false;

        if (id1 >= 0) var a = addValue(id1);
        if (id2 >= 0) var b = addValue(id2);
        $(this).addClass("line-active");
        $(this).attr("data-active", "true");

        if (a === false && b === false) {
          turn = "p1";
        }
      }

      // here we are showing which user has current turn by updating the DOM
      document.querySelector(".player-turn").innerHTML =
        turn === "p1"
          ? "Player 1's turn"
          : turn === "p2"
          ? "Player 2's turn"
          : "Player 3's turn";
    });
}

// this function is for filling the box with color
function acquire(id) {
  var color;

  // if the last turn was of player 1 then change the color of box of player 1 and update the score
  if (turn == "p1") {
    color = "salmon";
    player1++;

    // if the last turn was of player 2 then change the color of box of player 2 and update the score
  } else if (turn == "p2") {
    color = "skyblue";
    player2++;

    // if the last turn was of player 3 then change the color of box of player 3 and update the score
  } else {
    color = "magenta";
    player3++;
  }

  // updating the array value to full of that particular id
  $("div.box[data-id='" + id + "']").css("background-color", color);

  boxes[id] = "full";

  // showing the score of each player
  $(".player2").text("Player 1 : " + player1);
  $(".player1").text("Player 2 : " + player2);
  $(".player3").text("Player 3 : " + player3);


  // some of the values in boxes array are NaN, so just replacing them with 'full'
  for (let i = 0; i < boxes.length; i++) {
    if (isNaN(boxes[i])) {
      boxes[i] = "full";
    }
  }

  // after this, if every element is 'full', then it means we have filled all the boxes and its time to show result.
  var full = true;
  for (var i = boxes.length - 1; i >= 0; i--) {
    if (boxes[i] != "full") {
      full = false;
      break;
    }
  }

  // here we are comparing the scores and showing who is the winner
  if (full) {
    alert(
      (player1 > player2
        ? "Player 1"
        : player2 > player3
        ? "Player 2"
        : "Player 3") + " won"
    );
  }

}

// adding the value of each id in the boxes array
function addValue(id) {
  boxes[id]++;

  if (boxes[id] === 4) {
    acquire(id);
    return true;
  }
  return false;
}

// this function checks if the selected line is already active or not
function checkValid(t) {
  return $(t).attr("data-active") === "false";
}

// restarting the game by reloading the page
function restart() {
  window.location.reload();
}

// now loading the game board to play the game.
loadBoard();
