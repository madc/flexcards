//console.log("Width: " + $(window).innerWidth());
//console.log("Boxes: " + "{{cards|length}}");

var attr;

var cards = document.getElementsByClassName("card");
var ids = getCardIDs();

displayCards("hidden");

function getCardIDs() {
	var ids = [];
    for (var i = 0; i < cards.length; i++) {
        if (cards[i].id != "") {
            ids.push(cards[i].id);
        } 
    }
    return ids;
}

function displayCards(attr) {
    for (var i = 0; i < cards.length; i++) {
        if (cards[i].id != "") {
            document.getElementById(cards[i].id).style.visibility = attr;
        }
    }
    return;
}

// get the columns 
function getColumns(cols) {
    switch(true) {
    case cols === 4:
        var tempcols = [[],[],[],[]];
        break;
    case cols === 3:
        var tempcols = [[],[],[]];
        break;
    case cols === 2:
        var tempcols = [[],[]];
        break;
    case cols === 1:
        var tempcols = [[]];
        break;
    default:
        var tempcols = [[]];
    } 
    
    //console.log(JSON.stringify(tempcols));
    
    for (i = 0; i < ids.length; i+=1) {
        if (i % cols === 0) {
            for (j = 0; j < cols; j += 1) {
                if (ids[i+j] !== null) {
                    tempcols[j].push(ids[i+j]);
                }
            }
        }
    }
    
    //console.log(JSON.stringify(tempcols));
    return tempcols;
}

function sortLayout(cols) {
    
    var tempcols = getColumns(cols);
    var chicken, egg;
    
    for (i = 0; i < tempcols.length; i+=1) {
        
        var parent = document.getElementById('column-'+i);
        var child = document.getElementById(''+tempcols[i][0]);
        parent.insertBefore(child, parent.firstChild);

        for (j = 0; j < tempcols[0].length; j+=1) {
            chicken = document.getElementById(''+tempcols[i][j]);
            egg = document.getElementById(''+tempcols[i][j+1]);
            if (egg != null) {
                chicken.appendChild(egg);
            }
        }
    }
}

var resizeTimer, width;
var mobile = tablet = desksmall = deskwide = desklarge = false;

// on (re)load, no timer needed
window.onload = function(e) { 
    breakpointChange();
    displayCards("visible");
}

// on window resize
window.onresize = function(e) { 
    clearTimeout(resizeTimer);
    // delay set to 0 for browser stress
    resizeTimer = setTimeout(breakpointChange(), 1000);
}

function breakpointChange() {
    width = window.innerWidth;

    if (!mobile && width < 577) {
        tablet = desksmall = deskwide = desklarge = false;
        mobile = true;
        sortLayout(1);
    }

    if (!tablet && width > 578 && width < 768) {
        mobile = desksmall = deskwide = desklarge = false;
        tablet = true;
        sortLayout(1);
    }

    if (!desksmall && width >= 769 && width < 992) {
        mobile = tablet = deskwide = desklarge = false;
        desksmall = true;
        sortLayout(2);
    }
    
    if (!deskwide && width >= 992 && width < 1200) {
        mobile = tablet = desksmall = desklarge = false;
        deskwide = true;
        sortLayout(3);
    }
    
    if (!desklarge && width >= 1200) {
        mobile = tablet = desksmall = deskwide = false;
        desklarge = true;
        sortLayout(4);
    }
}
