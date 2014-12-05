$(function () {

  $("input#new_todofield").keydown(function (e) {

    if(e.keyCode === 13){

      var text = $(this).val();
      var list_item = $("<li>");
      list_item.html(text).addClass("list_item");
      $("ul.todo_list").append(list_item);

      $("this").val().html("");



    }
  
  });





});