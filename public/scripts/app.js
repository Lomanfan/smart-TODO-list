//buttons to sort todo-list by category type after DOM is ready
$(() => {
  $(".sortCategory").on('click',function(){
    let sortCate = $(this).text().toLocaleLowerCase();
    if (sortCate ==='all') {
      $(".everyTodo").css( "display", "block" );
    } else {
    sortCate = sortCate.split(' ')[1];
    $(".everyTodo").hide();
    $(".everyTodo").filter(`.${sortCate}`).css( "display", "block" );
    }
  });

  $(".addNewTodo").submit(function (event) {
    event.preventDefault();
    let textContent = $("#todolist").val();
    console.log(textContent.length)
     if (textContent.length === 0) {
      $('#error-message-empty').slideDown();
      return;
    }
    //send data to server with ajax  and send a get request after
    $('#error-message-empty').hide();
    const formData = $(this).serialize();
    $.ajax({
      url: '/users/1/new',
      data: formData,
      type: 'POST'
    })
    .done(function() {
      window.location='/';
    })
  })
});


