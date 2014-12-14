$(function () {

  var total_counter = 0;
  var completed_counter = 0;

  //Auto load from the database
  $.get("/items", function (todos) {
    $.each(todos, function (index, value) {
      addTodoItem(value);
    });
  });

  //Add New Item event listener (hit enter)
  $("input#new_todofield").keydown(function (e) {

    var text = $(this).val();

    if(e.keyCode === 13 && text !== ''){//hit enter and field not empty
      var post_data = {
        new_item : {
          title : text,
          completed : false
        }
      }//end of post_data

      $.post('/item', post_data, function (data) {
        //only if post data successfully sent, add it on the front-end
        addTodoItem(data);
      });
      $(this).val('');//reset text field
    }//End of if
  });//End of event listener

  //checkbox event listener
  $("ul.todo_list").on("click", "input[type='checkbox']", function (e) {
    var checkbox = $( e.currentTarget );
    var parent_li = checkbox.closest("li");
    var object_id = parent_li.data("object-id"); 

    if(this.checked){
      $(this).siblings("span").addClass("strike");
      completed_counter++;
    } else {//unchecked
      $(this).siblings("span").removeClass("strike");
      completed_counter--;
    }

    // console.log(this);

    $.ajax('/items/' + /*this.parents("li").data("object-id")*/ object_id + '/' + this.checked,
      {
        type: "PUT",
        success: function (data) {
          console.log('data', data);
        }
      }
    );
    


    update_counter(total_counter, completed_counter);



  });


  function update_counter (total, completed) {

    var remaining = total - completed;

    $("span.items_left").html(remaining);
    $("span.items_completed").html(completed);

  }

  function addTodoItem (li_item) {

    var list_item = $("<li>", {
      class: "list_item",
      "data-object-id": li_item._id
    });

    var checkbox = $("<input type='checkbox'>", {
      class: "list_checkbox",
    });

    var list_text = $("<span>", {
      class: "list_text",
      html: li_item.title
    });

    var delete_button = $("<button>", {
      class: "delete",
      html: "[x]",
      click: function (e) {
        var button = $(e.currentTarget);
        var object_id = button.closest("li").data("object-id");

        $.ajax('/items/' + object_id, 
          {
            type: "DELETE",
            success: function (data) {
              total_counter--;
              if(button.siblings("input").prop('checked') === true){
                completed_counter--;
              }
              button.closest("li").remove();              
              update_counter(total_counter, completed_counter);
            }// Ends success
          }//Ends ajax object 
        )//Ends ajax params
      }
    });//Ends delete button
    
    if(li_item.completed == "true") {
      checkbox.prop('checked', true);
      list_text.addClass("strike");
      completed_counter++;
    }

    list_item.append(checkbox, list_text, delete_button);
    $("ul.todo_list").append(list_item);
    total_counter++;
    update_counter(total_counter, completed_counter);
  }

});