

window.onload = function() {
	populateFavorites();
};

function populateFavorites(){
	var userFavs = localStorage.getItem('favorites');
	if (userFavs !== NULL){
		var listing = JSON.parse(localStorage.getItem('userFavs');
	}
}

function getTheGist(){
document.getElementById('gist_results').innerHTML=' ';
var pages = document.getElementByID('pages').value;
if (pages<0 || pages >5){ 
	alert('ERROR: Invalid Page Number, Must Be Between One and Five');
	return;
}

var gist_req = new XMLHttpRequest();
if (!gist_req){
throw 'ERROR: Unnable to create HttpRequest.';
}
var i;

	
request.onreadystatechange = function()){
	if(this.readyState == 4){//is it ready or not?
		localStorage.setItem( JSON.stringify(this.responseText))//TODO:Local store
		var gist_list = JSON.parse(this.responseText);//taking in response as text per ajax instructional website
		gist_list.forEach(function(gist)){
			//link it up to the languages in the html
			var gists_for_display = [];
			var gist_javascript = document.getElementById('javascript');
			var gist_json = document.getElementById('json');
			var gist_sql = document.getElementById('sql');
			var gist_python = document.getElementById('python');
			if !(gist_javascript.checked || gist_json.checked || gist_sql.checked || gist_python.checked){
			
			}
		}
	}
}
for (i=1;i<=pages;i++){
	var addr = 'https://api.github.com/gists?page=' + i;
	gist_req.open('GET',addr);
	gist_req.send();
	}
	}