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

  $(".checkbox").each(function(){
  $("input:checkbox").on('change',function(event){
    let todoId = event.target.id;
    console.log(todoId);
    if($(".checkbox").prop("checked")) {
      $(".checkbox").prop("checked", false);
      $(".todoText").css("display","none")
    } else{

      $(".checkbox").prop("checked", true);
      $(".todoText").css("display","block")
    }
  })
  })
});
