const filter = (query) => {
    const filter = [
        {
            label: "Tất cả",
            class: "",
            status: ""
        },
        {
            label: "Hoạt động",
            class: "",
            status: "active"
        },
        {
            label: "Dừng hoạt động",
            class: "",
            status: "inactive"
        }
    ]
    const status = query.status;
    filter.forEach((item) => {
        if(status && item.status == status) {
            item.class = "active";
        }
        else if (!status && item.status == "") {
            item.class = "active";
        }
    });
    return filter;
}

module.exports = filter;