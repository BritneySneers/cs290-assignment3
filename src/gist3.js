window.onload = function () {
    var userFavs = localStorage.getItem('favorites');
        var favoriteEntries = JSON.parse(userFavs);
        document.getElementById('HTMLfavorites').innerHTML = '';
        favoriteEntries.forEach(function (gistEntries) {//after reading our assigned eloquent javascript, found foreach discussions online; http://stackoverflow.com/questions/9329446/for-each-over-an-array-in-javascript was jumping-off point
            listGistEntry(gistEntry, 'favorites');
        });
    }
};

function getTheGist() {
    var gistReq = new XMLHttpRequest();//Step 1:  Sending request part i in getting started with AJAX mozilla documentation
    if (!gistReq) {
        throw 'ERROR: Unable to create Request.';
    }
    gistReq.onreadystatechange = function () {//Step 1:  Sending request part ii in Getting Started with AJAX Mozilla documentation
        if (this.readyState === 4) {//is it ready or not?
            var gistsForDisplay = new array ();//empty array to store the gists for display
            var gistList = JSON.parse(this.responseText);//taking in response as text per ajax instructional website
            gistList.forEach(function (gistEntry) {//link it up to the languages in the html by using IDs from the HTML code (from stackoverflow discussion, touched on here http://stackoverflow.com/questions/15864606/forms-and-getelementbyid and in other threads)
                var gistJavascript = document.getElementById('javascript');
                var gistJson = document.getElementById('json');
                var gistSql = document.getElementById('sql');
                var gistPython = document.getElementById('python');
                var gistEntry = gistList[gistEntry];
                for (gistEntry in gistList) {
                    for (var gistSetting in gistEntry) {
                        if (gistSetting == 'language') {
                            if (gistJavascript.checked && gistEntry.language === 'JavaScript') {
                                gistsForDisplay.push(gistEntry);
                            }
                            else if (gistJson.checked && gistEntry.language === 'JSON') {
                                gistsForDisplay.push(gistEntry);
                            }
                            else if (gistSql.checked && gistEntry.language === 'SQL') {
                                gistsForDisplay.push(gistEntry);
                            }
                            else if (gistPython.checked && gistEntry.language === 'Python') {
                                gistsForDisplay.push(gistEntry);
                            }
                            break;
                        }
                    }
                }
                var i;
                var userFavs = JSON.parse(localStorage.getItem('favorites'));
                var f;
                for (f = 0; f <= gistsForDisplay.length; f++) {//iterate along the gists that will be displayed with for loop and use .splice to cut out the unwanted favorite gist
                    for (var val in gistsForDisplay[f]) {
                        if (val === id)
                            gistsForDisplay.splice(f, 1);
                    }
                }
                var f;
                for (f = 0; f <= gistsForDisplay.length; f++) {//iterate after removing the favorites and list out results
                    listGistEntry(gistEntry, 'gist_results');
                }

            });
        }
    };
    var pages = document.getElementById('pages').value;
    for (i = 1; i <= pages; i++) {//Step 1:  sending request part iii in mozilla documentation, sending request for each page depending on number of pages desired
        var addr = 'https://api.github.com/gists?page=' + i;
        gistReq.open('GET', addr);
        gistReq.send();
    }
}

function listGistEntry(gistEntry, htmlLocation) {
    var orderedListEntry = document.createElement('li');
    var entryAddr = document.createElement('a');
    entryAddr.setAttribute('href', gistEntry['addr']);
    entryAddr.appendChild(gistEntry['description']);
    var button = document.createElement('input');
    button.type = 'button';
    if (htmlLocation == 'gist_results') {//option a: button to be used to add gist to favs
        button.value = 'Add to Favorite Gists';
        button.onclick = addFavorite(gistEntry);
    }
    else if (htmlLocation == 'HTMLfavorites') {//option b: button to be used to remove gist from favs and add to general pool
        button.value = 'Remove from Favorites';
        button.onclick = removeFromFavorites(gistEntry);
    }
    else {
        buttonvalue = 'ERROR CREATING BUTTON';
    }
    orderedListEntry.appendChild(entryAddr);
    orderedListEntry.appendChild(button);
    orderedListEntry.setAttribute('id', gistEntry['id']);
    var domLoc;
    domLoc = document.getElementById(htmlLocation);
    domLoc.appendChild(orderedListEntry);
    return orderedListEntry;
}

function addFavorite(gistEntry) {
    var description = gistEntry[''];
    var favoriteGistEntries = JSON.parse(localStorage.getItem('favorites')); //parse local storage into JSON format
    var tmp = { gistEntry['id'], 'https://api.github.com/gists/' + gistEntry['id'], description }; //local storage  via JSON format; adapted from solution and discussion found at http://stackoverflow.com/questions/23728626/localstorage-and-json-stringify-json-parse, particularly the top answer, no time to implement proper syntax
    favoriteGistEntries.push(tmp);
    localStorage.setItem('favorites', JSON.stringify(favoriteGistEntries)); //turn JSON format back into a string and store it in local
    var userFavs = localStorage.getItem('favorites');
    var favoriteGistEntries = JSON.parse(userFavs);
    document.getElementById('HTMLfavorites').innerHTML = '';
    favoriteEntries.forEach(function (gistEntries) {
    listGistEntry(gistEntry, 'favorites');});
    }
}

function removeFromFavorites(id) {
    var gistEntry = document.getElementById(id);
    var favoriteGistEntries = JSON.parse(localStorage.getItem('favorites'));//parse local storage into JSON format
    var lcl;
    for (lcl = 0; lcl < favoriteGistEntries.length; lcl++) {
        for (var value in favoriteGistEntries[lcl]) {
            if (value === id)
                favoriteGistEntries.splice(lcl, 1);
        }
    }
    gistEntry.parentNode.removeChild(gistEntry);
    localStorage.setItem('favorites', JSON.stringify(favoriteGistEntries));
    var userFavs = localStorage.getItem('favorites');
    var favoriteGistEntries = JSON.parse(userFavs);
    document.getElementById('HTMLfavorites').innerHTML = '';
    favoriteEntries.forEach(function (gistEntries) {
    listGistEntry(gistEntry, 'favorites');});
    }
}
