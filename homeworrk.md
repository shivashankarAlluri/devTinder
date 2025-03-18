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
-API level validation on patch request & signup post api
-Data Sanitizing -Add Api Validation for each field.
-Install validator
-Explore validator library function an duse validator function for password,email,photourl.
-NEVER TRUST req.body

-validate data in Signup API
-Install bcrypt package
-create PasswordHash using bcrypt.hash & save the user is encrypted password
-create logi API
-Compare paswwords and throw errors if email or password is invalid


-InstalL cookie-parser
-just send dummy cookie to user
-create GET /profile API and check if you get the cookie back
-Install jsonwebtoken
-In login API,after email and password validation,create a JWT
token and send it to user in cookie
-read the cookies inside your profile API and find the logged in user
-userAuth middleware
-Add the userAuth middleware in profileAPI and a newsendConnectionRequest API
-set the expiry of jwt token and cookies to 7days
-create UserSchema method to getJWT()
-create userSchema methd to comparePassword(passwordInputByUser) 


-Explore tinder APIs
-create a list all API you can think of in Dev Tinder
-Group multiple routes under respective routers
-Explore read documentation for express.Router
-create routes folder for managing auth,profile,request routers
-create authRouter,profileRouter,requestRouter
-Import these routers in app.js
-Create logout POST /logout and test
-create PATCH /profile/edit and /view/
-To create patch /profile/password API=>forgot password API
-Make sure validate all data in ecery POST,PATCH APIs


-Read this article Compound Interest
-Read more about indexes in mongodb
-why do we need index in DB?
-what is the advantage and disadvantages of creating?
-create a connection request Schema and add proper validations
-send connection Request API
-proper validation of data
-Think about all corner cases 
$or query and $and query
-read about logical query
-schema.pre("save")
-Always think about corner case


write code with proper validations for POST /request/review/:status/:requestId

-Thoughtprocess - POST VS GET
-Read about populate and ref how do we create a relation between two
-Create GET /user/requests/received with all the checks
-Create GET /user/connections
