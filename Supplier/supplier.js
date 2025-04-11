// supplier.js
document.addEventListener("DOMContentLoaded", function() {
    fetch('/api/orders/pending-orders')
        .then(response => response.json())
        .then(orders => {
            if (orders.length === 0) {
                alert("No pending orders available.");
                return;
            }

            orders.forEach(order => {
                document.getElementById("retailer-requests-table").innerHTML += `
                    <tr>
                        <td>${order._id}</td>
                        <td>${order.retailerEmail}</td>
                        <td>${order.productName}</td>
                        <td>${order.quantity}</td>
                        <td>${order.status}</td>
                        <td>
                            <button onclick="updateOrderStatus('${order._id}', 'Accepted')">Accept</button>
                            <button onclick="updateOrderStatus('${order._id}', 'Rejected')">Reject</button>
                        </td>
                    </tr>
                `;
            });
        })
        .catch(error => {
            console.error(error);
            alert("Error fetching pending orders.");
        });
});

// Update Order Status (Accept/Reject)
function updateOrderStatus(orderId, status) {
    fetch('/api/orders/update-order-status', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId, status, supplierEmail: 'supplier@example.com' })
    })
    .then(response => response.json())
    .then(data => {
        alert(`Order ${status}`);
        location.reload();
    })
    .catch(error => {
        console.error(error);
        alert("Error updating order status.");
    });
}
