import bcrypt from 'bcryptjs'
import { User } from "./models/userModel";
import { Product } from "./models/productModel";

export const sampleProducts:Product[] = [
  {
    name: 'Nike Slim shirt',
    slug: 'nike-slim-shirt',
    image: '../images/p1.jpeg',
    category: 'Shirts',
    brand: 'Nike',
    price: 120,
    countInStock: 10,
    description: 'high quality shirt',
    rating: 4.5,
    numReviews: 10
  },
  {
    name: 'Adidas Fit shirt',
    slug: 'adidas-fit-shirt',
    image: '../images/p2.jpg',
    category: 'Shirts',
    brand: 'Adidas',
    price: 100,
    countInStock: 20,
    description: 'high quality product',
    rating: 4.0,
    numReviews: 10
  },
  {
    name: 'Lacoste Free Pants',
    slug: 'lacoste-free-pants',
    image: '../images/p3.jpeg',
    category: 'Pants',
    brand: 'Lacoste',
    price: 220,
    countInStock: 0,
    description: 'high quality product',
    rating: 4.8,
    numReviews: 17
  },
  {
    name: 'Nike Slim Pants',
    slug: 'nike-slim-pants',
    image: '../images/p4.jpeg',
    category: 'Pants',
    brand: 'Nike',
    price: 78,
    countInStock: 15,
    description: 'high quality product',
    rating: 4.5,
    numReviews: 14
  }
]

export const sampleUsers: User[] = [
  {
    name: 'Joe',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456'),
    isAdmin: true,
  },
  {
    name: 'John',
    email: 'user@example.com',
    password: bcrypt.hashSync('123456'),
    isAdmin: false,
  }
]