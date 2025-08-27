CREATE TABLE IF NOT EXISTS product (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    stock INTEGER DEFAULT 0
);
INSERT INTO product (name, price, description, stock) VALUES
('Laptop Dell XPS 13', 999.99, 'Ultrabook haute performance', 10),
('iPhone 13 Pro', 1099.99, 'Smartphone Apple dernière génération', 15),
('MacBook Air M1', 1299.99, 'Ordinateur portable Apple avec puce M1', 8),
('Samsung Galaxy S21', 799.99, 'Smartphone Android premium', 12);