// Render giá trị vào bảng giỏ hàng
displayCart();

// const giam = document.getElementById('button-addon1');
// const tang = document.getElementById('button-addon2');
// const quantity_product = document.getElementById('quantity_product');

// // Chuyển giá trị hiện tại trong input thành số nguyên
// let currentQuantity = parseInt(quantity_product.value);

// // Xử lý khi nhấn nút tăng
// tang.addEventListener('click', function () {
//     currentQuantity += 1;
//     quantity_product.value = currentQuantity;
// });

// // Xử lý khi nhấn nút giảm
// giam.addEventListener('click', function () {
//     if (currentQuantity > 1) {
//         currentQuantity -= 1;
//     }
//     quantity_product.value = currentQuantity;
// });



function calcTotal(productId, size) {
    var quantityInput = document.querySelector(`#quantity_product_${productId}_${size}`);
    var productPriceElement = document.querySelector(`.product-price[data-id="${productId}_${size}"]`);

    if (quantityInput && productPriceElement) {
        var price = Number(productPriceElement.innerHTML.replace(/\./g, ""));
        var product_quantity = Number(quantityInput.value);
        var price_value = price * product_quantity;

        var price_tamtinh = document.querySelector(`.tamtinh[data-id="${productId}_${size}"]`);
        if (price_tamtinh) {
            price_tamtinh.innerHTML = price_value.toLocaleString();
        }
    }

    displayCart()

}

function increaseQuantity(productId, size) {
    var quantityInput = document.querySelector(`#quantity_product_${productId}_${size}`);
    var currentQuantity = Number(quantityInput.value);
    quantityInput.value = currentQuantity + 1;
    calcTotal(productId, size); // Update total for this specific product
}

function decreaseQuantity(productId, size) {
    var quantityInput = document.querySelector(`#quantity_product_${productId}_${size}`);
    var currentQuantity = Number(quantityInput.value);
    if (currentQuantity > 1) {
        quantityInput.value = currentQuantity - 1;
        calcTotal(productId, size); // Update total for this specific product
    }
}

function displayCart() {
    const carts = JSON.parse(localStorage.getItem('carts')) || [];
    const products = JSON.parse(localStorage.getItem('products')) || [];
    var table_cart = document.querySelector(".table-cart-content");
    var tongtien = 0;
    table_cart.innerHTML = ""; // Clear existing content

    // Iterate through each cart item
    carts.forEach(cart => {
        const product = products.find(product => product.id === cart.id);

        if (product) { // Check if the product exists
            var price = Number(product.price.replace(/\./g, ""));
            var product_quantity = Number(cart.quantity);
            var price_value = (price * product_quantity);
            tongtien += price_value;
            table_cart.innerHTML += `
                <tr>
                    <td class="col-5">
                        <div class="d-flex align-items-center">
                            <button type="button" class="btn-close border border-1 px-3 py-2" aria-label="Close" onclick="deleteCart('${cart.id}', '${cart.size}')"></button>
                            <div class="col-4 p-2 me-1">
                                <img src="${product.img1}" class="w-100" alt="">
                            </div>
                            <div class="col-6 d-flex flex-column justify-content-center">
                                <p class="fw-light d-inline mb-1">${product.name}</p>
                                <p class="text-color mb-1 text-cart"><b>Màu sắc: </b>Xanh đen</p>
                                <p class="text-color mb-1 text-cart"><b>Size: </b>${cart.size}</p>
                            </div>
                        </div>
                    </td>
                    <td class="fw-bold align-middle"><span class="product-price" data-id="${cart.id}_${cart.size}">${product.price}</span> đ</td>
                    <td class="align-middle">
                        <div class="input-group" style="width: 120px;">
                            <button class="btn btn-white border border-secondary" type="button"
                                    onclick="decreaseQuantity('${cart.id}','${cart.size}')">
                                <i class="fas fa-minus"></i>
                            </button>
                            <input id="quantity_product_${cart.id}_${cart.size}" 
                                   class="quantity_product form-control text-center border border-secondary"
                                   value="${cart.quantity}" oninput="calcTotal('${cart.id}','${cart.size}')" />
                            <button class="btn btn-white border border-secondary" type="button"
                                    onclick="increaseQuantity('${cart.id}','${cart.size}')">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </td>
                    <td class="fw-bold align-middle"><span class="tamtinh" data-id="${cart.id}_${cart.size}">${price_value.toLocaleString()}</span> đ</td>
                </tr>
            `;
        }
    });

    console.log("tong tien = " + tongtien);
}
