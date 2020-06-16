//jshint esversion: 6

$(document).ready(function() {  //ALlows header text to slowly slide into view from the top
  $(".animate").slideDown(2500, "linear");
});

const scrollButton = document.querySelector(".scroll-top");

scrollButton.addEventListener("click", function() {
  $("html, body").animate({scrollTop: 0}, "slow");  //Using jQuery ensures maximum cross-browser compatability
});
