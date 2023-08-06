function klik() {
    alert("thank you, your message we will respond to")
}

$(document).ready(function(){
    $("ul li").click(function(){
        $(this).addClass("selected").siblings().
        removeclass("selected");
        $(".content > p").hide();
        $($(this).data("value")).fadeIn();
    });
});

const courseSelect = document.getElementById('course');
const errorCourse = document.getElementById('error-course');

courseSelect.addEventListener('change', function() {
  if (courseSelect.value === '') {
    errorCourse.style.display = 'block';
  } else {
    errorCourse.style.display = 'none';
  }
});
