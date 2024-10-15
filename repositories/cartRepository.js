class CartRepository {
  constructor(cartModel) {
      this.cartModel = cartModel;
  }

  async getCartById(cartId) {
      return await this.cartModel.findById(cartId).populate('products');
  }

  async addProductToCart(cartId, product) {
      return await this.cartModel.findByIdAndUpdate(
          cartId, 
          { $push: { products: product } },
          { new: true }
      );
  }
}

module.exports = CartRepository;
