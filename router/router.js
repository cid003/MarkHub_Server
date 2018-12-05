import express from 'express';

// API controllers
import ProductController from './ProductController';
import accountController from './AccountController';

const ApiRouter = express.Router();

ApiRouter.post('/api/login', accountController.login);
//ApiRouter.get('/api/logOut', TODO);
ApiRouter.post('/api/createAccount', accountController.createAccount);
//ApiRouter.delete('/api/deleteAccount', TODO);
ApiRouter.post('/api/v1/createProduct', ProductController.createProduct);
ApiRouter.get('/api/v1/getProducts', ProductController.getProducts);

export default ApiRouter;