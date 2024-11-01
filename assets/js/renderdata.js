loadData();
function loadData() {
    // Get current HTML filename
    const pageName = window.location.pathname.split('/').pop();
  
    // Define containers for each product category, only if they exist on the page
    const poloProductContainer = document.querySelector("#aopolo-category");
    const aothunProductContainer = document.querySelector("#aothun-category");
    const quanthunProductContainer = document.querySelector("#quanthun-category");
    const quanlotProductContainer = document.querySelector("#quanlot-category");
  
    const renderProduct = (product, container) => {
      const price = product.price ? Number(product.price.replace(/\./g, "")) : 0;
      const productHTML = `
        <div class="col-md-3 px-3 my-3">
          <a href="./product_detail.html?id=${product.id}" class="text-decoration-none">
            <div class="card product-card shadow-sm">
              <div class="position-relative overflow-hidden">
                <div class="img-container w-100">
                  <img src="${product.img1}" class="card-img-top" alt="Product Image">
                  <img src="${product.img2}" class="position-absolute card-img-bottom top-0" alt="Product Image">
                </div>
              </div>
              <div class="card-body">
                <h5 class="card-title">${product.name || "No name"}</h5>
                <p class="price fw-bold">${product.price || "0"} ₫</p>
              </div>
            </div>
          </a>
        </div>
      `;
      container.innerHTML += productHTML;
    };
  
    // Load data based on the current page
    if (pageName === 'ao-polo-nam.html' && poloProductContainer) {
        poloProductContainer.innerHTML = '';
      const poloProducts = JSON.parse(localStorage.getItem('polo')) || [];
      poloProducts.forEach(product => renderProduct(product, poloProductContainer));
    } else if (pageName === 'ao-thun-nam.html' && aothunProductContainer) {
        aothunProductContainer.innerHTML = '';
      const aothunProducts = JSON.parse(localStorage.getItem('aothun')) || [];
      aothunProducts.forEach(product => renderProduct(product, aothunProductContainer));
    } else if (pageName === 'quanthun.html' && quanthunProductContainer) {
        quanthunProductContainer.innerHTML = '';
      const quanthunProducts = JSON.parse(localStorage.getItem('quanthun')) || [];
      quanthunProducts.forEach(product => renderProduct(product, quanthunProductContainer));
    } else if (pageName === 'quanlot.html' && quanlotProductContainer) {
        quanlotProductContainer.innerHTML = '';
      const quanlotProducts = JSON.parse(localStorage.getItem('brief')) || [];
      quanlotProducts.forEach(product => renderProduct(product, quanlotProductContainer));
    }
  }
  
  document.addEventListener("DOMContentLoaded", loadData);
  