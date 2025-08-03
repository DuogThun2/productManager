// Thay đổi trạng thái sản phẩm
const buttonsChangeStatus = document.querySelectorAll("[button-change-status]");
if (buttonsChangeStatus.length > 0) {
    const formChangeStatus = document.querySelector("[form-change-status]");
    const path = formChangeStatus.getAttribute("path");
    buttonsChangeStatus.forEach((button) => {
        button.addEventListener("click", () => {
            const id = button.getAttribute("data-id");
            const status = button.getAttribute("data-status");
            let changeStatus = status == "active" ? "inactive" : "active";
            const action = `${path}/${changeStatus}/${id}?_method=PATCH`;
            formChangeStatus.action = action;
            formChangeStatus.submit();
        });
    });
}

// Xóa sản phẩm vĩnh viễn
const buttonsHardDelete = document.querySelectorAll("[button-hard-delete]");
if (buttonsHardDelete.length > 0) {
    const formHardDelete = document.querySelector("[form-hard-delete]");
    const path = formHardDelete.getAttribute("path");
    buttonsHardDelete.forEach((button) => {
        button.addEventListener("click", () => {
            const id = button.getAttribute("data-id");
            const action = `${path}/${id}?_method=DELETE`
            formHardDelete.action = action;
            formHardDelete.submit();
        });
    });
}

// Khôi phục sản phẩm
const buttonsRecycle = document.querySelectorAll("[button-recycle]");
if (buttonsRecycle.length > 0) {
    const formRecycle = document.querySelector("[form-recycle]");
    const path = formRecycle.getAttribute("path");
    buttonsRecycle.forEach((button) => {
        button.addEventListener("click", () => {
            const id = button.getAttribute("data-id");
            const action = `${path}/${id}?_method=PATCH`;
            formRecycle.action = action;
            formRecycle.submit();
        });
    });
}