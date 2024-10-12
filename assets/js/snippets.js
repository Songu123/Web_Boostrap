// function getQueryParam(param) {
//   const urlParams = new URLSearchParams(window.location.search);
//   return urlParams.get(param);
// }

// // Lấy ID sản phẩm từ URL
// const product_Id = getQueryParam('id');


// document.getElementById("toastbtn").onclick = function() {
//     console.log("Bạn đã nhấn nút");  // Corrected the message

  
//     var quantity_cart = document.querySelector("#quantity_product").value;

//     // Tạo đối tượng giỏ hàng với ID sản phẩm và số lượng
//     var cart = {
//       'id': product_Id,  // Sử dụng ID sản phẩm từ URL
//       'quantity': quantity_cart
//     };
  
//     // Lấy giỏ hàng hiện tại từ localStorage hoặc tạo mảng rỗng nếu chưa có
//     var carts = JSON.parse(localStorage.getItem('carts')) || [];
  
//     // Thêm sản phẩm vào giỏ hàng
//     carts.push(cart);
  
//     // Lưu giỏ hàng đã cập nhật vào localStorage
//     localStorage.setItem('carts', JSON.stringify(carts));
  
//     console.log("Bạn đã thêm sản phẩm vào giỏ hàng!");
//     // Get all elements with class 'toast' and initialize Bootstrap Toasts for them
//     var toastElList = Array.from(document.querySelectorAll('.toast'));
//     var toastList = toastElList.map(function(toastEl) {
//       return new bootstrap.Toast(toastEl);
//     });

//     // Show each toast
//     toastList.forEach(toast => toast.show());
// };
