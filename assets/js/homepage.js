// var getUserRepos = function() {
//     console.log("function was called");
//     // fetch gets the data, then returns it 
//     fetch("https://api.github.com/users/octocat/repos").then(function(response) {
//         console.log("inside", response);
//         // if a source return non-json data, then use text()
//         response.json().then(function(data){
//             console.log(data)
//         });
//     });
//     // outside is called before inside . asynchronous behavior. js will implement the code and the fetch. 
//     console.log("outside")
// }
  
// by having user as the parameter, we can use getUserRepos() with different usernames
// i.e. getUserRepos('microsoft')

// fetch ('https://blah')
// .then(function(response){
//     return response.json();
// }) 
// .then(function(whateveryounameit))
// makeHTML(myjson);
// or 
// response.json().then(function(data)) {}

var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");


var getUserRepos = function(user) {
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";
  
    // make a request to the url
    fetch(apiUrl)
     .then(function(response) {
        // if https request status code is in the 200s, response.ok will be true
        if (response.ok) {
        response.json().then(function(data) {
            displayRepos(data, user);
        });
        } else {
            alert("Error: GitHub User Not Found");
        }
    // note the below has no semi colon. chained to the end of .then method
     })
     .catch(function(error) {
         console.log(error);
        // Notice this `.catch()` getting chained onto the end of the `.then()` method
        alert("Unable to connect to GitHub");
     });
  };

 
// search for any user with the following form 
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var formSubmitHandler = function(event) {
    event.preventDefault();
    // get value from input element
    var username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);
        nameInputEl.value = "";
    } else {
        alert("Please enter a GitHub username");
    }
    console.log(event)
  };

  userFormEl.addEventListener("submit", formSubmitHandler);

var displayRepos = function(repos, searchTerm) {
    // check if api returned any repos
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    }
    // clear old content
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;
    // the following block displays repos
    // loop over repos
    for (var i = 0; i < repos.length; i++) {
        // format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;
  
        // create a container for each repo
        var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
  
        // create a span element to hold repository name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;
  
        // append to container
        repoEl.appendChild(titleEl);
  
        // create a status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        // check if current repo has issues or not
        if (repos[i].open_issues_count > 0) {
        statusEl.innerHTML =
            "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
        statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        // append to container
        repoEl.appendChild(statusEl);

        // append container to the dom
        repoContainerEl.appendChild(repoEl);
    }
};  