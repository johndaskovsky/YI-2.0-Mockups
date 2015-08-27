//Focus on first field of modal
$(function() {
  $('#modal-sign-in').on('shown.bs.modal', function () {
    $('#modalInputEmail').focus();
  });

  $('#modal-sign-in').on('hidden.bs.modal', function () {
    $(".modal-sign-in-form").show();
    $(".modal-join-form").hide();
  });

  $('#modal-join').on('shown.bs.modal', function () {
    $('#modalJoinInputName').focus();
  });

  $('#modal-create-an-account-toggle').on('click', function () {
    $(".modal-sign-in-form").hide(400);
    $(".modal-join-form").show(400);
    setTimeout( function() {
      $('#modalJoinInputName').focus();
    }, 450);
  });
  
});
