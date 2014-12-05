$(function () {

  var total_counter = 0;
  var completed_counter = 0;


  $("input#new_todofield").keydown(function (e) {

    if(e.keyCode === 13){

      var text = $(this).val();

      if(text !== ''){
      
        var list_item = $("<li>");
        var list_text = $("<span>");
        var checkbox = $("<input type='checkbox'>");
        
        checkbox.addClass("list_checkbox")
        list_item.append(checkbox);
        list_item.addClass("list_item");
        list_text.html(text).addClass("list_text");
        list_item.append(list_text);
      
        $("ul.todo_list").append(list_item);
        total_counter++;
        update_counter(total_counter, completed_counter);

        $(this).val('');
      }
    }
  });


  $("ul.todo_list").on("click", "input[type='checkbox']", function (e) {
    
    if(this.checked){

      $(this).siblings("span").first().addClass("strike");
      completed_counter++;

    } else {//unchecked

      $(this).siblings("span").first().removeClass("strike");
      completed_counter--;
    }

    update_counter(total_counter, completed_counter);

  });


  function update_counter (total, completed) {

    var remaining = total - completed;

    $("span.items_left").html(remaining);
    $("span.items_completed").html(completed);

  }



});