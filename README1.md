# 2Leaf Coding Assessment

## Description
Landing Page for 2Leaf Coding Assessment with user login email confirmation and database functionality.
Email confirmation is sent to user upon successful registration.

### Installing and Running the App
To run app locally on your machine, clone the repository and run the following commands in your terminal:
1. Clone the repo: `git clone https://github.com/Zoneam/2leaf-assessment.git`
2. Navigate to the app's directory: `cd 2leaf-assessment`
3. -- Backend --
```cd backend```
```npm install```
```nodemon server.js```
-- Frontend --
Right click index.html and open in browser or use live server extension in VS Code.

## Configuration
add .env file to backend folder with the following variables:
```DATABASE_URL=``` Your MongoDB Atlas URL
```SECRET=``` Your secret key
```NODE_ENV=``` development or production
```EMAIL_USER=``` Your email address on Titan Mail
```EMAIL_PASS=``` Your email password

## Usage
Run the app locally on your machine and navigate to the landing page. Modal will ask to login if you have credentials, if you don't have credentials close modal and navigate to the bottom of the page where you can register.After registration you will receive confirmation email you can click on it to confirm your email. after successful registration you will be redirected to the Parental Portal page where you can see your username and interact with page. Be aware that your login token will expire in 5 minutes and you will be logged out. This is to simulate a real world scenario where you would be logged out after a certain amount of time. You can leave page and come back and login again to get a new token.

## Contact
If you have any questions feel free to contact me at my email: contact@haykmn.com
