$("#contactForm").submit(function(event){
    // cancels the form submission
    event.preventDefault();
    submitForm();
});

function submitForm(){
    clearForm();
    // Initiate Variables With Form Content
    var fName = $("#fName").val();
    var lName = $("#lName").val();
    var email = $("#email").val();
    var concern = $("#concern").val();
    var message = $("#message").val();

    $.ajax({
        type: "POST",
        url: "php/form-process.php",
        data: "name=" + fName + " " + lName + "&email=" + email + "&message=" + message,
        success : function(text){
            if (text == "success"){
                formSuccess();
            }
        }
    });
}
function formSuccess(){
    $( "#msgSubmit" ).removeClass( "display-none" );
}

function clearForm(){
    document.querySelector("#contactForm").reset();
    $('.form-control').each(function(){
        $(this).next().removeClass('notEmpty');
    });
}
