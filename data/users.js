import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User ",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Subodh",
    email: "subodh@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Shubham",
    email: "subham@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
