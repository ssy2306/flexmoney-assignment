The FrontEnd is deployed on the follwoing endpoint : ```https://shahil-flexmoney-assignemnt-frontend.netlify.app/```
and The Backedn can be accessed on the following endpoint : ```https://flexmoney-assignment-backend.onrender.com/welcome```
The Database i'm using is a FREE tier at ```neon.tech```
________________________________________________________
To completely run the project locally:
First SetUp the following

- Make sure you have Node.js installed in your system, if not you can install it from here: ```https://nodejs.org/en/download ```
- Clone the repository/ Set up the repository into your desktop locally

<b> SETTING UP BACKEND </b>
1. Open the project in terminal
2. type ```npm i```
3. After installing all dependencies the port will be started locally at ```http://localhost:3000/```
4. You can access the endpoints such as ```/welcome``` , ```/user```
where /user gets a json requets such as email, name, age, batch 
   example:
   ``` {
    "email": "abc@gmail.com",
    "name": "abc",
    "age": 30,
    "batch": "AM_6_to_7AM",
    "paymentmonth": "January"
  }
```


