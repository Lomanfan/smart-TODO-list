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

});
