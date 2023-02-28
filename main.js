const API = "http://localhost:3000/products"
const tbody = document.querySelector("tbody");
fetch(API)
    .then(response => response.json())
    .then(data => {
        showProduct(data)
        const btnRemove = document.querySelectorAll(".btn-remove");
        for (const btn of btnRemove) {
            const id = btn.dataset.id;
             btn.addEventListener("click", function () {
                const request = confirm("ban co chac chan muon xoa no")
                if(request) {
                    return removeProduct(id)
                }
            })
        }
        const btnAdd = document.querySelector("#btn-add");
        btnAdd.addEventListener("click", function () {
            return addProduct()
        })
        const btnUpdate = document.querySelectorAll(".btn-update");
        // console.log(btnUpdate);
        for(const btn of btnUpdate){
            const id = btn.dataset.id;
            btn.addEventListener("click", function(){
                // console.log(id);
                
                return updateProduct(id)
                
            })
        }
    })

const showProduct = (data) => {
    tbody.innerHTML = data.map((product, index) => {
        return `
            <tr>
                <td>${index + 1}</td>
                <td>${product.productName}</td>
                <td>
                    <img width="150px" src="${product.image}" alt="">
                </td>
                <td>
                    <button data-id="${product.id}" class="btn btn-danger btn-remove">Xóa</button>
                    <button data-id="${product.id}" class="btn btn-success btn-update">Sửa</button>
                </td>
            </tr>
        `

    }).join("")
}
const removeProduct = (id) => {
    fetch(API+`/${id}`, { method: "DELETE" })
        .then(response => response.json())
        .then(data => { })   
}
const addProduct = () => {
    document.querySelector("body").innerHTML = ` 
        <div class="container">
            <form >
                <div class="mb-3">
                    <label for="" class="form-label">Tên sản phẩm</label>
                    <input id="productName" class="form-control" type="text">
                </div>
                <div class="mb-3">
                    <label for="" class="form-label">Ảnh sản phẩm</label>
                    <input id="image" class="form-control" type="text">
                </div>
                <button class="btn btn-primary btn-submit" >Submit</button>
            </form>
        </div>
    `
    document.querySelector(".btn-submit").addEventListener("click", function () {
        const newProdut = {
            "productName":document.querySelector("#productName").value,
            "image":document.querySelector("#image").value
        }
        fetch(API,{
            method: "POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(newProdut)
        })
    })

}
const updateProduct = (id) => {
    fetch(API+`/${id}`)
    .then(response => response.json())
    .then(data => {
        document.querySelector("body").innerHTML = ` 
        <div class="container">
            <form >
                <div class="mb-3">
                    <label for="" class="form-label">Tên sản phẩm</label>
                    <input value="${data.productName}" id="productName" class="form-control" type="text">
                </div>
                <div class="mb-3">
                    <label for="" class="form-label">Ảnh sản phẩm</label>
                    <input value="${data.image}" id="image" class="form-control" type="text">
                </div>
                <button class="btn btn-primary btn-edit" >Update</button>
            </form>
        </div>
    `
    document.querySelector(".btn-edit").addEventListener("click", function () {
        const newProdut = {
            "id" :id,
            "productName":document.querySelector("#productName").value,
            "image":document.querySelector("#image").value
        }
        fetch(API+`/${id}`,{
            method: "PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(newProdut)
        })
        alert("Success")
    })
    

})
}
