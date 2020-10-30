import bcrypt from 'bcryptjs';

 const users=[
    {
        name:'Admin User',
        email:'admn@example.com',
        password: bcrypt.hashSync('123456',10),
        isAmin:true
    },
    {
        name:'saurabh',
        email:'saurabh@example.com',
        password: bcrypt.hashSync('123456',10),
    },
    {
        name:'abc',
        email:'abc@example.com',
        password: bcrypt.hashSync('123456',10),
    }
]

export default users;