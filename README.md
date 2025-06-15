# Blogging API

- A simple Restful API built using **Node.js**, **Express**, **Prisma**, and **PostgreSQL**.
- This Api enables basic user and blog post management including user creation, retrieval, and blog posts

  ***

## Technologies Used

- **Node.js** — JavaScript runtime environment
- **Express.js** — Web framework for building RESTful APIs
- **Prisma ORM** — Database toolkit for querying and manipulating data
- **PostgreSQL** — Relational database
- **JSON** — For sending and receiving data in HTTP requests

---

---

## API Endpoints

### Root

#### `GET /`

- Returns a welcome message.

---

## Users Endpoints

### `GET /users`

- **Description**: Fetch all users.
- **Response**:

```json
[
  {
    "id": "1",
    "firstName": "John",
    "lastName": "Doe",
    "emailAddress": "john@example.com",
    "username": "johndoe"
  }
]
```

---

### `GET /users/:id`

- **Description**: Fetch a specific user by ID.
- **Example**: `/users/1`
- **Response**:

```json
{
  "id": "1",
  "firstName": "John",
  "lastName": "Doe",
  "emailAddress": "john@example.com",
  "username": "johndoe"
}
```

---

### `POST /users`

- **Description**: Create a new user.
- **Request Body**:

```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "emailAddress": "jane@example.com",
  "username": "janedoe"
}
```

- **Response**:

```json
{
  "id": "2",
  "firstName": "Jane",
  "lastName": "Doe",
  "emailAddress": "jane@example.com",
  "username": "janedoe"
}
```

---

## Posts Endpoints

### `GET /posts`

- **Description**: Retrieve all non-deleted posts.
- **Response**:

```json
[
  {
    "id": "1",
    "title": "My First Post",
    "content": "This is the content.",
    "userId": "1",
    "isDeleted": false
  }
]
```

---

### `GET /posts/:id`

- **Description**: Get a specific post by ID.
- **Example**: `/posts/1`
- **Response**:

```json
{
  "id": "1",
  "title": "My First Post",
  "content": "This is the content.",
  "userId": "1",
  "isDeleted": false
}
```

---

### `POST /posts`

- **Description**: Create a new post.
- **Request Body**:

```json
{
  "title": "New Post",
  "content": "Post content here...",
  "userId": "1"
}
```

- **Response**:

```json
{
  "id": "2",
  "title": "New Post",
  "content": "Post content here...",
  "userId": "1",
  "isDeleted": false
}
```

---

### `PUT /posts/:id`

- **Description**: Update a specific post's title and content.
- **Request Body**:

```json
{
  "title": "Updated Post Title",
  "content": "Updated content"
}
```

- **Response**:

```json
{
  "id": "2",
  "title": "Updated Post Title",
  "content": "Updated content",
  "userId": "1",
  "isDeleted": false
}
```

---

### `PATCH /posts/:id`

- **Description**: Soft delete a post by setting `isDeleted: true`.
- **Response**:

```json
{
  "id": "2",
  "title": "Updated Post Title",
  "content": "Updated content",
  "userId": "1",
  "isDeleted": true
}
```

---

## Setup Instructions

1. **Clone the repository**

```bash
   git clone <your-repo-url>
   cd <your-project-folder>
```

2. **Install dependencies**

```bash
   npm install
```

3. **Setup environment variables**

   - Create a `.env` file and add:

```
     DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
     PORT=5500
```

4. **Prisma setup**

```bash
   npx prisma init
   npx prisma migrate dev --name init
```

5. **Run the server**

```bash
   npm start
```

---

## Sample cURL Request

```bash
curl -X POST http://localhost:5500/users \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Alice","lastName":"Smith","emailAddress":"alice@example.com","username":"alicesmith"}'
```

---
