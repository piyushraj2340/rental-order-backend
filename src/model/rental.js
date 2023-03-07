const mongoose = require('mongoose');


const rentalSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    productCategory: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    noOfRatings: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    orderId: {
        type: String,
        required: true
    },
    orderDate: {
        type: Date,
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    customerPhone: {
        type: String,
        required: true
    },
    customerEmail: {
        type: String,
        required: true
    },
    customerAddress: {
        type: String,
        required: true
    },
    termsAndConditions: {
        type: Boolean,
        required: true
    }
})

const rental = new mongoose.model('rental', rentalSchema);

module.exports = rental;