console.log("[%s]: User Registration Page", new Date().toLocaleString());

$(document).ready(function(){
  $("form").submit(function(event){
      var escapedRegName = validator.escape($("form input[name='newusername']").val());
      var password = $("form input[name='newpassword']").val();

      $("form input[name='newusername']").val(escapedRegName);
});
