$(document).ready(function(){

  //ONLOAD
  $.get("/api/posts", {token: sessionStorage.getItem("token")}, function(res){
    res.post.map(function(currPost){
      $("#user_post_collection .content")
        .append($("<p/>", {text: currPost.title}))
        .append($("<p/>", {text: currPost.body}))
        .append($("<p/>", {text: currPost.tags}));
    });
  });

  //you CANNOT SET a header field with a REGULAR LINK
  //ONE SUGGESTION: USE EXPRESS MIDDLE WARE.
  $("#edit-button").click(function(event){
    event.preventDefault();
    $(location).attr("href", $("#edit-button").attr("href"));
  });

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
      $("input[name='formTitle']").val("");
      $("input[name='formPost']").val("");
      $("input[name='formTags']").val("");
    });
  });
});
