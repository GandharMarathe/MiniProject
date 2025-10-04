-- Create database
CREATE DATABASE IF NOT EXISTS canteen_db;
USE canteen_db;

-- Insert initial menu items
INSERT INTO menu_items (name, price, image, category) VALUES
('Veg Thali', 45, 'https://imgs.search.brave.com/mltDffD0z7KOhmh8glJNMiUQfu3EQAjYnccWhVSOmqE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cy4x/MjNyZi5jb20vNDUw/d20vaW5kaWFuZm9v/ZGltYWdlcy9pbmRp/YW5mb29kaW1hZ2Vz/MTkwNi9pbmRpYW5m/b29kaW1hZ2VzMTkw/NjAxOTk3LzEyNTg1/OTQ1Ny1pbmRpYW4t/aGluZHUtdmVnLXRo/YWxpLWZvb2QtcGxh/dHRlci1zZWxlY3Rp/dmUtZm9jdXMuanBn/P3Zlcj02', 'Meals'),
('Samosa', 20, 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&h=200&fit=crop', 'Snacks'),
('Masala Dosa', 35, 'https://imgs.search.brave.com/bDs7QegV1fpJQeKeT-wde4WZ6uYswYExyn2nB6RJF4Y/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAxLzg2LzcwLzM0/LzM2MF9GXzE4Njcw/MzQyMF9FZElCcHZw/dEhJSFlac25PZWFt/bjBYSGx2ZmJCTEl0/UC5qcGc', 'South Indian'),
('Pav Bhaji', 40, 'https://imgs.search.brave.com/kwN6iePKCqH_gZck83IisNckRnj25elayw0zTeU_IHY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/c2h1dHRlcnN0b2Nr/LmNvbS9pbWFnZS1w/aG90by9wYXYtYmhh/amktZmFzdC1mb29k/LWRpc2gtMjYwbnct/MjA3OTk4NjM1Ni5q/cGc', 'Street Food'),
('Poha', 25, 'https://imgs.search.brave.com/k-3f7PHtvXWv-c2zXJdf-r-XPD5s-Xixrlo-0rU_OWA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by90cmFkaXRpb25h/bC1pbmRpYW4tcG9o/YS1kaXNoLXdpdGgt/Y3VycnktbGVhdmVz/LXdvb2Rlbi1ib2Fy/ZF82MDQ5MjYtMjg4/LmpwZz9zZW10PWFp/c19oeWJyaWQmdz03/NDAmcT04MA', 'Breakfast'),
('Chai', 10, 'https://imgs.search.brave.com/vVRL3BZPKaaxqTnnBDQOlzeoG0R3o29N57R-tp6nX-Y/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/c2h1dHRlcnN0b2Nr/LmNvbS9pbWFnZS1w/aG90by9pbmRpYW4t/Y2hhaS1nbGFzcy1j/dXBzLW1ldGFsLTI2/MG53LTE4Nzg5MzIz/NzcuanBn', 'Beverages'),
('Veg Biryani', 55, 'https://imgs.search.brave.com/gy3y0y-stpW5c3ALMTtLVAxtKn-2l6K1wnyaaUjMZwY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnJl/ZGQuaXQvb3ZoN2Ez/Y2VlczNkMS5wbmc', 'Meals'),
('Paneer Butter Masala', 65, 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=300&h=200&fit=crop', 'Meals'),
('Veg Sandwich', 30, 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=300&h=200&fit=crop', 'Snacks'),
('Aloo Paratha', 35, 'https://imgs.search.brave.com/gz7s6V6zuy_J_xt3SBnk4RDhvXTgyxDHkrYcoXNfJTQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9hbG9v/LXBhcmF0aGEtaW5k/aWFuLXBvdGF0by1z/dHVmZmVkLWZsYXRi/cmVhZC1idXR0ZXIt/dG9wLXNlcnZlZC1m/cmVzaC1zd2VldC1s/YXNzaS1jaHV0bmV5/LXBpY2tsZS1zZWxl/Y3RpdmUtZm9jdXMt/bGFzc2llLTE2NDIx/MzAzNS5qcGc', 'Breakfast'),
('Veg Fried Rice', 50, 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=300&h=200&fit=crop', 'Meals'),
('Coke', 20, 'https://imgs.search.brave.com/OYRJyoUU3sF6o-v030h-utxdU67XB5lZ35Db5fFS2n8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzM5LzI2/L2ZmLzM5MjZmZjEx/MjJkMTk1N2EwZWM0/MmQ4NTA3MTdlNzRm/LmpwZw', 'Beverages');

-- Insert admin user
INSERT INTO users (name, email, password, is_faculty) VALUES
('Admin', 'admin@apsit.edu.in', 'admin123', true);
