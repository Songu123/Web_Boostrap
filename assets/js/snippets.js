document.getElementById("toastbtn").onclick = function() {
    console.log("Bạn đã nhấn nút");  // Corrected the message

    // Get all elements with class 'toast' and initialize Bootstrap Toasts for them
    var toastElList = Array.from(document.querySelectorAll('.toast'));
    var toastList = toastElList.map(function(toastEl) {
      return new bootstrap.Toast(toastEl);
    });

    // Show each toast
    toastList.forEach(toast => toast.show());
};
