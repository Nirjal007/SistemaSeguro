// retailer.js
document.getElementById("order-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const product = document.getElementById("product").value;
    const material = document.getElementById("material").value;
    const quantity = document.getElementById("quantity").value;
    const retailerEmail = document.getElementById("retailer-email").value;

    fetch('/api/orders/place-order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            productName: product,
            productMaterial: material,
            quantity,
            retailerEmail
        })
    })
    .then(response => response.json())
    .then(data => {
        alert('Order placed successfully!');
        document.getElementById("order-table").innerHTML += `
            <tr>
                <td>${data.order._id}</td>
                <td>${data.order.productName}</td>
                <td>${data.order.quantity}</td>
                <td>${data.order.status}</td>
            </tr>
        `;
    })
    .catch(error => {
        console.log(error);
        alert('Error placing order.');
    });
});
