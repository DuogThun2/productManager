// Lọc trạng thái sản phẩm
const btn = document.querySelectorAll("[button-status]");
btn.forEach((item) => {
    const url = new URL(window.location.href);
    item.addEventListener("click", () => {
        const status = item.getAttribute("button-status");
        if (status) {
            url.searchParams.set("status", status);
        }
        else {
            url.searchParams.delete("status");
        }
        window.location.href = url;
    })
});

// Tìm kiếm theo từ khóa
const formSearch = document.querySelector("#search-form");
if(formSearch) {
    const url = new URL(window.location.href);
    formSearch.addEventListener("submit", (e) => {
        e.preventDefault();
        if (e.target.elements.keyword.value) {
            url.searchParams.set("keyword", e.target.elements.keyword.value);
        }
        else {
            url.searchParams.delete("keyword");
        }

        window.location.href = url;
    });
};

// Phân trang sản phẩm
const pages = document.querySelectorAll("[data-page]");
if (pages) {
    const url = new URL(window.location.href);
    pages.forEach((item) => {
        item.addEventListener("click", () => {
            const page = item.getAttribute("data-page");
            if (page) {
                url.searchParams.set("page", page);
            }
            else{
                url.searchParams.delete("page");
            }
            window.location.href = url.href;
        })
    });
}

// Chọn tích ô 
const tableCheckboxMulti = document.querySelector("[table-checkbox-multi]");
if (tableCheckboxMulti) {
    const checkboxAll = tableCheckboxMulti.querySelector("input[name='select-checkbox-all']");
    const checkboxes = tableCheckboxMulti.querySelectorAll("input[id='select-checkbox']");
    checkboxAll.addEventListener("click", () => {
        if (checkboxAll.checked) {
            checkboxes.forEach((item) => {
                item.checked = true;
            })
        }
        else {
            checkboxes.forEach((item) => {
                item.checked = false;
            })
        }
    });
    checkboxes.forEach((item) => {
        item.addEventListener("click", () => {
            const countChecked = tableCheckboxMulti.querySelectorAll("input[id='select-checkbox']:checked");
            if (countChecked.length == checkboxes.length) {
                checkboxAll.checked = true;
            }
            else {
                checkboxAll.checked = false;
            }
        });
    });
};

// Thay đổi trạng thái nhiều sản phẩm
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
    formChangeMulti.addEventListener("submit", (e) => {
        e.preventDefault();
        const typeChange = e.target.elements.type.value;
        const tableCheckboxMulti = document.querySelector("[table-checkbox-multi]");
        const countChecked = tableCheckboxMulti.querySelectorAll("input[id='select-checkbox']:checked");
        if (typeChange == "delete-all") {
            const isConfirm = confirm("Bạn chắc chắn muốn xóa?");

            if (!isConfirm) return;
        }
        if (countChecked.length > 0) {
            let ids = [];
            countChecked.forEach((item) => {
                if (typeChange == "change-position") {
                    const position = item.closest("tr").querySelector("input[name='position']").value;
                    ids.push(`${item.value}-${position}`);
                }
                else {
                    ids.push(item.value);
                }
            });
            const formInput = formChangeMulti.querySelector("input[name='ids']");
            formInput.value = ids.join(", ");
            formChangeMulti.submit();
        }
        else {
            alert("Vui lòng chọn ít nhất một sản phẩm để thay đổi trạng thái.");
        }
    });
};