function save(e) {
    e.preventDefault();
    const price = e.target.price.value;
    const product = e.target.product.value;
    const category = e.target.category.value;

    const proObj = {
        price,
        product,
        category
    };

    axios
        .post("https://crudcrud.com/api/8d72dffb23884b4f99155543d4605e1a/AdminPage", proObj)
        .then((res) => {
            showAdminDetails(res.data);
            e.target.reset();
        })
        .catch((err) => console.log(err));
}

function deleteOrderDetails(userId, listItem) {
    axios.delete(`https://crudcrud.com/api/8d72dffb23884b4f99155543d4605e1a/AdminPage/${userId}`)
        .then(() => {
            const list = document.getElementById('EleProduct');
            list.removeChild(listItem);
        })
        .catch((err) => console.error(err));
}

function editOrderDetails(userId, listItem) {
    axios.put(`https://crudcrud.com/api/8d72dffb23884b4f99155543d4605e1a/AdminPage/${userId}`)
        .then(() => {
            const list = document.getElementById('EleProduct');
            list.removeChild(listItem);
        })
        .catch((err) => console.error(err));
}



function showAdminDetails(sellerObj) {
    const list = document.getElementById('EleProduct');
    const listItem = document.createElement('li');
    listItem.textContent = `${sellerObj.price} - ${sellerObj.product} - ${sellerObj.category}`;
    const deleteOrderbutton = document.createElement('button');
    deleteOrderbutton.textContent = "Delete Order";
    deleteOrderbutton.onclick = () => deleteOrderDetails(sellerObj._id, listItem);
   
    listItem.appendChild(deleteOrderbutton);
   
    list.appendChild(listItem);
}

window.addEventListener('DOMContentLoaded', () => {
    const form1 = document.getElementById('seller');
    form1.addEventListener('submit', save);
    axios
        .get("https://crudcrud.com/api/8d72dffb23884b4f99155543d4605e1a/AdminPage")
        .then((res) => {
            console.log(res.data);
            for (let i = 0; i < res.data.length; i++) {
                showAdminDetails(res.data[i]);
            }
        })
        .catch((err) => console.log(err));
});
