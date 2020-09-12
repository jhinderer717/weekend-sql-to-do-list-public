$(document).ready(function(){
    console.log('jQ');
    getTasks();

}) // end doc ready

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
            </tr>`);
        } // end for loop
    }).catch(function (err) {
        alert('error!');
        console.log(err);
    }); // end ajax
} // end getTasks