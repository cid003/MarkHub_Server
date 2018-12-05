import Product from '../models/productModel';


class ProductController{
    //handles buying products and stocking products and displaying products
    createProduct(req, res) {
        const product = new Product();
        product.name = req.body.name;
        product.category = req.body.category;
        product.description = req.body.description;
        product.tags = req.body.tags;
        product.price = req.body.price;
        product.save(function(err) {
            if (err) {
                return res.json({ success: false, message: err });
            } else {
                return res.json( {success: true, message: 'product listing created' });
            }
        });
    }

    getProducts(req, res) {
        Product.find({}, (err, products) => {
            if (err) {
                return res.json({ success: false, message: err });
            } else {
                return res.json({success: true, message: products });
            }
        })
    }
}

const productController = new ProductController();
export default productController; 
