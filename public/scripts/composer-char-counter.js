$(document).ready(function() {
  const form = document.getElementById("tweet-text");
  form.addEventListener("input", function(event) {
    const textArea = $(this);
    let count = 140 - textArea.val().length;
    if (count < 0) {
      $('.counter').addClass('red-text');
    } else {
      $('.counter').removeClass('red-text');
    }
    // Change from explicit reference to .counter when I know how (this is bad practice)
    $('.counter').text(count);
  });
});

