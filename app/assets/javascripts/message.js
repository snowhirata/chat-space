$(function(){

  function buildHTML(message){
    var insertImage = '';
    if (message.image_url) {
      insertImage = `<img src="${message.image_url}">`;
    }
    var html = `<div class = "message" data-id = "${message.id}"}>
                  <div class = "upper-message">
                    <div class = "upper-message__user-name">
                      ${message.name}
                    </div>
                    <div class = "upper-message__date.">
                      ${message.created_at)}
                    </div>
                  </div>
                  <div class = "lower-message">
                    <div class= "lower-message__content">
                      ${message.body}
                    </div>
                      ${insertImage}
                  </div>
                </div>`
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.wrapper').append(html)
      $('#message_body').val('')
      $('.messages').animate({scrollTop: $(".messages")[0].scrollHeight}, 1500);
    })
    .fail(function(){
      alert('error');
    })
  })

  // function scroll(){
  //   $('.message').animate({scrollTop: $('message')[0].scrollHeight}, 'fast');
  // }
})
