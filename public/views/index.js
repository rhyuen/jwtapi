$(document).ready(function(){
  console.log("SessionStorage TOKEN VALUE: %s", sessionStorage.getItem("token"));
  console.log("LocalStorage TOKEN VALUE: %s", localStorage.getItem("token"));

  //console.log(document.referrer);
  if(document.referrer.includes("setup")){
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
    $.post("/api/authenticate", {name: formName.val(), password: formPassword.val()}, function(data){
      localStorage.setItem("token", data.token);
      sessionStorage.setItem("token", data.token);

        $(location).attr("href", "/api/user?token=" + localStorage.getItem("token"));

      //WEBSTOREAGE Token to LocalStorage or SessionStorage
      //XSS VULN
      //Authorization: Bearer + data.token;
      //document.cookie = data.token; //there's other stuff in the cookie as well.
    });
  });
});
