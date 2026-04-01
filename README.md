# 🛒 E-Commerce Web Application (Wynk Shop)

A full-featured E-Commerce web application built using the MERN stack, simulating a real-world online shopping experience with product browsing, cart management, checkout flow, and order handling.

---
## 🌐 Experience the application live: [Wynk Shop](https://e-commerce-app-level-one.vercel.app/)
---

## 📍 Features

### User Features
- Browse products by category
- View detailed product pages
- Add/remove items from cart
- Update product quantity
- Address management (Add/Edit/Delete)
- Checkout and place orders
- View order history

### Cart & Checkout
- Global cart state using Context API
- Real-time price calculation
- Discount & delivery charge handling
- Address selection during checkout

### Core Functionalities
- Dynamic routing using React Router
- Reusable components (ProductCard, CartItem, etc.)
- Clean and scalable folder structure
- Responsive UI for all devices

---

## 📍 Tech Stack

### Frontend
- React.js
- Context API (State Management)
- React Router DOM
- Bootstrap

### Backend
- Node.js
- Express.js
- MongoDB
---

## 📍 Environment Setup

### Backend `.env`

```env
MONGODB= mongodb+srv://04bhaskarbiswas_db_user:GDZtmPzt12c4qFDD@neog.4feyuvb.mongodb.net/?retryWrites=true&w=majority&appName=neoG
```
---

## 📍 Application Flow
1. User browses products
2. Adds products to cart
3. Updates quantity or removes items
4. Proceeds to checkout
5. Selects/creates address
6. Places order
7. Order stored and displayed in order history

---

## 📍 Key Concepts Implemented

- Global State Management using Context API
- Component Reusability
- Dynamic Routing
- Data-driven UI Rendering

---

## Installation & Setup

```bash
# Clone the repository
git clone https://github.com/bhaskarbiswas04/E-commerce-app-LevelOne.git

# Navigate to project folder
cd ecommerce-app

# Install dependencies
npm install

# Run the app
npm run dev
```

---

## 📍 API Documentation

###  Products

#### GET /products

Retrieves all products or filtered products based on query parameters.

**Sample Response:**

```json
[
  {
    "_id": "product_Id",
    "name": "Mens Leather Shoe",
    "price": "4900",
    "image": "image_url",
    "rating": "4.5",
    "category": "Mens",
  }
]
```

---

#### GET /products/:id

Retrieves a single product by ID.

**Sample Response:**

```json
  {
    "_id": "product_Id",
    "name": "Mens Leather Shoe",
    "price": "4900",
    "image": "image_url",
    "rating": "4.5",
    "category": "Mens",
  }
```

---

###  Categories

#### GET /categories

Retrieves all categories or filtered categories.

**Sample Response:**

```json
[
  {
"_id": "category_id",
"title": "Men",
"imageUrl": "https://cdn.pixabay.com/photo/2024/11/08/05/28/man-9182458_1280.jpg",
"__v": 0
}
]
```

---

#### GET /categories/:id

Retrieves a single category by ID.

**Sample Response:**

```json
  {
"id": category_id,
"title": "Men",
"imageUrl": "https://cdn.pixabay.com/photo/2024/11/08/05/28/man-9182458_1280.jpg",
"__v": 0
  }
```

---

## 📍 Screenshots
<img width="1910" height="792" alt="WynkShop_Wishlist" src="https://github.com/user-attachments/assets/f8fb4862-d5af-4d46-9fbc-b9847d8d97a5" />
<img width="1897" height="868" alt="WynkShop_ProfilePage" src="https://github.com/user-attachments/assets/a5517940-de1f-4975-a2f9-735eb8583cc8" />
<img width="1918" height="853" alt="WynkShop_Homepage" src="https://github.com/user-attachments/assets/a7711b5a-0140-4a93-8ac5-ad1b60cc20ac" />
<img width="1916" height="862" alt="WynkShop_CheckoutPage" src="https://github.com/user-attachments/assets/179b0ea2-59d4-4210-ba97-33c31a35618d" />
<img width="1905" height="857" alt="WynkShop_CartPage" src="https://github.com/user-attachments/assets/c4a0a051-e914-4590-a8c6-d457429dc3a0" />

---

## Author

**Bhaskar Biswas**

* GitHub: https://github.com/bhaskarbiswas04
* LinkedIn: https://www.linkedin.com/in/bhaskarb04/
