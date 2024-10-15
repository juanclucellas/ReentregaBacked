class CartDao { 
    constructor(model) {
        this.model = model;
    }

    async getCartById (cartId) {
        return await this.model.findById(cartId);
    }

    async addProductToCart (cartId, product) {
        return await this.model.findByIdAndUpdate (cartId, {$push: { products: product } });
    }

}

module.exports = CartDao; 