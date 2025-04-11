$(document).ready(function() {
    // Sample data for retailer orders and deliveries
    const orders = [
        { orderId: 1, retailerName: 'Retailer A', product: 'Product X', quantity: 100, status: 'Pending' },
        { orderId: 2, retailerName: 'Retailer B', product: 'Product Y', quantity: 50, status: 'Shipped' },
        { orderId: 3, retailerName: 'Retailer C', product: 'Product Z', quantity: 200, status: 'Delivered' }
    ];

    const deliveries = [
        { orderId: 1, retailerName: 'Retailer A', product: 'Product X', quantity: 100, deliveryStatus: 'Pending' },
        { orderId: 2, retailerName: 'Retailer B', product: 'Product Y', quantity: 50, deliveryStatus: 'Shipped' },
        { orderId: 3, retailerName: 'Retailer C', product: 'Product Z', quantity: 200, deliveryStatus: 'Delivered' }
    ];

    // Populate Orders Table
    orders.forEach(order => {
        $('#orders-table').append(`
            <tr>
                <td>${order.orderId}</td>
                <td>${order.retailerName}</td>
                <td>${order.product}</td>
                <td>${order.quantity}</td>
                <td>${order.status}</td>
                <td>
                    <button class="btn btn-info btn-sm">View</button>
                    <button class="btn btn-warning btn-sm">Update</button>
                </td>
            </tr>
        `);
    });

    // Populate Delivery Tracking Table
    deliveries.forEach(delivery => {
        $('#delivery-tracking-table').append(`
            <tr>
                <td>${delivery.orderId}</td>
                <td>${delivery.retailerName}</td>
                <td>${delivery.product}</td>
                <td>${delivery.quantity}</td>
                <td>${delivery.deliveryStatus}</td>
            </tr>
        `);
    });

    // Handle Shipment Status Update Form Submission
    $('#shipment-form').on('submit', function(e) {
        e.preventDefault();

        const orderId = $('#order-id').val();
        const shipmentStatus = $('#shipment-status').val();

        // You would likely send this data to the server
        console.log('Shipment Status Updated:', orderId, shipmentStatus);

        // Clear the form
        $('#shipment-form')[0].reset();
    });
});
