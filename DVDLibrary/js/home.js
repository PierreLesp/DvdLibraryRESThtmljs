$('document').ready(function() {

    $('#createButton').click(function (event) {

        $('#addForm').show();
        $('#dvdList').hide();
    });


    addDVD();
    updateDVD();
});

function updateDVD(DVDId) {
    $('#updateButton').click(function(event) {
        /*var haveValidationErrors = checkAndDisplayValidationErrors($('#editForm').find('input'));
        
        if(haveValidationErrors) {
            return false;
        }*/
        $.ajax({
            type: 'PUT',
            url: 'http://DVDlist.us-east-1.elasticbeanstalk.com/dvd/' + $('#editDVDId').val(),
            data: JSON.stringify({
                Id: $('#editDVDId').val(),
                title: $('#editTitle').val(),
                releaseYear: $('#editReleaseYear').val(),
                director: $('#editDirector').val(),
                rating: $('#editRating').val(),
                notes: $('#editNotes').val()
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'dataType': 'json',
            'success': function() {
                /*$('#errorMessage').empty();
                hideEditForm();
                loadDVDs();*/
            },
            'error': function() {
                /*$('#errorMessages')
                .append($('<li>')
                .attr({class: 'list-group-item list-group-item-danger'})
                .text('Error calling web service. Please try again later.'));*/
            }
        })
    })
}

function showEditForm(DVDId) {
    //$('#errorMessages').empty();
    
    $.ajax({
        type: 'GET',
        url: 'http://DVDlist.us-east-1.elasticbeanstalk.com/dvd/' + DVDId,
        success: function(data, status) {
            $('#editTitle').val('');
            $('#editReleaseYear').val('');
            $('#editDirector').val('');
            $('#editRating').val('');
            $('#editNotes').val('');
            
            $('#editTitle').val(data.title);
            $('#editReleaseYear').val(data.releaseYear);
            $('#editDirector').val(data.director);
            $('#editRating').val(data.rating);
            $('#editNotes').val(data.notes);
            
        },
        error: function() {
            $('#errorMessages')
            .append($('<li>')
            .attr({class: 'list-group-item list-group-item-danger'})
            .text('Error calling web service. Please try again later.')); 
        }
    })
    
    $('#contactTableDiv').hide();
    $('#editFormDiv').show();
}

function hideEditForm() {
    //$('#errorMessages').empty();
    
    $('#editTitle').val('');
    $('#editReleaseYear').val('');
    $('#editDirector').val('');
    $('#editRating').val('');
    $('#editNotes').val('');

    //$('#DVDTableDiv').show();
    $('#editFormDiv').hide();
}




function addDVD() {
    $('#addButton').click(function (event) {
        
        var haveValidationErrors = checkAndDisplayValidationErrors($('#addForm').find('input'));
        
        if(haveValidationErrors) {
            return false;
        }



        $.ajax({
           type: 'POST',
           url: 'http://dvd-library.us-east-1.elasticbeanstalk.com/dvd',
           data: JSON.stringify({
                title: $('#addTitle').val(),
                releaseYear: $('#addReleaseYear').val(),
                director: $('#addDirector').val(),
                rating: $('#addRating').val(),
                notes: $('#addNotes').val()
           }),
           headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
           },
           'dataType': 'json',
           success: function() {
               // $('#errorMessages').empty();
               $('#addTitle').val('');
               $('#addReleaseYear').val('');
               $('#addDirector').val('');
               $('#addRating').val('G');
               $('#addNotes').val('');
               

               $('#addForm').hide();
               $('#dvdList').show();

           },
           error: function () {
               /*$('#errorMessages')
                .append($('<li>')
                .attr({class: 'list-group-item list-group-item-danger'})
                .text('Error calling web service. Please try again later.')); 
                */
           }
        })
    });
}
