# APSIT Canteen Backend

## Prerequisites
- Java 17 or higher
- Maven
- MySQL Server

## Setup Instructions

### 1. Install MySQL
Download and install MySQL from: https://dev.mysql.com/downloads/installer/

### 2. Start MySQL Server
```bash
# Windows - Start MySQL service
net start MySQL80

# Or use MySQL Workbench to start the server
```

### 3. Create Database and Tables
```bash
# Login to MySQL
mysql -u root -p

# Run the database.sql script
source database.sql

# Or manually:
CREATE DATABASE canteen_db;
USE canteen_db;
```

### 4. Configure Database Connection
Edit `src/main/resources/application.properties`:
```properties
spring.datasource.password=your_mysql_password
```

### 5. Build and Run
```bash
# Navigate to backend folder
cd backend

# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

The backend will start on http://localhost:8080

## API Endpoints

### Users
- POST /api/users/register - Register new user
- POST /api/users/login - Login user

### Menu
- GET /api/menu - Get all menu items
- POST /api/menu - Add menu item (admin)
- PUT /api/menu/{id} - Update menu item (admin)
- DELETE /api/menu/{id} - Delete menu item (admin)

### Orders
- GET /api/orders - Get all orders (admin)
- GET /api/orders/user/{email} - Get user orders
- POST /api/orders - Create order
- PUT /api/orders/{id}/status - Update order status (admin)
