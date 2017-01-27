$(document).ready(function(){
  console.log("SessionStorage TOKEN VALUE: %s", sessionStorage.getItem("token"));
  console.log("LocalStorage TOKEN VALUE: %s", localStorage.getItem("token"));

  //ONLOAD
  $.get("/api/posts", {token: sessionStorage.getItem("token")}, function(res){
    res.post.map(function(currPost){
      $("#user_post_collection .content")
        .append($("<p/>", {text: currPost.title}))
        .append($("<p/>", {text: currPost.body}))
        .append($("<p/>", {text: currPost.tags}));
    });
  });

  // $("a").click(function(event){    
  //
  //   $(location).attr("href", $(this).href() + "/?token=" + localStorage.getItem("token"));
  // });

  $("#new_post_form").submit(function(event){
    event.preventDefault();
    var new_title_val = $("input[name='formTitle']").val();
    var new_postcontent_val = $("input[name='formPost']").val();
    var new_tags_val = $("input[name='formTags']").val();

    var post_payload = {
      form_title: new_title_val,
      form_post: new_postcontent_val,
      form_tags: new_tags_val,
      token: sessionStorage.getItem("token")
    };

    $.post("/api/posts", post_payload, function(response){
      //Append on success.
      $("input[name='formTitle']").val("");
      $("input[name='formPost']").val("");
      $("input[name='formTags']").val("");
    });
  });


  $("#logout").click(function(){
    localStorage.clear();
    sessionStorage.clear();
  });
});
