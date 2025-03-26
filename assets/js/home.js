// Hiển thị sản phẩm từ localStorage
document.addEventListener('DOMContentLoaded', function() {
  // Load tất cả sản phẩm theo danh mục
  loadProductsByCategory('polo', '#poloProductsContainer');
  loadProductsByCategory('aothun', '#aothunProductsContainer');
  loadProductsByCategory('kaki', '#kakiProductsContainer');
  loadProductsByCategory('quanthun', '#quanthunProductsContainer');
  loadProductsByCategory('brief', '#briefProductsContainer');
  loadProductsByCategory('boxer', '#boxerProductsContainer');
});

// Tải sản phẩm từ localStorage theo danh mục
function loadProductsByCategory(category, containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  
  const products = getProductsFromStorage(category);
  
  if (products.length === 0) {
    container.innerHTML = `
      <div class="col-12 text-center py-5">
        <p class="text-muted">Chưa có sản phẩm nào trong danh mục này</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = '';
  
  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'col-md-4 col-lg-3 mb-4';
    productCard.innerHTML = `
      <div class="card product-card h-100">
        <div class="product-image-container">
          <img src="${product.img1}" class="card-img-top product-image" alt="${product.name}">
        </div>
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text flex-grow-1">${product.describe.substring(0, 80)}${product.describe.length > 80 ? '...' : ''}</p>
          <div class="d-flex justify-content-between align-items-center">
            <span class="price-tag">$${parseFloat(product.price).toLocaleString()}</span>
            <button class="btn btn-primary btn-sm" onclick="addToCart('${product.id}', '${category}')">
              <i class="bi bi-cart-plus"></i> Thêm vào giỏ
            </button>
          </div>
        </div>
      </div>
    `;
    container.appendChild(productCard);
  });
}

// Lấy sản phẩm từ localStorage
function getProductsFromStorage(category) {
  const products = JSON.parse(localStorage.getItem('products')) || [];
  return products.filter(product => product.category === category);
}

// Thêm vào giỏ hàng (thêm chức năng này nếu cần)
function addToCart(productId, category) {
  const products = getProductsFromStorage(category);
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    alert('Không tìm thấy sản phẩm');
    return;
  }
  
  // Lấy giỏ hàng hiện tại hoặc tạo mới
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  
  // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: productId,
      name: product.name,
      price: product.price,
      image: product.img1,
      category: category,
      quantity: 1
    });
  }
  
  // Lưu giỏ hàng vào localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Hiển thị thông báo
  showNotification('Đã thêm sản phẩm vào giỏ hàng!');
}

// Hiển thị thông báo
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.innerHTML = `
    <div class="alert alert-success alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Tự động ẩn sau 3 giây
  setTimeout(() => {
    notification.remove();
  }, 3000);
} 