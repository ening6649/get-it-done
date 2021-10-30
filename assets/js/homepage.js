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
var getUserRepos = function(user) {
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";
  
    // make a request to the url
    fetch(apiUrl).then(function(response) {
      response.json().then(function(data) {
        console.log(data);
      });
    });
  };

  getUserRepos();