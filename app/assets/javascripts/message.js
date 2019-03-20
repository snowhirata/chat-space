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
      $('form')[0].reset();
      $('.message:last').animate({scrollTop: $('.message:last').get(0).scrollHeight}, 'slow');
    })
    .fail(function() {
      alert('error');
    })
    .always(function(){
      $('.form__submit').prop("disabled", false);
    });
  });

  $(function(){
    $(function(){
      if(location.href.match(/\/groups\/\d+\/messages/)) {
        setInterval(update, 5000);
      }
    });
    function update(){
      if($('.messages')[0]){
        var last_id = $('.message:last').data('messageId');

      $.ajax ({
        url: location.href,
        type: 'GET',
        data: { id: last_id },
        dataType: 'json'
      })
      .done(function(data){
        var messages = data;
        var AddHtml = "";
        $.each(messages, function(i, message){
          AddHtml += buildHTML(message);
        });
        $('.messages').html(AddHtml);
      })
      .fail(function(data){
        alert('自動更新に失敗しました')
      })
      }else{
        clearInterval(interval)
      }
    }
  })
});
