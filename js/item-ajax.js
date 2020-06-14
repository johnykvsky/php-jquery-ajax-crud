
$( document ).ready(function() {
    var page = 1;
    var current_page = 1;
    var total_page = 0;
    var is_ajax_fire = 0;

    manageData();

    /* manage data list */
    function manageData() {
        $.ajax({
            dataType: 'json',
            url: url+'api/list.php',
            data: {page:page}
        }).done(function(response){
            total_page = Math.ceil(response.total/10);
            current_page = page;

            $('#pagination').twbsPagination({
                totalPages: total_page,
                visiblePages: 5,
                onPageClick: function (event, pageL) {
                    page = pageL;
                    if(is_ajax_fire != 0){
                      getPageData();
                    }
                }
            });

            manageRow(response.data);
            is_ajax_fire = 1;
        });
    }

    /* Get Page Data*/
    function getPageData() {
        $.ajax({
            dataType: 'json',
            url: url+'api/list.php',
            data: {page:page}
        }).done(function(response){
            manageRow(response.data);
        });
    }

    /* Add new Item table row */
    function manageRow(data) {
        var    rows = '';
        $.each( data, function( key, value ) {
            rows = rows + '<tr>';
            rows = rows + '<td>'+value.title+'</td>';
            rows = rows + '<td>'+value.description+'</td>';
            rows = rows + '<td data-id="'+value.id+'">';
            rows = rows + '<button data-toggle="modal" id="edit_'+value.id+'" data-target="#edit-item" class="btn btn-primary edit-item">Edit</button> ';
            rows = rows + '<button class="btn btn-danger remove-item">Delete</button>';
            rows = rows + '</td>';
            rows = rows + '</tr>';
        });
        $("tbody").html(rows);
    }

    /* Create new Item */
    $(".crud-submit").click(function(e){
        e.preventDefault();
        var form_action = $("#create-item").find("form").attr("action");
        var title = $("#create-item").find("input[name='title']").val();
        var description = $("#create-item").find("input[name='description']").val();


        if(title != '' && description != ''){
            $.ajax({
                dataType: 'json',
                type:'POST',
                //url: url,// + form_action,
                url: url + form_action,
                data:{
                    title:title,
                    description:description
                }
            }).done(function(data){
                $("#create-item").find("input[name='title']").val('');
                $("#create-item").find("input[name='description']").val('');

                getPageData();
                $(".modal").modal('hide');
                toastr.success('Item Created Successfully.', 'Success Alert', {timeOut: 5000});
            });
        }else{
            alert('You are missing title or description.')
        }
    });

    /* Remove Item */
    $("body").on("click",".remove-item",function(){
        var id = $(this).parent("td").data('id');
        var c_obj = $(this).parents("tr");

        $.ajax({
            dataType: 'json',
            type:'DELETE',
            url: url + 'api/delete.php',
            data:{id:id}
        }).done(function(response){
            c_obj.remove();
            toastr.success('Item Deleted Successfully.', 'Success Alert', {timeOut: 5000});
            getPageData();
        });
    });

    /* Edit Item */
    $("body").on("click",".edit-item",function(){
            var id = $(this).attr("id").replace("edit_", "");
            //cast to integer
            $.ajax({
                dataType: 'json',
                type:'GET',
                url: url + 'api/edit.php?id='+id,
                //data:{}
            }).done(function(response){
                $("#edit-item").find("input[name='title']").val(response.title);
                $("#edit-item").find("input[name='description']").val(response.description);
                $("#edit-item").find(".edit-id").val(response.id);
            });
    });

    /* Updated new Item */
    $(".crud-submit-edit").click(function(e){
        e.preventDefault();
        var form_action = $("#edit-item").find("form").attr("action");
        var id = $("#edit-item").find(".edit-id").val();
        var title = $("#edit-item").find("input[name='title']").val();
        var description = $("#edit-item").find("input[name='description']").val();


        if(id != ''){
            $.ajax({
                dataType: 'json',
                type:'PATCH',
                url: url + form_action,
                data:{
                    title:title,
                    description:description
                }
            }).done(function(data){
                getPageData();
                $(".modal").modal('hide');
                toastr.success('Item Updated Successfully.', 'Success Alert', {timeOut: 5000});
            });
        }else{
            alert('You are missing title or description.')
        }
    });
});