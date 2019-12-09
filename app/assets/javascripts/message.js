$(function(){
  function buildHTML(chat){

    var contents = `<div class="message">
                      <div class="upper-message">
                        <div class="upper-message__user-name">
                          ${chat.name}
                        </div>
                        <div class="upper-message__date">
                          ${chat.date}
                        </div>
                      </div>
                      <div class="lower-message">
                        <p class="lower-message__content">
                          ${chat.content}
                        </p>
                      </div>
                    </div>`;

    if (chat.image.url == null) {
      var html = `<div class="message">
                    ${contents}
                  </div>`;

    } else {
      var html = `<div class="message">
                    ${contents}
                    <img src="${chat.image.url}">
                  </div>`;
    }
    return html;
  }

  $('#new_chat').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url =$(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(chat){
      var html = buildHTML(chat);
      $('.messages').append(html);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('#new_chat')[0].reset();
      $('.form__submit').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    })
  })
})