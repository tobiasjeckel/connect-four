(function() {
    //keeptrack of current player
    var currentPlayer = "player1";

    function switchPlayers() {
        if (currentPlayer == "player1") {
            currentPlayer = "player2";
        } else {
            currentPlayer = "player1";
        }
    }

    //mouse on effect, i is rows
    $(".column").on("mouseenter", function(e) {
        var slotsInColumn = $(e.currentTarget).find(".slot");
        var currentPlayerHover = currentPlayer + "_hover";

        for (var i = 5; i >= 0; i--) {
            if (
                !slotsInColumn.eq(i).hasClass("player1") &&
                !slotsInColumn.eq(i).hasClass("player2")
            ) {
                slotsInColumn.eq(i).addClass(currentPlayerHover);
                return;
            }
        }
    });
    //mouse off effect
    $(".column").on("mouseleave", function(e) {
        var slotsInColumn = $(e.currentTarget).find(".slot");

        for (var i = 5; i >= 0; i--) {
            if (slotsInColumn.eq(i).hasClass("player1_hover")) {
                slotsInColumn.eq(i).removeClass("player1_hover");
            }
            if (slotsInColumn.eq(i).hasClass("player2_hover")) {
                slotsInColumn.eq(i).removeClass("player2_hover");
            }
        }
    });
    //column selection
    $(".column").on("click", function(e) {
        var slotsInColumn = $(e.currentTarget).find(".slot");

        for (var i = 5; i >= 0; i--) {
            if (
                !slotsInColumn.eq(i).hasClass("player1") &&
                !slotsInColumn.eq(i).hasClass("player2")
            ) {
                slotsInColumn.eq(i).addClass(currentPlayer);
                // var y = i;
                var slotsInRow = $("#board").find(".row" + i);

                //begin remove Hover
                if (slotsInColumn.eq(i).hasClass("player1_hover")) {
                    slotsInColumn.eq(i).removeClass("player1_hover");
                    // console.log("mouseleave");
                }
                if (slotsInColumn.eq(i).hasClass("player2_hover")) {
                    slotsInColumn.eq(i).removeClass("player2_hover");
                    // console.log("mouseleave");
                }
                //end remove Hover
                //add hover to above
                if (currentPlayer == "player1") {
                    slotsInColumn.eq(i - 1).addClass("player2_hover");
                    // console.log("mouseleave");
                } else {
                    slotsInColumn.eq(i - 1).addClass("player1_hover");
                }

                break;
            }
        }

        // find diagonals, i is rows, j is columns
        function checkDiagonalsTLBR() {
            for (var j = 0; j <= 6; j++) {
                for (i = 0; i <= 5; i++) {
                    if (
                        $(".column")
                            .eq(j)
                            .children()
                            .eq(i)
                            .hasClass(currentPlayer)
                    ) {
                        if (
                            $(".column")
                                .eq(j + 1)
                                .children()
                                .eq(i + 1)
                                .hasClass(currentPlayer)
                        ) {
                            if (
                                $(".column")
                                    .eq(j + 2)
                                    .children()
                                    .eq(i + 2)
                                    .hasClass(currentPlayer)
                            ) {
                                if (
                                    $(".column")
                                        .eq(j + 3)
                                        .children()
                                        .eq(i + 3)
                                        .hasClass(currentPlayer)
                                ) {
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
        }

        function checkDiagonalsTRBL() {
            for (var j = 3; j <= 6; j++) {
                for (i = 0; i <= 5; i++) {
                    if (
                        $(".column")
                            .eq(j)
                            .children()
                            .eq(i)
                            .hasClass(currentPlayer)
                    ) {
                        if (
                            $(".column")
                                .eq(j - 1)
                                .children()
                                .eq(i + 1)
                                .hasClass(currentPlayer)
                        ) {
                            if (
                                $(".column")
                                    .eq(j - 2)
                                    .children()
                                    .eq(i + 2)
                                    .hasClass(currentPlayer)
                            ) {
                                if (
                                    $(".column")
                                        .eq(j - 3)
                                        .children()
                                        .eq(i + 3)
                                        .hasClass(currentPlayer)
                                ) {
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
        }
        // find diagonals end

        if (i == -1) {
            //column is full
            return;
        }

        //checkforvictory for horizontal and vertical
        function checkForVictory(slots) {
            var str = "";
            for (var i = 0; i < slots.length; i++) {
                if (slots.eq(i).hasClass(currentPlayer)) {
                    str += "o";
                } else {
                    str += "x";
                }
            }
            return str.indexOf("oooo") + 1;
        }

        //end game function
        function endGame() {
            var snd = new Audio("assets/sneaky.mp3");
            snd.play();
            $("#modal").addClass("on");
            if (currentPlayer == "player1") {
                $("#winner").html(function() {
                    return "<div style='color: yellow;'>Yellow</div>";
                });
            } else if (currentPlayer == "player2") {
                $("#winner").html(function() {
                    return "<div style='color: red;'>Red</div>";
                });
            }
            $("#modal").on("click", function() {
                location.reload();
            });
        }
        //end game if victory
        if (checkForVictory(slotsInColumn)) {
            console.log(currentPlayer + " won vertically");
            endGame();
        } else if (checkForVictory(slotsInRow)) {
            console.log(currentPlayer + " won horizontally");
            endGame();
        } else if (checkDiagonalsTLBR()) {
            console.log(currentPlayer + " won TLBR");
            endGame();
        } else if (checkDiagonalsTRBL()) {
            console.log(currentPlayer + " won TRBL");
            endGame();
        }

        switchPlayers();
        console.log(currentPlayer + " has the turn");
    });
})();
