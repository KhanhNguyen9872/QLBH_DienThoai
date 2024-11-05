const API_URL = "http://192.168.1.51:5000";

export default {
    getAPI_URL() {
        return API_URL;
    },
  // Get all products
  async getAllProducts() {
    try {
      const response = await fetch(`${API_URL}/product`);
      if (!response.ok) throw new Error("Failed to fetch products");
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching products:", error);
      return { success: false, error: error.message }; // Return an object with error
    }
  },

  // Get a single product by ID
  async getProduct(productId) {
    try {
      const response = await fetch(`${API_URL}/product/?id=${productId}`);
      if (!response.ok) throw new Error(`Failed to fetch product with ID ${productId}`);
      const data = await response.json();
      console.log(data[0]);
      return data[0];
    } catch (error) {
      console.error(error);
    }
  },

  // Modify a product by ID
  async modifyProduct(productId, updatedProduct) {
    try {
      const response = await fetch(`${API_URL}/product/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });
      if (!response.ok) throw new Error(`Failed to update product with ID ${productId}`);
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  },

  // Add a new user
  async addUser(newUser) {
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      if (!response.ok) throw new Error("Failed to add user");
      return await response.json();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  },

  // Get a user by username
  async getUser(username, password) {
    try {
      const response = await fetch(`${API_URL}/users?username=${username}&password=${password}`);
      if (!response.ok) throw new Error(`Failed to fetch user`);
      const users = await response.json();

      return users.length > 0 ? users[0] : null; // Return the first user found or null if none
    } catch (error) {
      console.error(error);
    }
  },

  // Add a product to the cart
  async addProductToCart(userId, productId, quantity) {
    try {
      const response = await fetch(`${API_URL}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          productId,
          quantity,
        }),
      });
      if (!response.ok) throw new Error("Failed to add product to cart");
      return await response.json();
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  },

  // Modify a product in the cart by ID
  async modifyProductInCart(cartId, updatedQuantity) {
    try {
      const response = await fetch(`${API_URL}/cart/${cartId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quantity: updatedQuantity,
        }),
      });
      if (!response.ok) throw new Error(`Failed to modify cart item with ID ${cartId}`);
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  },

  // Delete a product from the cart by ID
  async deleteProductFromCart(cartId) {
    try {
      const response = await fetch(`${API_URL}/cart/${cartId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error(`Failed to delete cart item with ID ${cartId}`);
      return await response.json(); // Usually, it will return an empty object
    } catch (error) {
      console.error(error);
    }
  },

  // Get a cart by UserID
  async getCartItemsByUserId(userId) {
    try {
      const response = await fetch(`${API_URL}/cart?userId=${userId}`);
      if (!response.ok) throw new Error(`Failed to fetch cart items for user ID ${userId}`);
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  },
};