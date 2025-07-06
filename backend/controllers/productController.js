import { sql } from "../config/db.js";

export const getProducts = async (req, res) => {
  try {
    const products = await sql`
         SELECT * FROM products
         ORDER BY created_at DESC
        `;

    console.log("Fetched products: ", products);
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("Error in getProducts: ", error);
    res.status(500).json({ success: false, message: error.message });
  }
}; // function to display all products

export const createProduct = async (req, res) => {
  const { name, price, image } = req.body; // this is because u had added express.json() previously

  if (!name || !image || !price) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const newProduct = await sql`
         INSERT INTO products (name,price,image)
         VALUES (${name},${price},${image})
         RETURNING *
        `;

    console.log("New product added : ", newProduct);

    res.status(201).json({ success: true, data: newProduct[0] });
  } catch (error) {
    console.log("Error in createProduct: ", error);
    res.status(500).json({ success: false, message: error.message });
  }
}; // function to create a product

export const deleteProduct = async (req, res) => {
    const {id} = req.params;

    try {
        const deletedProduct = await sql`
         DELETE FROM products WHERE id=${id} RETURNING *
        `;

        if(deletedProduct.length===0){
            return res.status(404).json({
                success:false,
                message:"Product Not Found lol"
            });
        }

        res.status(200).json({success:true, data:deletedProduct[0]});
    } catch (error) {
        console.log("Error in deleteProduct: ", error);
        res.status(500).json({success:false, message:"Internal Server Error"})
    }
}; // function to delete a product

export const updateProduct = async (req, res) => {
    const {id} = req.params;
    const {name,image,price} = req.body;

    try {
        const updatedProduct = await sql`
         UPDATE products
         SET name=${name}, price=${price}, image=${image}
         WHERE id=${id}
         RETURNING *
        `;

        if(updatedProduct.length===0){
            return res.status(404).json({
                success:false,
                message:"Product not found"
            });
        }

        res.status(200).json({status:true, data:updatedProduct[0]});
    } catch (error) {
        console.log("Error in updateProduct: ", error);
        res.status(500).json({success:false, message:"Internal Server Error"})
    }
}; // function to edit a product

export const getProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await sql`
     SELECT * FROM products WHERE id=${id}
    `;

    res.status(200).json({ success: true, data: product[0] });
  } catch (error) {
    console.log("Error in getProduct, the specific one: ", error);
    res.status(500).json({ success: false, message: error.message });
  }
}; // function to display a  specific product
