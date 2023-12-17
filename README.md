The FrontEnd is deployed on the follwoing endpoint : ```https://shahil-flexmoney-assignemnt-frontend.netlify.app/```
and The Backedn can be accessed on the following endpoint : ```https://flexmoney-assignment-backend.onrender.com/welcome```
The Database i'm using is a FREE tier at ```neon.tech```

DATABASE SCHEMA DESIGN : here, model is same as tables
```
 // Model for user inputs
enum Batch {
  AM_6_to_7AM
  AM_7_to_8AM
  AM_8_to_9AM
  PM_5_to_6PM
}


model User {
  id        Int      @id @unique(map: "pk_user_id") @default(autoincrement())
  email     String?  @unique
  name      String?
  age       Int?
  batch     Batch?
  createdAt DateTime? @default(now())
  updatedAt DateTime?
  payments  Payment[]
}

model Payment {
  id          Int      @id @unique(map: "pk_payment_id") @default(autoincrement())
  amount      Int
  paymentmonth String? 
  userId      String      @map("fk_user_id")  
  user        User     @relation(fields: [userId], references: [email])
  createdAt   DateTime? @default(now())
  updatedAt   DateTime?
}
```

i have taken the batches as enums as it's easier to store theb batches this way
________________________________________________________
To completely run the project locally:
First SetUp the following

- Make sure you have Node.js installed in your system, if not you can install it from here: ```https://nodejs.org/en/download ```
- Clone the repository/ Set up the repository into your desktop locally

<b> SETTING UP BACKEND </b>
1. Open the project in terminal
2. type ```cd backend``` ,  then
3. type ```npm i```
4. After installing all dependencies the port will be started locally at ```http://localhost:3000/```
5. You can access the endpoints such as ```/welcome``` , ```/user```
where /user gets a json requets such as email, name, age, batch 
   example:
   ```
   {
    "email": "abc@gmail.com",
    "name": "abc",
    "age": 30,
    "batch": "AM_6_to_7AM",
    "paymentmonth": "January"
   } ```

_______________________________
<b> SETTING UP FRONTEND </b>
1. Open the project in terminal
2. type ```cd frontend``` ,  then
3. type ```npm i```
4. After installing all dependencies the port will be started locally at ```http://localhost:3000/```





