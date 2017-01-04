$(document).ready(function(){
  console.log("SessionStorage TOKEN VALUE: %s", sessionStorage.getItem("token"));
  console.log("LocalStorage TOKEN VALUE: %s", localStorage.getItem("token"));

  //ONLOAD
  $.get("/api/items", {token: sessionStorage.getItem("token")}, function(init_response){
    init_response.items.map(function(item){
      $("#user_item_collection .content")
        .append($("<p/>", {text: item.itemName + " " + item.quantity}));
    });
  });

  $.get("/api/posts", {token: sessionStorage.getItem("token")}, function(res){
    res.post.map(function(currPost){
      $("#user_post_collection .content")
        .append($("<p/>", {text: currPost.title}))
        .append($("<p/>", {text: currPost.body}))
        .append($("<p/>", {text: currPost.tags}));
    });
  });


  $("#new_item_form").submit(function(event){
    event.preventDefault();
    var new_item_val = $("input[name='newitemname']").val();
    var new_quantity_val = $("input[name='quantity']").val();

    var payload = {
      newitemname: new_item_val,
      quantity: new_quantity_val,
      token: sessionStorage.getItem("token")
    };

    $.post("/api/items", payload, function(response){
      $("#recently_added .content").append($("<p/>", {text: response.item.itemName  + " " + response.item.quantity + " " + response.item.owner}));
      $("input[name='newitemname']").val("");
      $("input[name='quantity']").val("");
    });
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


  $("#logout").click(function(){
    localStorage.clear();
    sessionStorage.clear();
  });
});
