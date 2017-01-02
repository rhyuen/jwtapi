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


  $("#new_item_form").submit(function(event){
    event.preventDefault();
    var new_item_val = $("input[name='newitemname']").val();
    var new_quantity_val = $("input[name='quantity']").val();
    var payload = {newitemname: new_item_val, quantity: new_quantity_val, token: sessionStorage.getItem("token")};
    $.post("/api/items", payload, function(response){
      $("#recently_added .content").append($("<p/>", {text: response.item.itemName  + " " + response.item.quantity + " " + response.item.owner}));
      $("input[name='newitemname']").val("");
      $("input[name='quantity']").val("");
    });
  });

  $("#logout").click(function(){
    localStorage.clear();
    sessionStorage.clear();
  });
});
