//jshint esversion: 6

const scrollButton = document.querySelector(".scroll-top");

scrollButton.addEventListener("click", function() {
  $("html, body").animate({scrollTop: 0}, "slow");  //Using jQuery ensures maximum cross-browser compatability
});
