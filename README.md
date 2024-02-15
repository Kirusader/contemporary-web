<h2 align="center"> Student Hub Application </h2>

<p align="center">
  <img src="https://res.cloudinary.com/drnarknab/image/upload/v1708003793/resource/Screenshot_114_cmi393.png" />
</p>

# Table of Contents

- [Table of Contents](#table-of-contents)
- [Project Description](#project-description)
- [Live Link](#live-link)
- [Used Technologies](#used-technologies)
- [Project Setup](#project-setup)
  - [First Step](#first-step)
  - [Second Step](#second-step)
  - [Third Step](#third-step)
    - [.env variables](#env-variables)
- [Development mode (Localhost)](#development-mode-localhost)

# Project Description

The Student Hub application enables students to communicate with their peers, share their experience to others, take quizzes, and play a game with their friends. The application enables students collaboration, communication and socialize while they are in the university. This will contribute to improve social wellbeing by enabling student to get help and provide support to their peers.

# Live Link

Deployed application :<br>
https://student-hub-cddbb.web.app <br>
https://student-hub-cddbb.firebaseapp.com

# Used Technologies

The following technologies have been used in the building process of the Student Hub application:

- React (v18.2.0)
- Firebase (v10.7.1)
- Node JS (v18.16.0)
- HTML
- CSS
- ReactBootstrap
- Vite (v4.4.5)

**Vite:** a build tool is used because of it allows for fast development and build times.
**Firebase:** a platform for building web and mobile applications that provides backend services such as authentication, database, and storage.

# Project Setup

## First Step

First to run the project, download a zip file from the GitHub repository which contain all of the web application files
![GitHubStep1](https://res.cloudinary.com/drnarknab/image/upload/v1707919288/resource/Screenshot_134_bvucnj.png)

After the zip file is downloaded the project need to be unzipped to any location on disk drive. After this the correct version of Nodejs need to be installed ["NodeJS"](https://nodejs.org/en/download/) on the computer if it doesn't installed before.

## Second Step

Next the folder containing the project file need to be opened on VSCODE editor. After loading successfully to Visual Studio all dependencies that are located in package.json file should be installed.

In the root directory of the project run the following command in the terminal :

```javascript
npm install
```

![Step2](https://res.cloudinary.com/drnarknab/image/upload/v1707920066/resource/Screenshot_135_y3clas.png)

## Third Step

### .env variables

Next step is to create .env file in the root directory of the project. It's containing the project firebase configuration variables.

```javascript
VITE_FIREBASE_API_KEY=AIzaSyD8NpuEss9sZK-aZzehcrIjiqBaTyPHwC4
VITE_FIREBASE_AUTH_DOMAIN=student-hub-cddbb.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://student-hub-cddbb-default-rtdb.europe-west1.firebasedatabase.app
VITE_FIREBASE_PROJECT_ID=student-hub-cddbb
VITE_FIREBASE_STORAGE_BUCKET=student-hub-cddbb.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=828903681472
VITE_FIREBASE_APP_ID=1:828903681472:web:8e4a32ffaf6d4b597d2c25
```

Next, copy and paste the above firebase configuration variables to the .env file.

![.envFile](https://res.cloudinary.com/drnarknab/image/upload/v1707920719/resource/Screenshot_2024-02-14_142236_wmgnwa.png)

# Development mode (Localhost)

After downloading project and installing all dependecies, and creatig .env file with Firebase configuration provided above, the project can be run(started) with the following command by typing it on the terminal.

```javascript
npm run dev
```

![Development mode](https://res.cloudinary.com/drnarknab/image/upload/v1707921818/resource/Screenshot_137_qwdtn1.png)
![Development mode](https://res.cloudinary.com/drnarknab/image/upload/v1707921820/resource/Screenshot_138_x9jdnw.png)

You can login using either Facebook or Google account or register for new account.

** Test email & **Test password

kiros2015@gmail.com ab1234
