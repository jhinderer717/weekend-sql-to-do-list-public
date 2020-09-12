$(document).ready(function(){
    console.log('jQ');
    getTasks();
    $('.addButton').on('click', checkDesc);
    $(document).on('click', '.delete', deleteTask);
    $(document).on('click', '.complete', completeTask);
}) // end doc ready

function checkDesc(){
    if( $('#taskIn').val() === '' ){
        console.log('Enter a task');
    }else{
        postTask();
    }
}

function getTasks(){
    console.log('in getTasks');
    // ajax call
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then(function(response){
        console.log('back from GET with:', response);
        let el = $('.viewTasks');
        el.empty();
        for(let i=0; i<response.length; i++){
            el.append(`<tr>
                <td>${response[i].description}</td>
                <td>${response[i].completed}</td>
                <td><button class="delete" data-id="${response[i].id}">Remove</button></td>
                <td><button class="complete" data-id="${response[i].id}">Complete</button></td>
            </tr>`);
        } // end for loop
    }).catch(function (err) {
        alert('error!');
        console.log(err);
    }); // end ajax
} // end getTasks

function postTask(){
    console.log('in postTask');
    let taskSent = {
        description: $('#taskIn').val(),
        completed: $('input[name=isComplete]').is(":checked")
    }; // end object sent
    console.log('taskSent:', taskSent);
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: taskSent
    }).then(function(response){
        console.log('back from POST with:', response);
        getTasks();
        clearFields();
    }).catch(function(err){
        alert('error!');
        console.log(err);
    }); // end ajax POST
} // end postTask

function deleteTask(){
    let taskId = $(this).data('id');
    console.log('in deleteTask, deleting', taskId);

    $.ajax({
        method: 'DELETE',
        url: `/tasks/${taskId}`
    }).then(function(response){
        console.log('deleted,', response);
        // refresh page
        getTasks();
    }).catch(function(err){
        console.log('error in delete', error);
        alert("Houston we have a problem");
    }); // end ajax DELETE
} // end deleteTask

function completeTask(){
    let taskId = $(this).data('id');
    console.log('mark complete', taskId);
    $.ajax({
        method: 'PUT',
        url: `/tasks/${taskId}`
    }).then(function(response){
        console.log('response from server', response);
        getTasks();
    }).catch(function(err){
        console.log('error', err);
        alert('mama mia');
    }); // end ajax PUT
} // end completeTask

function clearFields(){
    $('#taskIn').val('');
    $('#completeBox').prop("checked", false);
} // end clearFields