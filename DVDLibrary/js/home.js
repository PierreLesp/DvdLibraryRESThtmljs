$('document').ready(function() {

    console.log('Hellow World');

    displayDvds();

    $('#createButton').click(function (event) {

        $('#addFormDiv').show();
        $('#dvdList').hide();
    });

    $('#getBackButton').click(function (event) {

        $('#displayDvdInfos').hide();
        $('#dvdList').show();
    });


    $('#searchButton').click(function(event) {
        console.log("searching");
        var selection = $('#searchCategory').val();
        displayDvds(selection);
    });

    $('#deleteConfirmationModal').on('show.bs.modal', function(e) {

        
    });
    


    addDVD();
    updateDVD();
});

function displayDvds(searchCategory) {
  var category;
  var contentRows = $("#contentRows");
  if (searchCategory == null) {
      category = "";
  } else if(searchCategory === "title") {
      category = "/title";
  } else if(searchCategory === "releaseyear") {
      category = "/year";
  } else if(searchCategory === "director") {
      category = "/director";
  } else if(searchCategory === "rating") {
      category = "/rating";
  }
    var contentRows = $("#contentRows");

    $('#contentRows').empty();


  // retrieve and display existing data using GET request
  $.ajax({
    type: "GET",
    url: "http://dvd-library.us-east-1.elasticbeanstalk.com/dvds" + category + "/" + $('#searchTerm').val(),
    success: function (dvdArray) {
      $.each(dvdArray, function (index, dvd) {
        //retrieve and store the values
        var title = dvd.title;
        var releaseYear = dvd.releaseYear;
        var director = dvd.director;
        var rating = dvd.rating;
        var id = dvd.id;

        // build a table using the retrieved values
        var row = "<tr>";
        
        row += '<td><a href="" onclick="showDvdDetails(' + id +'); return false;">' + title + "</a></td>";

        row += "<td>" + releaseYear + "</td>";
        row += "<td>" + director + "</td>";
        row += "<td>" + rating + "</td>";
        row +=
          '<td><button type="button" class="btn btn-info mr-4" onclick="showEditForm(' +
          id +
          ')">Edit</button><button type="button" class="btn btn-danger" onclick="deleteDvd(' +
          id +
          ')">Delete</button></td>';          
        row += "</tr>";

        contentRows.append(row);
        
      });

      $('#dvdList').show();
    },

    // create error function to display API error messages
    error: function () {
      $("#errorMessages").append(
        $("<li>")
          .attr({ class: "list-group-item list-group-item-danger" })
          .text("Error calling web service. Please try again later.")
      );
    },
  });
}

function deleteDvd(id) {
    $('#deleteConfirmationModal').modal('toggle');

}

function showDvdDetails(id) {

    console.log('This is showDvdDetail');

    $('#dvdList').hide();


    $.ajax({
        type: "GET",
        url: "http://dvd-library.us-east-1.elasticbeanstalk.com/dvd/" + id +"",
        success: function (dvd) {

            

            var content = "<h1>";

            var title = dvd.title;
            var year = dvd.releaseYear;
            var director = dvd.director;
            var rating = dvd.rating;
            var notes = dvd.notes;

            document.getElementById('displayTitleLabel').innerHTML = title;
            document.getElementById('displayReleaseYearLabel').innerHTML = year;
            document.getElementById('displayDirectorLabel').innerHTML = director;
            document.getElementById('displayRatingLabel').innerHTML = rating;
            document.getElementById('displayNotesLabel').innerHTML = notes;
            
            
            $('#displayDvdInfos').show();
        },
    
        // create error function to display API error messages
        error: function () {
            console.log('error');

        }
      });
}




