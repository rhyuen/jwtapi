
$(document).ready(function(){

  if(document.referrer.includes("register")){
    $("#redirect_message").css({visibility: "visible"});
  }else{
    $("#redirect_message").css({visibility: "hidden"});
  }

  var formName = $("input[name='name']");
  var formPassword = $("input[name='password']");
  formName.css({"background-color": "pink"});
  formPassword.css({"background-color": "orange"});

  $("form").submit(function(e){
    e.preventDefault();

    var cleanFormName = validator.escape(formName.val());

    $.post("/api/authenticate", {name: cleanFormName, password: formPassword.val()}, function(data){
      $(location).attr("href", "/api/user");
    });
  });
});
