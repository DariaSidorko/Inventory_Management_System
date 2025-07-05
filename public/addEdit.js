

import { enableInput, inputEnabled, message, setDiv, token } from "./index.js";
import { showProducts } from "./products.js";

let addEditDiv = null;
let name = null;
let category = null;
let price = null;
let quantity = null;
let minimum = null;
let addingProduct = null;

export const handleAddEdit = () => {
  addEditDiv = document.getElementById("edit-product");
  name = document.getElementById("product-name");
  category = document.getElementById("category");
  price = document.getElementById("price");
  quantity = document.getElementById("quantity");
  minimum = document.getElementById("minimum");
  addingProduct = document.getElementById("adding-product");
  const editCancel = document.getElementById("edit-cancel");

  addEditDiv.addEventListener("click", async (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
        if (e.target === addingProduct) {
            enableInput(false);
          
            let method = "POST";
            let url = "/api/v1/products";
          
            if (addingProduct.textContent === "update") {
              method = "PATCH";
              url = `/api/v1/products/${addEditDiv.dataset.id}`;
            }
          
            try {
              const response = await fetch(url, {
                method: method,
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  name: name.value,
                  category: category.value,
                  price: price.value,
                  quantity: quantity.value,
                  minimum: minimum.value,
                }),
              });
          
              const data = await response.json();
              if (response.status === 200 || response.status === 201) {
                if (response.status === 200) {

                  message.textContent = "The product entry was updated.";
                } else {

                  message.textContent = "The product entry was created.";
                }
          
                name.value = "";
                category.value = "";
                price.value = "";
                price.value = "";
                quantity.value = "";
                minimum.value = "";
                showProducts();
              } else {
                message.textContent = data.msg;
              }
            } catch (err) {
              console.log(err);
              message.textContent = "A communication error occurred.";
            }
            enableInput(true);
      } else if (e.target === editCancel) {
        message.textContent = "";
        showProducts();
      }
    }
  });
};

export const showAddEdit = async (productId) => {
    if (!productId) {
      name.value = "";
      category.value = "";
      price.value = "";
      quantity.value = "";
      minimum.value = "";
      addingProduct.textContent = "add";
      message.textContent = "";
  
      setDiv(addEditDiv);
    } else {
      enableInput(false);
  
      try {
        const response = await fetch(`/api/v1/products/${productId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
  
        const data = await response.json();
        if (response.status === 200) {
          name.value = data.product.name;
          category.value = data.product.category;
          price.value = data.product.price;
          quantity.value = data.product.quantity;
          minimum.value = data.product.minimum;
          addingProduct.textContent = "update";
          message.textContent = "";
          addEditDiv.dataset.id = productId;
          setDiv(addEditDiv);
        } else {

          message.textContent = "The product entry was not found";
          showProducts();
        }
      } catch (err) {
        console.log(err);
        message.textContent = "A communications error has occurred.";
        showProducts();
      }
  
      enableInput(true);
    }
  };