$(function(){
  function buildHTML(message){
    var message_image = message.image ? message.image : ""
    var html = `<div class="message" data-message-id="${message.id}">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                       ${message.name}
                    </div>
                    <div class="upper-message__date">
                       ${message.created_at}
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                      ${message.body}
                    </p>
                    <img class="lower-message__image" src="${message_image}">
                  </div>
                </div>`
    return html;
  }

  $('.new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
     $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.form__message, .form__mask__image').val('');
      $('.message:last').animate({scrollTop: $('.message:last').get(0).scrollHeight}, 'slow');
    })
    .fail(function() {
      alert('error');
    })
    .always(function(){
      $('.form__submit').prop("disabled", false);
    });
  });
});
