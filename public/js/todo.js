$(function () {

  $("input#new_todofield").keydown(function (e) {

    if(e.keyCode === 13){

      var text = $(this).val();

      if(text !== ''){
      
        var list_item = $("<li>");
        var list_text = $("<span>");
      
        list_item.addClass("list_item");
        list_text.html(text).addClass("list_text");
        list_item.append(list_text);
      
        $("ul.todo_list").append(list_item);
      
        var checkbox = $("<input type='checkbox'>");
        checkbox.addClass("list_checkbox")

        list_item.prepend("<input type='checkbox'>");
      
        $(this).val('');
      }
    }
  });


  $("ul.todo_list").on("click", "input[type='checkbox']", function (e) {
    
    if(this.checked){

      $(this).siblings("span").first().addClass("strike");

    } else {//unchecked

      console.log("yes");
      $(this).siblings("span").first().removeClass("strike");

    }

  });






});