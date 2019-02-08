import React, { Component } from 'react';
import { storeProducts, detailProduct } from './data';
const ProductContext = React.createContext();
//PROVIDER
//CONSUMER

class ProductProvider extends Component {
     state = {
         product: [ ],
         detailProduct: detailProduct,
         cart: [ ],
         modalOpen: false,
         modalProduct: detailProduct,
         cartSubtotal: 0,
         cartTax: 0,
         cartShipping: 0,
         cartTotal: 0
     };
     componentDidMount() {
         this.setProducts();
     };
     setProducts = (id) => {
         let tempProducts = [];
         storeProducts.forEach(item => {
             const singleItem = { ...item };
             tempProducts = [...tempProducts, singleItem];
         });
         this.setState(( ) => {
             return { products: tempProducts };
         });
     };
     getItem = (id) => {
         const product = this.state.products.find(item => item.id === id);
             return product;
     };
     handleDetail = (id) => {
         const product = this.getItem( );
         this.setState(( ) => {
             return { detailProduct: product };
         });
     };
     addToCart = (id) => {
         let tempProducts = [...this.state.product];
         const index = tempProducts.indexOf(this.getItem(id));
         const product = tempProducts[index];
         product.inCart = true;
         product.count = 1;
         const price = product.price;
         product.total = price;
         this.setState(( ) => {
             return { product: tempProducts, cart: [...this.state.cart], product };
         }, ( ) => {this.addTotals( );}
        );
     };
     openModal = (id) => {
         const product = this.getItem(id);
         this.setState(( ) => {
             return { modalProduct: product, modalOpen: true};
         });
     };
     closeModal = (id) => {
         const product = this.getItem(id);
         this.setState(( ) => {
             return { modalProduct: product, modalOpen: false};
         });
     };
     incrementation = (id) => {
         let tempCart = [...this.state.cart];
         const selectedProduct = tempCart.find(item => item.id === id);
         const index = tempCart.indexOf(selectedProduct);
         const product = tempCart[index];
         product.count = product.count + 1;
         product.total = product.count * product.price;
         this.setState(( ) => {
             return {cart: [...tempCart]};
         }, ( ) => {this.addTotals( );}
        );
     };
     decrement = (id) => {
         let tempCart = [...this.state.cart];
         const selectedProduct = tempCart.find(item => item.id === id);
         const index = tempCart.indexOf(selectedProduct);
         const product = tempCart[index];
         product.count = product.count - 1;
         if (product.count === 0) {
              this.removeItem(id)
         } else {
             product.total = product.count * product.price;
             this.setState(( ) => {return {cart: [...tempCart] };
             }, ( ) => {this.addTotals( );}
         );
        }};
     removeItem = (id) => {
         let tempProducts = [...this.state.products];
         let tempCart = [...this.state.cart];
         tempCart = tempCart.filter(item => item.id !== id);
         const index = tempProducts.indexOf(this.getItem(id));
         let removedProduct = tempProducts[index];
         removedProduct.inCart = false;
         removedProduct.count = 0;
         removedProduct.total = 0;
         this.setState(( ) => {
             return {
                 cart: [...tempCart],
                 products: [...tempProducts]
             }, ( ) => {this.addTotals( );}
         );
     };
     clearCart = (id) => {
         this.setState(( ) => {return { cart: [] },  ( ) => {
         this.setProduct();
         this.addTotals( );
         );
     };
     addTotals = (id) => {
         let subTotal = 0;
         let total = [...this.state.cart];
         this.state.cart.map(item => (subTotal += item.total));
         const tempTax = subTotal * 0.0875;
         const totalShipping = total + 5;
         const finalTotal = subTotal + tax + totalShipping;
         this.setState(() => {
             return {
                 cartSubTotal: subTotal,
                 cartTax: tax,
                 shipping: totalShipping,
                 cartTotal: finalTotal
             };
         });
     };
     render() {
         return (
             <ProductContext.Provider
                 value={{
                 ...this.state,
                 handleDetail: this.handleDetail,
                 addToCart: this.addToCart,
                 openModal: this.openModal,
                 closeModal: this.closeModal,
                 incrementation: this.incrementation,
                 decrement: this.decrement,
                 removeItem: this.removeItem,
                 clearCart: this.clearCart
                 }}
             >
                 {this.props.children}
             </ProductContext.Provider>
         );
    };
};
const ProductConsumer = {Product.Context.Consumer};
export { ProductProvider, ProductConsumer};