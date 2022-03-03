/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const createTweetElement = function(obj) {
    let markup = `
    <article>
      <header>
        <i class="fa-solid fa-user"></i>
        <h1>${obj.user.name}</h1>
      </header>
      <div id="tweet-body">
        <h2>${obj.content.text}</h2>
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
      $('.tweet-container').append($readyTweet);
    }
  };


  const loadTweets = function(callback) {
    $.ajax('/tweets', { method: 'GET' })
    .then(function (tweets) {
      callback(tweets);
    });
  };
  
  loadTweets(renderTweets);

  // const loadLatestTweets = function() {
  //   $.ajax('/tweets', { method: 'GET' })
  //   .then(function (tweets) {
  //     renderTweets(tweets);
  //   });
  // };

  // const renderLatestTweet = function(tweets) {
  //   latestTweet = tweets.slice(-1)[0];
  //   const $readyTweet = createTweetElement(latestTweet);
  //   $('.tweet-container').append($readyTweet);
  // };

  //sends post request to server
  $('form').submit(function(event) {
    const rawData = $('textarea').val();
    const serializedData = $('textarea').serialize();
    event.preventDefault();
    if (rawData === null || rawData === '') {
      return alert('Your tweet is empty!');
    }
    if (rawData.length > 140) {
      return alert('Your tweet has exceeded 140 characters!');
    }

    $.post('/tweets', serializedData, () => {
      console.log(serializedData);
      //$('#tweet-form')[0].reset();
      //renderLatestTweet();
    });
  });

});



