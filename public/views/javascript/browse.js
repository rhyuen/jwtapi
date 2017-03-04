//GET USER META DATA.
$(document).ready(function(){
  
  $.get("/api/users", function(res){
    res.users.map(function(user){
      $("#main_component .content")
        .append($("<div/>")
        .append($("<a/>", {text: user.name, href: "/user/" + user.name})));
    });
  });
});
