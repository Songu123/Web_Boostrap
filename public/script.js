// Hiển thị dữ liệu từ server
const displayData = async (type, isAccount) => {
    try {
        const response = await fetch(`http://localhost:3000/data/${type}`);
        if (!response.ok) throw new Error('Không thể lấy dữ liệu từ server');
        const items = await response.json();
        const element = document.getElementById("myElement");
        const nameMapping = {
            polo: "Áo Polo Nam",
            aothun: "Áo Thun Nam",
            kaki: "Quần Kaki Nam",
            quanthun: "Quần Thun Nam",
            brief: "Đồ Lót Brief",
            boxer: "Đồ lót Boxer",
            account: "Tài khoản người dùng"
        };

        changeTableHead(isAccount);

        document.querySelector(".modal-footer").innerHTML = `
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" onclick="saveDataWithImages('${type}', ${isAccount})" id="add-item" class="add-item btn btn-primary">Add</button>
        `;

        document.querySelector(".name-title").innerHTML = nameMapping[type] || '';

        element.innerHTML = items.map(value => `
            <tr>
                <th scope="row">${value.id}</th>
                ${isAccount ? getAccountTableCells(value) : getProductTableCells(value)}
                <td>
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticUpdate${value.id}">Update</button>
                    <button type="button" class="btn btn-danger" onclick="deleteItem('${value.id}', '${type}', ${isAccount})">Delete</button>
                    ${createUpdateModal(value, type, isAccount)}
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Lỗi hiển thị dữ liệu:', error);
    }
};

// Lưu dữ liệu với ảnh
const saveDataWithImages = async (type, isAccount) => {
    try {
        let data = isAccount ? getAccountData() : await getProductDataWithImages();

        const response = await fetch(`http://localhost:3000/data/${type}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error('Không thể thêm dữ liệu');
        await displayData(type, isAccount);
        closeModal('addModal'); // Đóng modal sau khi thêm thành công
    } catch (error) {
        console.error('Lỗi khi thêm:', error);
        alert('Có lỗi khi thêm dữ liệu!');
    }
};

// Tạo modal cập nhật
const createUpdateModal = (value, type, isAccount) => `
    <div class="modal fade" id="staticUpdate${value.id}" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5">Cập nhật ${isAccount ? 'tài khoản' : 'sản phẩm'}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    ${isAccount ? getAccountModalInputs(value) : getProductModalInputs(value)}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" onclick="saveUpdate('${value.id}', '${type}', ${isAccount})" class="btn btn-primary">Save Changes</button>
                </div>
            </div>
        </div>
    </div>
`;

const saveUpdate = async (id, type, isAccount) => {
    try {
        const data = isAccount ? getUpdatedAccountData(id) : await getUpdatedProductData(id);

        const response = await fetch(`http://localhost:3000/data/${type}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error('Không thể cập nhật dữ liệu');
        closeAndCleanupModal(`staticUpdate${id}`);
        await displayData(type, isAccount);
    } catch (error) {
        console.error('Lỗi khi cập nhật:', error);
        alert('Có lỗi khi cập nhật dữ liệu!');
    }
};

const deleteItem = async (id, type, isAccount) => {
    if (confirm(`Bạn có chắc chắn xoá ${isAccount ? 'tài khoản' : 'sản phẩm'} có id = ${id} không?`)) {
        try {
            const response = await fetch(`http://localhost:3000/data/${type}/${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Không thể xóa dữ liệu');
            console.log(`Xoá ${isAccount ? 'tài khoản' : 'sản phẩm'} thành công!`);
            await displayData(type, isAccount);
        } catch (error) {
            console.error('Lỗi khi xóa:', error);
            alert('Có lỗi khi xóa dữ liệu!');
        }
    }
};

const closeAndCleanupModal = (modalId) => {
    const modalElement = document.getElementById(modalId);
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
    setTimeout(() => {
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) backdrop.remove();
    }, 100);
};

const closeModal = (modalId) => {
    const modalElement = document.getElementById(modalId);
    const modal = bootstrap.Modal.getInstance(modalElement);
    if (modal) modal.hide();
};

// Hàm xử lý sản phẩm
const getProductDataWithImages = async () => {
    const name = document.querySelector(".product-name").value;
    const describe = document.querySelector(".product-describe").value;
    const price = document.querySelector(".product-price").value;
    const img1File = document.querySelector(".product-img1").files[0];
    const img2File = document.querySelector(".product-img2").files[0];

    const img1 = img1File ? await readFileAsBase64(img1File) : '';
    const img2 = img2File ? await readFileAsBase64(img2File) : '';

    return { name, description: describe, price, image1: img1, image2: img2 }; // Đồng bộ với backend
};

const readFileAsBase64 = (file) => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
    });
};

const getProductTableCells = (value) => `
    <td>${value.name}</td>
    <td>${value.description || value.describe}</td>
    <td>${value.price}</td>
    <td><img src="${value.image1 || value.img1}" alt="" class="w-img" style="max-width: 100px;"></td>
    <td><img src="${value.image2 || value.img2}" alt="" class="w-img" style="max-width: 100px;"></td>
`;

