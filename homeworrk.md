-create a repository
-Initialize the repository
-node_modules,package-lock,json,package.json
-Install express
-create a server
-Listen to port 7777
-Write request handlers for /test, /hello
-Install nodemon and update scripts inside package.json
-what are dependencies
-what is the us e of "-g" while npm install
-Differnece between caret and tilda(^ vs ~)

-initialize git
-.gitignore
-create a remote repo on github
-Push all code to remote origin
-play with routes and extensions [order of the routes are important]
-install postman and make a workspace/collection/make a api call there
-write logic to handle GET,POST,PATCH,DELETE Api calls using postman
-explore routing using * () + ? in routes
-explore regex using /a/,/.*fly$/
-explore req.query 
-explore dynamic routing

-Handling multiple route handler-play with the code
-next()
-next function and errors along with res.send()
-using arrays[app.use("/route",rh,rh1,rh2,rh3,[rh4,rh5])]
-what is middelware and how express.js basically handles the request behind the scenes
-Difference between app.use vs app.all
-write a dummy auth middleware for admin and user except user/login

-Error handling using app.use("/",(err,req,res,next)) at the end always


-create a free cluster on MongoDB Official website(ongo Atlas)
-Install mongoose library
-Connect your application to the database  "connection-url"/devTinder
-call the connectDB function and connect to database before starting application on 7777
-create a userschema and Usermodel
-create post /signup API to add data to datbase
-push some documents using API calls from postman
-Error Handling using try and catch
-differenece between JSON vs Jsobject
-Add the express.json middleware to your app
-Make your signup API dynamic data from the end user
-User.findone with duplicate which one it will find search it
-GET userby email
API-Get all the the users from the database
-API-GET USER BY ID-findById()
-Difference between PATCH and PUT
-API-Update a user
-Explore the Mongoose Documentation for Model methods
-What are options in a model.findoneAndUpdate,explore more about it.
-API-Update the user with emailId;


-Explore Schema type options from the documentation
-add required, unique, lowercase,min, minLength,trim
-add default
-Create a custom validate function for gender
-Improve validation th DB schema-PUT all appropriate validations on each field in schema
-Add type stamps to the userschema.