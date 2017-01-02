$(document).ready(function(){
  console.log("SessionStorage TOKEN VALUE: %s", sessionStorage.getItem("token"));
  console.log("LocalStorage TOKEN VALUE: %s", localStorage.getItem("token"));

  var formName = $("input[name='name']");
  var formPassword = $("input[name='password']");
  formName.css({"background-color": "pink"});
  formPassword.css({"background-color": "orange"});

  $("form").submit(function(e){
    e.preventDefault();
    $.post("/api/authenticate", {name: formName.val(), password: formPassword.val()}, function(data){
      localStorage.setItem("token", data.token);
      sessionStorage.setItem("token", data.token);
      $("#response .content")
        .append($("<p/>", {text: "Token from SessionStorage: " + sessionStorage.getItem("token")}));
      $("#response .content")
        .append($("<p/>", {text: "Token from LocalStorage: " + localStorage.getItem("token")}));


        $(location).attr("href", "/api/user?token=" + localStorage.getItem("token"));


      //WEBSTOREAGE Token to LocalStorage or SessionStorage
      //XSS VULN
      //Authorization: Bearer + data.token;
      //document.cookie = data.token; //there's other stuff in the cookie as well.
    });
  });
});

$("#itemslink").click(function(event){
  event.preventDefault();
  $.get("/api/items", {"token": localStorage.getItem("token")}, function(data){
    console.log(data);
    data.items.map(function(item){
      $("#response .content")
        .append($("<p/>", {text: item.itemName}));
    });
  });
});
