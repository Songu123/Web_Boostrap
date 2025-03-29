// Lấy thông tin Tỉnh thành, Quận huyện, Phường xã
var citis = document.getElementById('city');
var districts = document.getElementById('district');
var wards = document.getElementById('ward');
var Parameter = {
  url: 'https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json',
  method: 'GET',
  responseType: 'application/json',
};
var promise = axios(Parameter);
promise.then(function (result) {
  renderCity(result.data);
});

function renderCity(data) {
  for (const x of data) {
    citis.options[citis.options.length] = new Option(x.Name, x.Id);
  }
  citis.onchange = function () {
    district.length = 1;
    ward.length = 1;
    if (this.value != '') {
      const result = data.filter((n) => n.Id === this.value);

      for (const k of result[0].Districts) {
        district.options[district.options.length] = new Option(k.Name, k.Id);
      }
    }
  };
  district.onchange = function () {
    ward.length = 1;
    const dataCity = data.filter((n) => n.Id === citis.value);
    if (this.value != '') {
      const dataWards = dataCity[0].Districts.filter((n) => n.Id === this.value)[0].Wards;

      for (const w of dataWards) {
        wards.options[wards.options.length] = new Option(w.Name, w.Id);
      }
    }
  };
}

// End lấy thông tin Tỉnh thành, Quận huyện, Phường xã

// Hàm lấy dữ liệu từ localstorage
function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

// Hàm lấy danh sách sản phẩm theo category
function getProductsByCategory(category) {
  const products = getLocalStorage('products'); // Lấy danh sách sản phẩm từ localStorage
  return products.filter((product) => product.category === category); // Lọc theo category
}

// Lấy thông tin giỏ hàng
function displayCheckout() {
    const carts = JSON.parse(localStorage.getItem('carts')) || [];
    const poloProducts = getProductsByCategory('polo');
    const aothunProducts = getProductsByCategory('aothun');
    const quanthunProducts = getProductsByCategory('quanthun');
    const quankakiProducts = getProductsByCategory('kaki');
    const quanlotProducts = getProductsByCategory('brief');
    const boxerProducts = getProductsByCategory('boxer');
  
  const allProducts = poloProducts.concat(poloProducts,aothunProducts,quankakiProducts, quanthunProducts,quanlotProducts, boxerProducts);
  const checkoutValue = document.getElementById('checkout_value');
  let totalAmount = 0;

  checkoutValue.innerHTML = ''; // Clear existing content

  carts.forEach((cart) => {
    const product = allProducts.find((product) => product.id === cart.id);

    if (product) {
      const price = Number(product.price.replace(/\./g, ''));
      const quantity = Number(cart.quantity);
      const subtotal = price * quantity;
      totalAmount += subtotal;

      checkoutValue.innerHTML += `
                <tr>
                    <td>
                        <span>${product.name}</span>
                        <span>× ${cart.quantity}</span>
                        <p class="mb-0">Màu sắc: Xanh đen</p>
                        <p class="mb-0">Size: ${cart.size}</p>
                    </td>
                    <td>${subtotal.toLocaleString('de-DE')} ₫</td>
                </tr>
            `;
    }
  });

  // Update footer totals
  const tfoot = document.querySelector('tfoot');
  if (tfoot) {
    tfoot.innerHTML = `
            <tr>
                <td>Tạm tính</td>
                <td>${totalAmount.toLocaleString('de-DE')} ₫</td>
            </tr>
            <tr>
                <td>Tổng</td>
                <td>${totalAmount.toLocaleString('de-DE')} ₫</td>
            </tr>
        `;
  }
}

// Check login status
function checkLoginStatus() {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  if (!user) {
    alert('Vui lòng đăng nhập để tiếp tục!');
    window.location.href = 'login.html'; // Redirect to login page
  }
  return user;
}


// Call the function when page loads
document.addEventListener('DOMContentLoaded', function () {
  displayCheckout();
});


