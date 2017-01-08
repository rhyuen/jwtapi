//GET USER META DATA.
$(document).ready(function(){

  console.log("Load User Data");

  $.get("/api/users", function(res){
    res.users.map(function(user){
      console.log(user.name);
      $("#main_component .content")
        .append($("<div/>")
        .append($("<a/>", {text: user.name, href: "/user/" + user.name})));
    });
  });
});
