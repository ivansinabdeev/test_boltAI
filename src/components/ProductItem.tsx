import React, { useState } from 'react';
import { Edit2, Trash2, Eye, X, Check } from 'lucide-react';
import { Product } from '../types/Product';
import { useProducts } from '../context/ProductContext';

interface ProductItemProps {
  product: Product;
  onView: (product: Product) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onView }) => {
  const { updateProduct, deleteProduct } = useProducts();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(product);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleEdit = () => {
    setEditData(product);
    setIsEditing(true);
  };

  const handleSave = () => {
    updateProduct(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(product);
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: name === 'quantity' || name === 'price' ? Number(value) : value,
    }));
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    deleteProduct(product.id);
    setShowDeleteConfirm(false);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200 border-l-4 border-amber-500">
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={editData.name}
              onChange={handleChange}
              className="w-full px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Type</label>
            <input
              type="text"
              name="type"
              value={editData.type}
              onChange={handleChange}
              className="w-full px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={editData.quantity}
                onChange={handleChange}
                min="0"
                className="w-full px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Price ($)</label>
              <input
                type="number"
                name="price"
                value={editData.price}
                onChange={handleChange}
                min="0.01"
                step="0.01"
                className="w-full px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end mt-4 space-x-2">
          <button
            onClick={handleCancel}
            className="flex items-center px-2 py-1 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
          >
            <X size={16} className="mr-1" />
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center px-3 py-1 text-sm text-white bg-emerald-600 rounded-md hover:bg-emerald-700 transition-colors"
          >
            <Check size={16} className="mr-1" />
            Save
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200 border-l-4 border-blue-500">
      {showDeleteConfirm ? (
        <div className="space-y-3">
          <p className="font-medium text-red-600">Delete this product?</p>
          <p className="text-sm text-gray-600">This action cannot be undone.</p>
          
          <div className="flex justify-end space-x-2 mt-3">
            <button
              onClick={cancelDelete}
              className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="px-3 py-1 text-sm text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-gray-800 text-lg">{product.name}</h3>
              <p className="text-gray-600 text-sm">{product.type}</p>
            </div>
            <div className="flex space-x-1">
              <button 
                onClick={() => onView(product)}
                className="p-1 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                title="View details"
              >
                <Eye size={18} />
              </button>
              <button 
                onClick={handleEdit}
                className="p-1 text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded-full transition-colors"
                title="Edit product"
              >
                <Edit2 size={18} />
              </button>
              <button 
                onClick={handleDelete}
                className="p-1 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                title="Delete product"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
          
          <div className="mt-3 grid grid-cols-2 gap-x-2">
            <div className="mt-2">
              <p className="text-xs font-medium text-gray-500">QUANTITY</p>
              <p className="font-medium">
                {product.quantity > 0 ? (
                  product.quantity
                ) : (
                  <span className="text-red-600">Out of stock</span>
                )}
              </p>
            </div>
            
            <div className="mt-2">
              <p className="text-xs font-medium text-gray-500">PRICE</p>
              <p className="font-medium">${product.price.toFixed(2)}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductItem;