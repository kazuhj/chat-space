$(function(){
  function buildHTML(chat){
    console.log(chat)

    var image = `<div class="lower-message">
                   <img class="lower-message__image" src= ${chat.image}>
                 </div>`

    var name_date =`<div class="message", data-message-id="${chat.id}">
                      <div class="upper-message">
                        <div class="upper-message__user-name">
                          ${chat.name}
                        </div>
                      <div class="upper-message__date">
                        ${chat.date}
                      </div>
                    </div>`;

    var contents = `<div class="message", data-message-id="${chat.id}">
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

    if (chat.content && chat.image) {
      var html = `${contents}
                    ${image}`;
    } else if (chat.image) {
      var html = `${name_date}
                    ${image}`;
    } else {
      var html = `${contents}`;
    };
    return html;
  };

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
  var reloadChats = function () {
    if (window.location.href.match(/\/groups\/\d+\/chats/)){
      var last_message_id = $('.message:last').data("message-id");
      console.log(last_message_id);

      $.ajax({
        url: "api/chats",
        type: 'GET', 
        dataType: 'json', 
        data: {last_id: last_message_id}
      })
      .done(function (chats) {
        console.log(chats)
        var insertHTML = '';
        chats.forEach(function (chat) {
          insertHTML = buildHTML(chat);
          console.log(chat);
          $('.messages').append(insertHTML);
        })
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      })
      .fail(function () {
        alert('自動更新に失敗しました');
      });
    }
  };
  setInterval(reloadChats, 7000);
});