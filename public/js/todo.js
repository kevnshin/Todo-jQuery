$(function () {

  //Auto load the save file
  $.get("/todo_save.txt", function (data) {
    var list_items = jQuery.parseJSON(data);

    $.each(list_items, function (index, value) {
      addListItem(value.title, value.completed);
    });
  });

  var total_counter = 0;
  var completed_counter = 0;


  $("input#new_todofield").keydown(function (e) {

    if(e.keyCode === 13){

      var text = $(this).val();
      if(text !== ''){
        addListItem(text, false);
        $(this).val('');
      }
    }
  });


  $("ul.todo_list").on("click", "input[type='checkbox']", function (e) {
    
    if(this.checked){
      $(this).siblings("span").addClass("strike");
      completed_counter++;
    } else {//unchecked
      $(this).siblings("span").removeClass("strike");
      completed_counter--;
    }
    update_counter(total_counter, completed_counter);
  });


  $("button#save").click(function (e) {

    var list = [];

    $(".list_item").each( function (i, obj) {
      list.push({
        index: i,
        title: $(obj).find("span.list_text").html(),
        completed: $(obj).find("input:checked").length>0 
      });
    });

    var data = {  
      list_to_save: JSON.stringify(list)
    }

    $.post("http://localhost:3000/save", data);    

  });


  function update_counter (total, completed) {

    var remaining = total - completed;

    $("span.items_left").html(remaining);
    $("span.items_completed").html(completed);

  }

  function addListItem (txt, completedState) {

    var list_item = $("<li>", {
      class: "list_item"
    });

    var list_text = $("<span>", {
      class: "list_text",
      html: txt
    });

    var checkbox = $("<input type='checkbox'>", {
      class: "list_checkbox"
    });
    
    if(completedState) {
      checkbox.prop('checked', true);
    }

    list_item.append(checkbox);
    list_item.append(list_text);
    $("ul.todo_list").append(list_item);
    total_counter++;
    update_counter(total_counter, completed_counter);
  }

});