console.log("RESET Javascript file.");

$(document).ready(() => {
  $("form").submit((event) => {
    event.preventDefault();
    let url = window.location.href;
    let token = url.split("=")[1];
    console.log("TOKEN: %s", token);
    $.ajax({
      type: "POST",
      url: "/reset",
      datatype: "json",
      beforeSend: function(xhr){
        xhr.setRequestHeader("x-access-token", token)
      },
      data: {
        password: $("#forgetpassword").val()
      },
      success: function(){
        console.log("Password reset.");
        window.location.replace("/");
      }
    });    
  });
});
