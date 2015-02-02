window.onload = function () {
    var userFavs = localStorage.getItem('favorites');
    if (userFavs !== null) {
        var favoriteGistEntries = new array();
        localStorage.setItem('favorites', JSON.stringify(userFavs));
    }
    else if (userFavs !== null) {
        var favoriteEntries = JSON.parse(userFavs);
        document.getElementById('HTMLfavorites').innerHTML = '';
        favoriteEntries.forEach(function (gistEntries) {
            listGistEntry(gistEntry, 'favorites');
        });
    }
};

function getTheGist() {
    //document.getElementById('gist_results').innerHTML = ' ';

    var gistReq = new XMLHttpRequest();//Step 1:  Sending request part i in getting started with AJAX mozilla documentation
    if (!gistReq) {
        throw 'ERROR: Unable to create HttpRequest.';
    }
    gistReq.onreadystatechange = function () {//Step 1:  Sending request part ii in Getting Started with AJAX Mozilla documentation
        if (this.readyState === 4) {//is it ready or not?
            //localStorage.setItem(JSON.stringify(this.responseText));//if ready, get the data
            var gistsForDisplay = [];//empty array to store the gists for display
            var gistList = JSON.parse(this.responseText);//taking in response as text per ajax instructional website
            gistList.forEach(function (gistEntry) {//link it up to the languages in the html
                var gistJavascript = document.getElementById('javascript');
                var gistJson = document.getElementById('json');
                var gistSql = document.getElementById('sql');
                var gistPython = document.getElementById('python');
                /*if !(gistJavascript.checked || gistJson.checked || gistSql.checked || gistPython.checked){
                    return gistsForDisplay;
                }*/
                var gistEntry = gistList[gistEntry];
                //var gistSetting = gistEntry[gistSetting];
                for (gistEntry in gistList) {
                    for (var gistSetting in gistEntry) {
                        if (gistSetting == 'language') {
                            if (gistJavascript.checked && gistEntry['language'] === 'JavaScript') {
                                gistsForDisplay.push(gistEntry);
                            }
                            else if (gistJson.checked && gistEntry['language'] === 'JSON') {
                                gistsForDisplay.push(gistEntry);
                            }
                            else if (gistSql.checked && gistEntry['language'] === 'SQL') {
                                gistsForDisplay.push(gistEntry);
                            }
                            else if (gistPython.checked && gistEntry['language'] === 'Python') {
                                gistsForDisplay.push(gistEntry);
                            }
                            break;
                        }
                    }
                }
                var i;
                var userFavs = JSON.parse(localStorage.getItem('favorites'));
                var f;
                for (f = 0; f <= gistsForDisplay.length; f++) {//
                    for (var val in gistsForDisplay[f]) {
                        if (val === id)
                            gistsForDisplay.splice(f, 1);
                    }
                }
                var f;
                for (f = 0; f <= gistsForDisplay.length; f++) {//
                    listGistEntry(gistEntry, 'gist_results');
                }
                //return gistsForDisplay;

            });
        }
    };
    var pages = document.getElementById('pages').value;
    if (pages < 0 || pages > 5) {
        alert('ERROR: Invalid Page Number, Must Be Between One and Five');
        return;
    }
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
    var entryText = document.createTextNode(gistEntry['description']);
    if (gistEntry['description'] === '') {
        entryText = 'No description provided.';
    }
    entryAddr.appendChild(entryText);
    var button = document.createElement('input');
    button.type = 'button';
    if (htmlLocation == 'gist_results') {
        button.value = 'Add to Favorite Gists';
        button.onclick = addFavorite("\''+gistEntry['id']+'\'");
    }

    else if (htmlLocation == 'HTMLfavorites') {
        button.value = 'Remove from Favorites';
        button.onclick = removeFromFavorites("\''+gistEntry['id']+'\'");
    }
    else {
        buttonvalue = 'ERROR CREATING BUTTON';
    }
    orderedListEntry.appendChild(entryAddr);
    orderedListEntry.appendChild(button);
    orderedListEntry.setAttribute('id', gistEntry['id']);
    var domLoc;
    domLoc= document.getElementById(htmlLocation);
    domLoc.appendChild(orderedListEntry);
    return orderedListEntry;
}

function addFavorite(id) {
    var gistEntry = document.getElementById(id);
    //var description = gistEntry[''];
    var favoriteGistEntries = JSON.parse(localStorage.getItem('favorites')); //parse local storage into JSON format
    var jsontmp = { 'id': gistEntry['id'], 'addr': 'https://api.github.com/gists/' + gistEntry['id'], 'description': description }; //local storage  via JSON format; adapted from solution and discussion found at http://stackoverflow.com/questions/23728626/localstorage-and-json-stringify-json-parse, particularly the top answer
    favoriteGistEntries.push(tmp);
    localStorage.setItem('favorites', JSON.stringify(favoriteGistEntries)); //turn JSON format back into a string and store it in local
    var userFavs = localStorage.getItem('favorites');
    if (userFavs !== null) {
        var favoriteEntries = new array();
        localStorage.setItem('favorites', JSON.stringify(userFavs));
    }
    else if (userFavs !== null) {
        var favoriteGistEntries = JSON.parse(userFavs);
        document.getElementById('HTMLfavorites').innerHTML = '';
        favoriteEntries.forEach(function (gistEntries) {
            listGistEntry(gistEntry, 'favorites');
        });
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
    if (userFavs !== null) {
        var favoriteEntries = new array();
        localStorage.setItem('favorites', JSON.stringify(userFavs));
    }
    else if (userFavs !== null) {
        var favoriteGistEntries = JSON.parse(userFavs);
        document.getElementById('HTMLfavorites').innerHTML = '';
        favoriteEntries.forEach(function (gistEntries) {
            listGistEntry(gistEntry, 'favorites');
        });
    }
}