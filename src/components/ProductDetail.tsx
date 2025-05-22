import React from 'react';
import { X } from 'lucide-react';
import { Product } from '../types/Product';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onClose }) => {
  return (
    <div className="relative p-6">
      <button
        onClick={onClose}
        className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition-colors"
      >
        <X size={20} />
      </button>
      
      <h2 className="text-2xl font-bold text-gray-800 mb-6 pr-8">Product Details</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500">PRODUCT NAME</h3>
          <p className="text-lg font-medium text-gray-900">{product.name}</p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-500">PRODUCT TYPE</h3>
          <p className="text-lg text-gray-900">{product.type}</p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-500">QUANTITY IN STOCK</h3>
          <p className={`text-lg ${product.quantity === 0 ? 'text-red-600 font-medium' : 'text-gray-900'}`}>
            {product.quantity === 0 ? 'Out of stock' : product.quantity}
          </p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-500">PRICE</h3>
          <p className="text-lg text-gray-900">${product.price.toFixed(2)}</p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-500">PRODUCT ID</h3>
          <p className="text-sm text-gray-500">{product.id}</p>
        </div>
      </div>
      
      <div className="border-t border-gray-200 mt-6 pt-4">
        <p className="text-sm text-gray-500">
          {product.quantity > 0 ? (
            <>
              <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
              In Stock
            </>
          ) : (
            <>
              <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-2"></span>
              Out of Stock
            </>
          )}
        </p>
      </div>
      
      <button
        onClick={onClose}
        className="mt-6 w-full py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
      >
        Close
      </button>
    </div>
  );
};

export default ProductDetail;