const getProductModalInputs = (value) => `
    <div class="form-group">
        <label class="d-flex justify-content-start">Name</label>
        <input type="text" class="border p-2 w-100" id="name-product-${value.id}" value="${value.name}">
    </div>
    <div class="form-group">
        <label class="d-flex justify-content-start">Describe</label>
        <input type="text" class="border p-2 w-100" id="describe-product-${value.id}" value="${value.description || value.describe}">
    </div>
    <div class="form-group">
        <label class="d-flex justify-content-start">Price</label>
        <input type="text" class="border p-2 w-100" id="price-product-${value.id}" value="${value.price}">
    </div>
    <div class="form-group">
        <label class="d-flex justify-content-start">Image 1</label>
        <input type="file" class="border p-2 w-100 product-img1-update" id="img1-product-${value.id}">
        <img src="${value.image1 || value.img1}" alt="" class="w-img" style="max-width: 100px;">
    </div>
    <div class="form-group">
        <label class="d-flex justify-content-start">Image 2</label>
        <input type="file" class="border p-2 w-100 product-img2-update" id="img2-product-${value.id}">
        <img src="${value.image2 || value.img2}" alt="" class="w-img" style="max-width: 100px;">
    </div>
`;

const getUpdatedProductData = async (id) => {
    const name = document.getElementById(`name-product-${id}`).value;
    const describe = document.getElementById(`describe-product-${id}`).value;
    const price = document.getElementById(`price-product-${id}`).value;
    const img1File = document.getElementById(`img1-product-${id}`).files[0];
    const img2File = document.getElementById(`img2-product-${id}`).files[0];

    const response = await fetch(`http://localhost:3000/data/polo/${id}`);
    const currentItem = await response.json();

    const img1 = img1File ? await readFileAsBase64(img1File) : currentItem.image1 || currentItem.img1;
    const img2 = img2File ? await readFileAsBase64(img2File) : currentItem.image2 || currentItem.img2;

    return { name, description: describe, price, image1: img1, image2: img2 }; // Đồng bộ với backend
};

// Hàm xử lý tài khoản
const getAccountData = () => ({
    username: document.querySelector(".username-type").value,
    name: document.querySelector(".name-type").value,
    email: document.querySelector(".email-type").value,
    password: document.querySelector(".password-type").value,
    role: document.querySelector(".role-type").value
});

const getAccountTableCells = (value) => `
    <td>${value.username}</td>
    <td>${value.name}</td>
    <td>${value.email}</td>
    <td>${value.password}</td>
    <td>${value.role}</td>
`;

const getAccountModalInputs = (value) =>
    ['username', 'name', 'email', 'password', 'role'].map(field => `
        <div class="form-group">
            <label class="d-flex justify-content-start">${field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input type="text" class="w-100" id="${field}-account-${value.id}" value="${value[field]}">
        </div>
    `).join('');

const getUpdatedAccountData = (id) => ({
    username: document.getElementById(`username-account-${id}`).value,
    name: document.getElementById(`name-account-${id}`).value,
    email: document.getElementById(`email-account-${id}`).value,
    password: document.getElementById(`password-account-${id}`).value,
    role: document.getElementById(`role-account-${id}`).value
});

// Thay đổi modal thêm mới
const changeProductModal = () => {
    const formModal = document.querySelector(".modal-body");
    formModal.innerHTML = `
        <div class="form-group">
            <label class="d-flex justify-content-start">Name Product</label>
            <input type="text" class="border p-2 w-100 product-name" placeholder="Enter product name">
        </div>
        <div class="form-group">
            <label class="d-flex justify-content-start">Describe</label>
            <input type="text" class="border p-2 w-100 product-describe" placeholder="Enter description">
        </div>
        <div class="form-group">
            <label class="d-flex justify-content-start">Price</label>
            <input type="text" class="border p-2 w-100 product-price" placeholder="Enter price">
        </div>
        <div class="form-group">
            <label class="d-flex justify-content-start">Image 1</label>
            <input type="file" class="border p-2 w-100 product-img1" accept="image/*">
        </div>
        <div class="form-group">
            <label class="d-flex justify-content-start">Image 2</label>
            <input type="file" class="border p-2 w-100 product-img2" accept="image/*">
        </div>
    `;
};

const changeAccountModal = () => {
    const formModal = document.querySelector(".modal-body");
    formModal.innerHTML = ['username', 'name', 'email', 'password', 'role'].map(field => `
        <div class="form-group">
            <label class="d-flex justify-content-start">${field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input type="text" class="border p-2 w-100 ${field}-type" placeholder="Enter your ${field}">
        </div>
    `).join('');
};

// Thay đổi tiêu đề bảng
const changeTableHead = (isAccount) => {
    const thead = document.querySelector('table thead');
    const productHeaders = `
        <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Describe</th>
            <th scope="col">Price</th>
            <th scope="col">Image 1</th>
            <th scope="col">Image 2</th>
            <th scope="col" class="col-3">Actions</th>
        </tr>
    `;
    const accountHeaders = `
        <tr>
            <th scope="col">ID</th>
            <th scope="col">Username</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Password</th>
            <th scope="col">Role</th>
            <th scope="col" class="col-3">Actions</th>
        </tr>
    `;

    thead.innerHTML = isAccount ? accountHeaders : productHeaders;
    if (isAccount) changeAccountModal();
    else changeProductModal();
};