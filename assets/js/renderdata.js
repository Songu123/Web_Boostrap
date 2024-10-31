loadData();

function loadData() {
    const poloProducts = JSON.parse(localStorage.getItem('polo')) || [];
    const aothunProducts = JSON.parse(localStorage.getItem('aothun')) || [];
    const quanthunProducts = JSON.parse(localStorage.getItem('quanthun')) || [];
    const quanlotProducts = JSON.parse(localStorage.getItem('brief')) || [];

    const poloProductContainer = document.querySelector("#aopolo-category");
    const aothunProductContainer = document.querySelector("#aothun-category");
    const quanthunProductContainer = document.querySelector("#quanthun-category");
    const quantlotProductContainer = document.querySelector("#quanlot-category");

    poloProductContainer.innerHTML = '';


    const renderProduct = (product, container) => {
        const price = Number(product.price.replace(/\./g, ""));
        const productHTML = `
            <div class="col-md-3 px-3 my-3" style="">
                    <a href="./product_detail.html?id=${product.id}" class="text-decoration-none">
                        <div class="card product-card shadow-sm">
                            <div class="position-relative overflow-hidden">
                                <div class="img-container w-100">
                                    <img src="${product.img1}" class="card-img-top"
                                        alt="Product Image">
                                    <img src="${product.img2}"
                                        class="position-absolute card-img-bottom top-0" alt="Product Image">
                                    <div
                                        class="position-absolute bottom-0 start-0 text-center w-100 bg-dark text-white p-2 quick-view">
                                        QUICK VIEW
                                    </div>
                                    <button class="loving-product position-absolute top-0 end-0 rounded-circle">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15"
                                            fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd"
                                                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="">
                                    <h5 class="card-title">${product.name}</h5>
                                    <p class="price fw-bold">${product.price} ₫</p>
                                </div>
                                <div class="">
                                    <div class="d-flex">
                                        <p class="text-muted">Màu sắc</p>
                                        <div class="d-flex ps-2">
                                            <img src="./assets/images/products/image.jpg" alt="color1"
                                                class="rounded-circle me-2" width="30" height="30">
                                            <img src="./assets/images/products/z5018069269739-aa5c5764d2d4602bb8b55ec50edad312-600x600.jpg"
                                                alt="color2" class="rounded-circle me-2" width="30" height="30">
                                            <img src="./assets/images/products/image.jpg" alt="color3"
                                                class="rounded-circle" width="30" height="30">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
        `;
        container.innerHTML += productHTML;
    };

    poloProducts.forEach((product) => renderProduct(product, poloProductContainer));
    aothunProducts.forEach((product) => renderProduct(product, aothunProductContainer));
    quanthunProducts.forEach((product) => renderProduct(product, quanthunProductContainer));
    quanlotProducts.forEach((product) => renderProduct(product, quantlotProductContainer));
}