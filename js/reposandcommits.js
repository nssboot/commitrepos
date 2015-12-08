$(document).ready(function(){

  $(".list-group-item").on("click",function(e){
    e.preventDefault();

    //To get the commits list and details

    $.ajax({
      type: "GET",
      url: $(this).attr("href"),
      success: function(commits){
        $("tbody").empty();

        for(var i = 0; i < commits.length; i++){

          $("tbody").append(buildTableRow(commits[i]));
        }
      },
      
      debugger

      /*

      $.ajax({
      type: "GET",
      url: $(this).attr("href"),
      success: gitCommitApiSuccessHandler

      function gitCommitApiSuccessHandler (commits){
        $("tbody").empty();
        for(var i = 0; i < commits.length; i++){
        $("tbody").append(buildTableRow(commits[i]));
        }
      },

      */
      error: function(jqXHR, textStatus, errorThrown){
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
      }
    });

    function buildTableRow (commitsRecords) {
      var shaTd = $("<td>").append(commitData.sha);
      var authorTd = $("<td>").append(commitData.author.login);
      var dateTd = $("<td>").append(commitData.commit.author.date);
      var messageTd = $("<td>").append(commitData.commit.message);

      //console.log (commitSha+"author"+commitAuthor+"Date"+commitDate+"Message"+commitMessage);
    
        return $("<tr>").append(shaTd)
        .append(authorTd)
        .append(messageTd)
        .append(dateTd);

    }

  }); //When repo link is clicked

  //To get the github repos list and details

  $.ajax({
    type: "GET",
    url: "https://api.github.com/users/nssboot/repos",
    success: function(repos){
      for(var i = 0; i < repos.length; i++){
        var newRepoUrl = buildRepoUrl(repos[i])
        $(".list-group").append(newRepoUrl);
      }
    },

  /*
  $.ajax({
    type: "GET",
    url: "https://api.github.com/users/nssboot/repos",
    success: githubSuccessApiHandler 
  }); //End Github Ajax Query to pull Repos

  function githubSuccessApiHandler (repoList) {

    for(i=0; i <repoList.length ; i++){
        var newRepo = buildRepoList(repoList[i]);
        $(".list-group").append(newRepo); //Add the repo link to the DOM 
        //console.log(repoList[i]); // Creates Repolist in the console
      }  
  }
  */

  function buildRepoUrl (repoData) {

    var commitsApiUrl = "https://api.github.com/repos/";
    commitsApiUrl += repoData.owner.login + "/";
    commitsApiUrl += repoData.name + "/commits";

    //console.log(commitsApiUrl);

    var newLink = $("<a>")
              .attr("href",commitsApiUrl)
              .addClass("list-group-item")
              .append(repoData.full_name);
    return newLink;
  }

});
