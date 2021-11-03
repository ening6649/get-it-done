
var issueContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");
var repoNameEl = document.querySelector("#repo-name");

var getRepoName= function() {
    // grab repo name from url query string
    var queryString = document.location.search;
    
    var repoName = queryString.split("=")[1];
    if (repoName) {
        // display repo name on the page
     getRepoIssues(repoName);
     repoNameEl.textContent = repoName;
    } else {
        // if no repo was given, redirect to the homepage 
     document.location.replace("./index.html");
    }
    console.log(repoName);
} 


var getRepoIssues = function(repo) {
    console.log(repo);
    // repo encompasses user name and repo name . direction=asc return older issues first
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    fetch(apiUrl).then(function(response) {
        // request was successful
        if (response.ok) {
          response.json().then(function(data) {
            // pass response data to dom function
            displayIssues(data);
            // check if api has paginated issues
            if (response.headers.get("Link")) {
                displayWarning(repo);
            }
          });
        }
        else {
            document.location.replace("./index.html");
        }
    });
};
  
  

var displayIssues = function(issues) {
    // if the repo has no issue , the if statement will fire
    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
      }
    for (var i = 0; i < issues.length; i++) {
        // create a link element to take users to the issue on github
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        // issue objects have an HTML_url property. which links to the full issue on github
        
        issueEl.setAttribute("href", issues[i].html_url);
        // adds target='_blank' attribute to each <a> element, to open the link in a new tab. 
        issueEl.setAttribute("target", "_blank");
        // create span to hold issue title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        // append to container
        issueEl.appendChild(titleEl);

        // create a type element
        var typeEl = document.createElement("span");

        // check if issue is an actual issue or a pull request
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        } else {
            typeEl.textContent = "(Issue)";
        }
        // append to container
        issueEl.appendChild(typeEl);
        // append to html id issue-container
        issueContainerEl.appendChild(issueEl);
    }
};

var displayWarning = function(repo) {
    // add text to warning container
    limitWarningEl.textContent = "To see more than 30 issues, visit ";
    // append a link element with a href attribute that poiunts to issues
    // https://github.com/<repo>/issues
    var linkEl = document.createElement("a");
    linkEl.textContent = "See More Issues on GitHub.com";
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target", "_blank");
  
    // append to warning container
    limitWarningEl.appendChild(linkEl);
};

getRepoName();
// HTTP headers allow the client and the server to pass additional information with an HTTP request or response.
// & to seperate when using multiple parameters