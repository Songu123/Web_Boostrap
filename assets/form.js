(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()



var prevScrollpos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
window.onscroll = function () {
    var currentScrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

    if (prevScrollpos > currentScrollPos) {
        // Hiện navbar ngay lập tức khi cuộn lên
        document.querySelector('.navbar').style.top = "0";
    } else if (Math.abs(currentScrollPos - prevScrollpos) > 10) {
        // Ẩn navbar chỉ khi cuộn xuống ít nhất 50px
        document.querySelector('.navbar').style.top = "-100px";
    }

    prevScrollpos = currentScrollPos;
}


