const giam = document.getElementById('button-addon1');
const tang = document.getElementById('button-addon2');
const quantity_product = document.getElementById('quantity_product');

// Chuyển giá trị hiện tại trong input thành số nguyên
let currentQuantity = parseInt(quantity_product.value);

// Xử lý khi nhấn nút tăng
tang.addEventListener('click', function() {
    currentQuantity += 1;
    quantity_product.value = currentQuantity;
});

// Xử lý khi nhấn nút giảm
giam.addEventListener('click', function() {
    if (currentQuantity > 1) {
        currentQuantity -= 1;
    }
    quantity_product.value = currentQuantity;
});



function calcTotal() {
    var product_price = document.querySelector(".product-price");

    var price = Number(product_price.innerHTML.replace(/\./g, ""));

    var product_quantity = Number(document.querySelector("#quantity_product").value);

    var price_value = price * product_quantity;

    console.log(price_value);

    var price_tamtinh = document.querySelector(".tamtinh");

    price_tamtinh.innerHTML = price_value.toLocaleString(); 
}


function increaseQuantity() {
    var quantityInput = document.querySelector("#quantity_product");
    var currentQuantity = Number(quantityInput.value);
    quantityInput.value = currentQuantity + 1; 
    calcTotal(); 
}

function decreaseQuantity() {
    var quantityInput = document.querySelector("#quantity_product");
    var currentQuantity = Number(quantityInput.value);
    if (currentQuantity > 1) { 
        quantityInput.value = currentQuantity - 1; 
        calcTotal(); // 
    }
}

