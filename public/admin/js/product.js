// Thay đổi trạng thái sản phẩm
const buttonsChangeStatus = document.querySelectorAll("[button-change-status]");
if (buttonsChangeStatus.length > 0) {   
    const formChangeStatus = document.querySelector("#form-change-status");
    const path = formChangeStatus.getAttribute("path");
    buttonsChangeStatus.forEach((item) => {
        item.addEventListener("click", () => {
            const productStatus = item.getAttribute("data-status");
            const productId = item.getAttribute("data-id");
            let productChangeStatus = productStatus == "active" ? "inactive" : "active";
            const action = path + `/${productChangeStatus}/${productId}`;
            formChangeStatus.action  = action + "?_method=PATCH";
            formChangeStatus.submit();
        });
    });
}


// Xóa sản phẩm
const buttonDeleteItem = document.querySelectorAll("[button-delete-item]");
const formDeleteItem = document.querySelector("#form-delete-item");
if(buttonDeleteItem && formDeleteItem) {
    const path = formDeleteItem.getAttribute("path");
    buttonDeleteItem.forEach((button) => {
        button.addEventListener("click", () => {
            const id = button.getAttribute("data-id");
            const action = `${path}/${id}`
            formDeleteItem.action = action + "?_method=DELETE";
            const isConfirm = confirm("Bạn có chắc muốn xóa sản phẩm?");
            if(isConfirm){
                formDeleteItem.submit();
            }
        });
    });
};

// Preview image

const formCreateProduct = document.querySelector("[form-create-product]");
if (formCreateProduct) {
    const formInputImage = formCreateProduct.querySelector("[form-input-image]");
    const formPreviewImage = formCreateProduct.querySelector("[form-preview-image]");
    formInputImage.addEventListener("change", (e) => {
        if (e.target.files[0]) {
            formPreviewImage.src = URL.createObjectURL(e.target.files[0]);
        }
    })
}


const formUpdateProduct = document.querySelector("[form-update-product]");
if (formUpdateProduct) {
    const formInputImage = formUpdateProduct.querySelector("[form-input-image]");
    const formPreviewImage = formUpdateProduct.querySelector("[form-preview-image]");
    formInputImage.addEventListener("change", (e) => {
        if (e.target.files[0]) {
            formPreviewImage.src = URL.createObjectURL(e.target.files[0]);
        }
    })
}
