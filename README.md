# ChatterBox - A Simple Chat Application 💬

A simple chat application built using **Node.js**, **Express**, **MongoDB (Mongoose)**, and **EJS**.  
This project demonstrates **CRUD operations** for a chat system where users can create, read, update, and delete chat messages.

---

## 🚀 Features
- View all chats
- Create new chat messages
- Edit chat messages
- Delete chat messages
- Uses **EJS templating** for UI
- Connected to **MongoDB** with Mongoose
- RESTful routes with **method-override**

---

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Templating Engine:** EJS
- **Other:** Method-Override, Path

---

## 📂 Project Structure
```
.
├── models/
│   └── chat.js          # Mongoose schema for chat
├── views/
│   ├── index.ejs        # Show all chats
│   ├── new.ejs          # Create new chat form
│   └── edit.ejs         # Edit chat form
├── public/              # Static files (CSS, JS, images)
├── app.js               # Main server file
└── package.json
```

---

## ⚙️ Installation & Setup

1. Clone the repository  
```bash
git clone https://github.com/your-username/chatify.git
cd chatify
```

2. Install dependencies  
```bash
npm install
```

3. Start MongoDB (make sure it's running on your system)  
```bash
mongod
```

4. Run the app  
```bash
node app.js
```

5. Open in browser  
```
http://localhost:8080/chats
```

---

## 📌 Routes

| Method | Route           | Description         |
|--------|----------------|----------------------|
| GET    | /chats         | Show all chats       |
| GET    | /chats/new     | Show form to create  |
| GET    | /chats/:id     | Show chat data       |
| POST   | /chats         | Create new chat      |
| GET    | /chats/:id/edit| Edit chat message    |
| PUT    | /chats/:id     | Update chat message  |
| DELETE | /chats/:id     | Delete chat message  |

---

## 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📜 License
This project is licensed under the MIT License.
