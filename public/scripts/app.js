//buttons to sort todo-list by category type after DOM is ready

//buttons to sort todo-list by category type after DOM is ready
$(() => {
  // console.log("hiiiiiiiii")
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

  $(".new-tweet-form").submit(function (event) {
    event.preventDefault();
    let textContent = $("#tweet-text").val();
    if (textContent.length > 140) {
      $('#error-message-over').slideDown();
      return;
    } else if (textContent.length === 0) {
      $('#error-message-empty').slideDown();
      return;
    }
    //send data to server with ajax  and send a get request after
    const formData = $(this).serialize();
    $.ajax({
      url: '/tweets',
      data: formData,
      type: 'POST'
    })
    .then(loadTweets)
    .then(() => {
      $("#tweet-text").val('');
      $('.counter').html(140);
    })
  })
});
