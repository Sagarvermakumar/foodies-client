# 🚀 Zayka Express – Client (Customer App)

Zayka Express Client is the **customer-facing food delivery web app** built with **React.js**.  
Customers can browse outlets, explore menus, place orders, track deliveries in real-time, and enjoy a smooth food ordering experience.

---

## ✨ Features

### 👤 Customer Features

- Secure **Signup/Login/login with otp/forget password** (Email, Phone, OTP).
- Profile management with avatar upload.
- Manage multiple addresses with **Geo API & Pincode**.
- Browse **multiple outlets** with timings & availability.
- Explore **categories & menus** with:
  - Veg / Non-Veg / Stock availability.
  - Discounts & offers.
  - Organized category-wise view.
- Add to cart, update, and remove items.
- Apply **coupons & offers** at checkout.
- Place & track orders (Placed → Preparing → Out for Delivery → Delivered).
- Cancel orders & initiate refund.
- Quick **Repeat Order** option.
- Download **Invoice (PDF/CSV)**.
- Post **ratings & reviews** for items.
- Get **push notifications** (order updates, offers, rewards).

---

## 🛠 Tech Stack

- **Frontend:** React.js  
- **UI Framework:** Chakra UI / Material UI  
- **State Management:** Redux Toolkit  
- **Form Handling & Validation:** Formik + Yup  
- **Image Handling:** Multer + Cloudinary (via backend APIs)  
- **Utilities:** Lodash  
- **SEO & Metadata:** React Helmet Async  
- **Notifications:** React Toastify  
- **Auth:** JWT + Role-based Access (via backend)  
- **API Integration:** Axios (REST API calls to Node.js + Express backend)  
- **Database:** MongoDB (via backend)  


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

## `VITE_API_BASE_URL`

## 🚀 Getting Started

```bash
git clone https://github.com/Sagarvermakumar/foodies-client.git
cd foodies-client
npm install
npm start
```
