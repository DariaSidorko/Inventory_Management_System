
import {
    inputEnabled,
    setDiv,
    message,
    setToken,
    token,
    enableInput,
  } from "./index.js";
  import { showLoginRegister } from "./loginRegister.js";
  import { showAddEdit } from "./addEdit.js";
  
  let productsDiv = null;
  let productsTable = null;
  let productsTableHeader = null;
  
  
  export const handleProducts = () => {
    console.log("Running handle products")
    productsDiv = document.getElementById("products");
    const logoff = document.getElementById("logoff"); 
    const addProduct = document.getElementById("add-product");
    productsTable = document.getElementById("products-table");
    productsTableHeader = document.getElementById("products-table-header");
  

    const filterSelect = document.getElementById("category-filter");
      if (filterSelect) {
        filterSelect.addEventListener("change", showProducts);
      }

    productsDiv.addEventListener("click", async (e) => {
      if (inputEnabled && e.target.nodeName === "BUTTON") {
        if (e.target === addProduct) {
          showAddEdit(null);
        } else if (e.target === logoff) {
            setToken(null);
    
            message.textContent = "You have been logged off.";
    
            productsTable.replaceChildren([productsTableHeader]);
    
            showLoginRegister();
        } else if (e.target.classList.contains("editButton")) {
            message.textContent = "";
            showAddEdit(e.target.dataset.id);
          } else if (e.target.classList.contains("deleteButton")) {
            const id = e.target.dataset.id;
            if (!id) return;
    
            enableInput(false);
            message.textContent = "Deleting...";
    
            try {
              const res = await fetch(`/api/v1/products/${id}`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              });

              const contentType = res.headers.get("content-type");

              if (contentType && contentType.includes("application/json")) {
    
                const result = await res.json();
    
                if (res.ok) {
                  message.textContent = "Product deleted successfully.";
                  showProducts(); // Refresh the product list
                } else {
                  message.textContent = result.msg || "Failed to delete the product.";
                }

              } else {
                const errorText = await res.text(); 
                message.textContent = `Server error: ${errorText}`;
              }

            } catch (err) {
              console.error(err);
              message.textContent = "An error occurred while deleting the product.";
            }
    
            enableInput(true);
        }
      }
    });
  };
  
  export const showProducts = async () => {
    try {
      enableInput(false);
  
      const response = await fetch("/api/v1/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      const data = await response.json();
      let children = [productsTableHeader];
  
      if (response.status === 200) {
        
        if (data.count === 0) {
          productsTable.replaceChildren(...children); 
        } else {

          const filterSelect = document.getElementById("category-filter");
          const filterCategory = filterSelect?.value?.trim().toLowerCase() || "all";

          for (let i = 0; i < data.products.length; i++) {

            let rowEntry = document.createElement("tr");
            
            if (data.products[i].quantity <= data.products[i].minimum){
              rowEntry.classList.add("minimum");
            } 

            // Sort by category ascending
            data.products.sort((a, b) => {
              const categoryA = a.category?.toLowerCase() || '';
              const categoryB = b.category?.toLowerCase() || '';
              const categoryComparison = categoryA.localeCompare(categoryB);
            
              if (categoryComparison !== 0) return categoryComparison;
            });

            if ( filterCategory !== "all" && data.products[i].category?.trim().toLowerCase() !== filterCategory.toLowerCase() ) {
              continue;
            }
            let editButton = `<td><button type="button" class="editButton" data-id=${data.products[i]._id}>edit</button></td>`;
            let deleteButton = `<td><button type="button" class="deleteButton" data-id=${data.products[i]._id}>delete</button></td>`;
            let rowHTML = `
              <td>${data.products[i].name}</td>
              <td>${data.products[i].category}</td>
              <td>${data.products[i].price}</td>
              <td>${data.products[i].quantity}</td>
              <td>${data.products[i].minimum}</td>
              <td>${editButton}${deleteButton}</td>`;
  
            rowEntry.innerHTML = rowHTML;
            children.push(rowEntry);
          }
          productsTable.replaceChildren(...children);
        }
      } else {
        message.textContent = data.msg;
      }
    } catch (err) {
      console.log(err);
      message.textContent = "A communication error occurred.";
    }
    enableInput(true);
    setDiv(productsDiv);
  };