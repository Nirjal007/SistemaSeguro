$(document).ready(function() {
    // Sample data for orders and inventory
    const orders = [
        { orderId: 1, retailerName: 'Retailer A', product: 'Product X', quantity: 100, status: 'Pending' },
        { orderId: 2, retailerName: 'Retailer B', product: 'Product Y', quantity: 50, status: 'Shipped' },
        { orderId: 3, retailerName: 'Retailer C', product: 'Product Z', quantity: 200, status: 'Confirmed' }
    ];

    const inventory = [
        { productName: 'Product X', quantity: 500 },
        { productName: 'Product Y', quantity: 300 },
        { productName: 'Product Z', quantity: 1000 }
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
            </tr>
        `);
    });

    // Populate Inventory Table
    inventory.forEach(item => {
        $('#inventory-table').append(`
            <tr>
                <td>${item.productName}</td>
                <td>${item.quantity}</td>
                <td>
                    <button class="btn btn-warning btn-sm">Update</button>
                    <button class="btn btn-danger btn-sm">Delete</button>
                </td>
            </tr>
        `);
    });

    // Handle Product Upload Form Submission
    $('#upload-product-form').on('submit', function(e) {
        e.preventDefault();
        
        const productName = $('#product-name').val();
        const productDescription = $('#product-description').val();
        const productImage = $('#product-image').val();
        const supplierEmail = $('#supplier-email').val();

        // You would likely send this data to the server
        console.log('Product Uploaded:', productName, productDescription, productImage, supplierEmail);

        // Clear the form
        $('#upload-product-form')[0].reset();
    });
});
