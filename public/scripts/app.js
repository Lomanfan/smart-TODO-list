//buttons to sort todo-list by category type after DOM is ready
$(() => {
  console.log("hiiiiiiiii")
  $(".sortCategory").on('click',function(){
    let sortCate = $(this).text().toLocaleLowerCase();
    if (sortCate ==='all') {
      $(".everyTodo").css( "display", "block" );
    } else {
      //eat
    sortCate = sortCate.split(' ')[1];
    $(".everyTodo").hide();
    console.log(sortCate)
    console.log($(".everyTodo").filter(`.${sortCate}`))
    $(".everyTodo").filter(`.${sortCate}`).css( "display", "block" );
    }
  });

});


