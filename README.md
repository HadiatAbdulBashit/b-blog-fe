# 📝 B-Blog FE Documentation

## 📌 Project Overview

This is the **frontend** of a blog application, built with **React, TypeScript, SWR, and ShadCN**. It allows users to browse, search, sort, and interact with blog posts and comments.

## 🛠 Tech Stack

- **React** – UI framework
- **TypeScript** – Type safety
- **SWR** – Data fetching & caching
- **ShadCN** – UI components
- **Redux** – State management (for authentication)
- **React Hook Form** – Form validation
- **Axios** – HTTP requests
- **Date-fns** – Date formatting

---

## 🚀 Features

✅ **View all posts** with search and sorting  
✅ **Pagination** for post listing  
✅ **View post details** with comments  
✅ **Authentication** (Login/Register)  
✅ **Create, edit, and delete comments**  
✅ **Optimistic UI updates** using SWR  
✅ **Dark mode**

---

## 🔧 Installation

### 1️⃣ Clone the repository

```sh
git clone https://github.com/HadiatAbdulBashit/b-blog-fe.git
cd b-blog-fe
```

### 2️⃣ Install dependencies

```sh
npm install
# or
yarn install
# or
bun add
```

### 3️⃣ Set up environment variables

Create a **.env** file in the root directory and add:

```sh
VITE_API_BASE_URL=<your_be_url> #ex: "http://localhost:3000/v1"
```

### 4️⃣ Start the development server

```sh
npm run dev
# or
yarn dev
# or
bun dev
```

---

## 📂 Folder Structure

```
📦 src
 ┣ 📂 apis          # API calls (e.g., PostApi, CommentApi)
 ┣ 📂 components    # Reusable UI components
 ┣ 📂 pages         # Page components (Home, Post Details, Login, etc.)
 ┣ 📂 layout        # Reusable layout
 ┣ 📂 redux         # Redux store & slices (auth, posts)
 ┣ 📂 hooks         # Custom hooks for fetching & mutation
 ┣ 📂 types         # TypeScript interfaces
```

---

---

## 📩 Contact

For any issues or contributions, please create an issue or a pull request in the repository.

## 📸 UI Screenshots

![Screenshot B-Blog FE](/documentation/image.png)

## Info

- This project is already integrated with https://github.com/HadiatAbdulBashit/b-blog-be
