import React from 'react'
import { useProductStore } from '../store/useProductStore'
import { useCartStore } from '../store/useCartStore'
import { EditIcon, Trash2Icon, ShoppingCartIcon } from "lucide-react";
import { Link } from "react-router-dom";
import toast from 'react-hot-toast';

function ProductCard({ product }) {
  const { deleteProducts } = useProductStore();
  const { addToCart } = useCartStore();

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
      {/* PRODUCT IMAGE */}
      <figure className="relative pt-[56.25%]">
        <img
          src={product.image}
          alt={product.name}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </figure>

      <div className="card-body">
        {/* PRODUCT INFO */}
        <h2 className="card-title text-lg font-semibold">{product.name}</h2>
        <p className="text-2xl font-bold text-primary">
          ${Number(product.price).toFixed(2)}
        </p>

                  {/* CARD ACTIONS */}
          <div className="card-actions justify-between mt-4">
            <button
              className="btn btn-sm btn-primary"
              onClick={handleAddToCart}
            >
              <ShoppingCartIcon className="size-4 mr-1" />
              Add to Cart
            </button>
            
            <div className="flex gap-1">
              <Link
                to={`/products/${product.id}`}
                className="btn btn-sm btn-info btn-outline"
              >
                <EditIcon className="size-4" />
              </Link>

              <button
                className="btn btn-sm btn-error btn-outline"
                onClick={() => deleteProducts(product.id)}
              >
                <Trash2Icon className="size-4" />
              </button>
            </div>
          </div>
      </div>
    </div>
  );
}

export default ProductCard