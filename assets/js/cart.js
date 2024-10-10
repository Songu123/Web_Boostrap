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
