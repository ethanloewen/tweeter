/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function(obj) {
    let markup = `
    <article>
      <header>
        <img src="${obj.user.avatars}" alt="profile picture">
        <h1>${escape(obj.user.name)}</h1>
        <h5>${escape(obj.user.handle)}</h5>
      </header>
      <div id="tweet-body">
        <h2>${escape(obj.content.text)}</h2>
      </div>
      <footer>
        <h3>${timeago.format(obj.created_at)}</h3>
        <span>
          <i class="fa-solid fa-flag fa-2xs"></i>
          <i class="fa-solid fa-retweet fa-2xs"></i>
          <i class="fa-solid fa-heart fa-2xs"></i>
        </span>
      </footer>
    </article>
    `;
    const $tweet = $(markup);
    return $tweet;
  };


  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const $readyTweet = createTweetElement(tweet);
      $('.tweet-container').prepend($readyTweet);
    }
  };

  // runs a callback once tweets load
  const loadTweets = function(callback) {
    $.ajax('/tweets', { method: 'GET' })
    .then(function (tweets) {
      callback(tweets);
    });
  };

  loadTweets(renderTweets);

  const renderLatestTweet = function(tweets) {
    latestTweet = tweets[tweets.length - 1];
    const $readyTweet = createTweetElement(latestTweet);
    $('.tweet-container').prepend($readyTweet);
  };

  //sends post request to server
  $('form').submit(function(event) {
    const rawData = $('textarea').val();
    const serializedData = $('textarea').serialize();
    event.preventDefault();
    if (rawData === null || rawData === '') {
      $('#error-block h4').html('Error: Your tweet is empty!');
      $('#error-block').slideDown();
      toggleErrorIcons('show');
      return;
    }
    if (rawData.length > 140) {
      $('#error-block h4').html('Error: Your tweet has exceeded 140 characters!');
      $('#error-block').slideDown();
      toggleErrorIcons('show');
      return;
    }

    toggleErrorIcons('hide');
    $('#error-block').slideUp();
    
    $.post('/tweets', serializedData, () => {
      console.log(serializedData);
      $('#tweet-form')[0].reset();
      $('.counter').text(140);
      loadTweets(renderLatestTweet);
    });
  });

  // state agument can be 'show' or 'hide' (string)
  const toggleErrorIcons = (state) => {
    if (state.toUpperCase() === 'HIDE') {
      $('#tri1, #tri2').css({'opacity': 0});
      $('#tri1, #tri2').css({'animation': 'hide 0s'});
    } else if (state.toUpperCase() === "SHOW") {
      $('#tri1, #tri2').css({'animation': 'fadeIn 2s'});
      $('#tri1, #tri2').css({'opacity': 1});
    } else {
      console.log('Please enter "hide" or "show" as the argument');
    }
  };

  $('#new-tweet-prompt').click(function() {
    if ($(tri1).css('opacity') == 0) {
      toggleErrorIcons('show');
    } else {
      toggleErrorIcons('hide');
    }
    $('.new-tweet').slideToggle();
    $('#tweet-text').focus();
  });

});