function updateDVD(DVDId) {
    $('#updateButton').click(function(event) {
        /*var haveValidationErrors = checkAndDisplayValidationErrors($('#editForm').find('input'));
        
        if(haveValidationErrors) {
            return false;
        }*/


        if($('#editReleaseYear').val().length != 4)
        {
            $('#errorMessages').append($('<li>').attr({class: 'list-group-item list-group-item-danger'}).text('Need 4 digits - Release Year'));
            return false;
            
        }

        $('#errorMessage').empty();

        $.ajax({
            type: 'PUT',
            url: 'http://dvd-library.us-east-1.elasticbeanstalk.com/dvd/' + $('#editDVDId').val(),
            data: JSON.stringify({
                id: $('#editDVDId').val(),
                title: $('#editTitle').val(),
                releaseYear: $('#editReleaseYear').val(),
                director: $('#editDirector').val(),
                rating: $('#editRating option:selected').text(),
                notes: $('#editNotes').val()
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'success': function() {
               $('#errorMessage').empty();
               hideEditForm();
            },
            'error': function() {
                $('#errorMessages')
                .append($('<li>')
                .attr({class: 'list-group-item list-group-item-danger'})
                .text('Error calling web service. Please try again later.'));
            }
              
        })
    })
}

function showEditForm(DVDId) {
    //$('#errorMessages').empty();
    $("#dvdList").hide();
    
    $.ajax({
        type: 'GET',
        url: 'http://dvd-library.us-east-1.elasticbeanstalk.com/dvd/' + DVDId,
        success: function(data, status) {
            $('#editTitle').val('');
            $('#editReleaseYear').val('');
            $('#editDirector').val('');
            $('#editRating').val('');
            $('#editNotes').val('');
            
            $('#editDVDId').val(data.id);
            $('#editTitle').val(data.title);
            $('#editReleaseYear').val(data.releaseYear);
            
            $('#editDirector').val(data.director);
            var rating = data.rating;
            if (rating === "G") {
                $("#editRating").val("g").change();
            } else if (rating === "13+"){
                $("#editRating").val("thirteen").change();
            } else if (rating === "16+") {
                $("#editRating").val("sixteen").change();
            } else {
                $("#editRating").val("eighteen").change();
            }
            $('#editNotes').val(data.notes);
            
        },
        error: function() {
            $('#errorMessages')
            .append($('<li>')
            .attr({class: 'list-group-item list-group-item-danger'})
            .text('Error calling web service. Please try again later.')); 
        }
    })
    
    $('#editFormDiv').show();
}

function hideEditForm() {
    //$('#errorMessages').empty();
    
    $('#editTitle').val('');
    $('#editReleaseYear').val('');
    $('#editDirector').val('');
    $('#editRating').val('');
    $('#editNotes').val('');

    $('#editFormDiv').hide();
    displayDvds();
}

function deleteDvd(dvdId) {
    
}


function addDVD() {
    $('#addButton').click(function (event) {
        
        var haveValidationErrors = checkAndDisplayValidationErrors($('#addForm').find('input'));
        
        if(haveValidationErrors) {
            return false;
        }

        if($('#addReleaseYear').val().length != 4)
        {
            $('#errorMessages').append($('<li>').attr({class: 'list-group-item list-group-item-danger'}).text('Need 4 digits - Release Year'));
            return false;
            
        }

        $('#errorMessage').empty();


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
               

               $('#addFormDiv').hide();
               
               displayDvds();
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



function checkAndDisplayValidationErrors(input) {
    $('#errorMessages').empty();
    
    var errorMessages = [];
    
    input.each(function() {
        if (!this.validity.valid) {
            var errorField = $('label[for=' + this.id + ']').text();
            errorMessages.push(errorField + ' ' + this.validationMessage);
        }  
    });
    
    if (errorMessages.length > 0){
        $.each(errorMessages,function(index,message) {
            $('#errorMessages').append($('<li>').attr({class: 'list-group-item list-group-item-danger'}).text(message));
        });
        // return true, indicating that there were errors
        return true;
    } else {
        // return false, indicating that there were no errors
        return false;
    }
}