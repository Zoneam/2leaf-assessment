# 2Leaf Coding Assessment

## Description
Landing Page for 2Leaf Coding Assessment with user login email confirmation and database functionality.

### Installing and Running the App
To run app locally on your machine follow the steps below:
##### 1. Clone the repo: `git clone https://github.com/Zoneam/2leaf-assessment.git`
##### 2. Navigate to the app's directory: `cd 2leaf-assessment`
##### -- To run Backend --
    cd backend
    npm install
    nodemon server.js
##### 4. --To run Frontend --
    cd frontend
    Right click index.html and open in browser or use live server extension in VS Code.

## Configuration
add .env file to backend folder with the following variables:
```DATABASE_URL=``` Your MongoDB Atlas URL
```SECRET=``` Your secret key
```NODE_ENV=``` development or production
```EMAIL_USER=``` Your email address on Titan Mail
```EMAIL_PASS=``` Your email password
```FRONTEND_URL=``` Your frontend url (http://127.0.0.1:5501/frontend/) is default if you are running app locally

## Usage
1. Run the app locally on your machine and navigate to the landing page.
2. Modal will ask to login if you have credentials, if you don't have credentials close modal by clicking X on top left corner or click away from modal.
3. Navigate to the bottom of the page where you can register new user.
4. After registration you will receive confirmation email.
5. Open your email and click on the link to confirm your email.
6. After successful confirmation you will be redirected to the Parental Portal page where you can see your username and interact with page.
7. Be aware that your login token will expire in 5 minutes and you will be logged out. This is to simulate a real world scenario where you would be logged out after a certain amount of time.

## Contact
If you have any questions feel free to contact me at my email: contact@haykmn.com
