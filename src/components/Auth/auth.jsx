// src/auth/auth.js

let users = [
    { id: 1, email: 'customer@ewa.com', password: '123', role: 'customer' },
    { id: 2, email: 'salesman@ewa.com', password: '123', role: 'salesman' },
    { id: 3, email: 'manager@ewa.com', password: '123', role: 'storemanager' },
  ];
  
  export const authenticate = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  };
  
  export const addUser = (email, password) => {
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return null; // User already exists
    }
    const newUser = {
      id: users.length + 1,
      email,
      password,
      role: 'customer' // New users are always customers
    };
    console.log('newUser',newUser)
    users.push(newUser);
    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  };