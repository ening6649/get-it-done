
var issueContainerEl = document.querySelector("#issues-container");

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
          });
        }
        else {
          alert("There was a problem with your request!");
        }
    });
};
  
  getRepoIssues("facebook/react");

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