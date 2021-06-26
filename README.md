<h1 align="center">
  <img src="https://github.com/VitorHugoAntunes/readmeteste/blob/main/logo.svg" alt="Letmeask logo" />
</h1>

<p align="center">
  <a href="#installation">Installation</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#features">Features</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#about">About</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#license">License</a>
</p>

<p align="center">
 <img src="https://img.shields.io/badge/React-17.0.2-blue" alt="React" />
 <img src="https://img.shields.io/badge/Typescript-4.1.2-blue" alt="Typescript" />
 <img src="https://img.shields.io/badge/Firebase-%5E8.6.8-yellow" alt="Firebase" />
</p>

<p align="center">
  <img alt="Letmeask" src="https://github.com/VitorHugoAntunes/NLW6_Letmeask/blob/main/src/assets/LetmeaskPresentation.gif" width="720px">
</p>

<h2 id="installation">Installation</h2>	

Clone this repository: </br>
```git clone https://github.com/VitorHugoAntunes/NLW6_Letmeask.git``` </br>

Install the dependencies: </br> 
```npm install``` or ```yarn``` </br>

Run the project: </br> 
```yarn start``` </br>

Then type in your browser the URL: </br> 
```http://localhost:3000/``` </br>

To view the project without installing, click [here](https://letmeask-6eacd.web.app/).

<strong>Note:</strong> to use the project on your own machine or deploy, it is necessary to follow the Firebase configuration rules below.

- Create a new project in Firebase (<a href="https://console.firebase.google.com/u/0/?hl=pt-br">click here</a>); 
- On the project's configuration page, copy the string values ​​from `firebaseConfig`;
- Create a `.env.local` file for environment variables, copy the variables prefixed with `REACT_APP` from `firebaseConfig` in the `firebase.ts` file in the services folder and paste in the `.env.local` file;
- Assign string values ​​that were copied from the Firebase project to these variables;
- In RealTime Database, enter the following rules:
	
```{
  "rules": {
    "rooms": {
      ".read": false,
      ".write": "auth != null",
      "$roomId": {
        ".read": true,
        ".write": "auth != null && (!data.exists() || data.child('authorId').val() == auth.id)",
        "questions": {
          ".read": true,
          ".write": "auth != null && (!data.exists() || data.parent().child('authorId').val() == auth.id)",
          "likes": {
            ".read": true,
            ".write": "auth != null && (!data.exists() || data.child('authorId').val() == auth.id)"
          }
        }
      }
    }
  }
}
```
- If you are going to use the Firebase hosting service, delete these files: `.firebase` folder, `.github\workflows` folder, `.firebaserc`, `firebase.json` and `database.rules.json` and follow the deployment instructions from the official Firebase documentation <a href="https://console.firebase.google.com/u/0/project/teste-64e4d/hosting/sites?hl=pt-br">here</a>;
- If you use your GitHub project to deploy, put the Firebase environment variables on the GitHub platform, follow the documentation <a href="https://docs.github.com/pt/actions/reference/environment-variables">here</a>. 

<h2 id="technologies">Technologies</h2>

This project was developed with these technologies:

- HTML
- CSS
- Sass
- ReactJS
- Firebase Authentication
- Firebase Realtime Database
- Typescript

<h2 id="features">Features</h2>

<h3>Authentication with GitHub</h3>
<h1 align="center">
  <img src="https://github.com/VitorHugoAntunes/NLW6_Letmeask/blob/main/src/assets/images/github-auth.JPG" alt="GitHub Auth" width="720px"/>
</h1>

<p>It is now possible to authenticate to the application using also a GitHub account to create rooms.</p>

<h3>Toasts and Modals</h3>

<h1 align="center">
  <img src="https://github.com/VitorHugoAntunes/NLW6_Letmeask/blob/main/src/assets/images/modal-confirmation.JPG" alt="Modal" width="480px"/>
  <img src="https://github.com/VitorHugoAntunes/NLW6_Letmeask/blob/main/src/assets/images/toast.JPG" alt="Toast" width="480px"/>
</h1>

<p>Modals and toasts were added to confirm your actions in the application. There is modal to choose login method and toats that confirm deleted questions and copied code.</p>

<h3>SignOut Option</h3>

<h1 align="center">
  <img src="https://github.com/VitorHugoAntunes/NLW6_Letmeask/blob/main/src/assets/images/sign-out-account.JPG" alt="SignOut" width="720px"/>
</h1>

<p>After using the authentication options with your Google or GitHub account, you can log out of your account using the top button next to the room code.</p></br>
<p>Some design changes were made, for example the styles of a highlighted question.</p>

<h2 id="about">About</h2>
<p>This project was designed to create a Q&A room that updates data in real time. The owner of the room can answer, mark as a highlight, like and delete the questions.</p>

<h2 id="license">License</h2>
<p>This project is under the MIT license. See the LICENSE file for more details.</p>

---
This project was made available by [Rocketseat](https://github.com/Rocketseat).
