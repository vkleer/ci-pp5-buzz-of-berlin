# Buzz of Berlin
(Developer: Vilayat Kleer)

![mockup-image.jpg](docs/mockup-image.jpg)

[View the live website](https://.herokuapp.com/)

## Table of Contents

1. [Project Goals](#project-goals)
    1. [User Goals](#user-goals)
    2. [Application Owner Goals](#application-owner-goals)
2. [User Experience](#user-experience)
    1. [Target Audience](#target-audience)
    2. [User Requirements and Expectations](#user-requirements-and-expectations)
3. [User Stories](#user-stories)
    1. [User](#user)
    1. [Returning User](#returning-user)
    3. [Application Owner](#application-owner)
4. [Design](#design)
    1. [Colours](#colours)
    2. [Fonts](#fonts)
    3. [Structure](#structure)
5. [Technologies Used](#technologies-used)
    1. [Languages](#languages)
    2. [Framework](#framework)
    3. [Tools & Libraries](#tools--libraries)
6. [Features](#features)
7. [Validation](#validation)
    1. [HTML Validation](#html-validation)
    2. [CSS Validation](#css-validation)
    3. [JSX Validation](#jsx-validation)
    5. [Accessibility Wave WebAIM](#accessibility-wave-webaim)
    6. [Performance Google Lighthouse](#performance-google-lighthouse)
8. [Testing](#validation)
    1. [Manual Testing - User Stories](#manual-testing---user-stories)
    2. [Automated Testing](#automated-testing)
9. [Bugs](#Bugs)
10. [Deployment](#deployment)
    1. [GitHub](#github)
    2. [Heroku](#heroku)
11. [Credits](#credits)
    1. [Images](#images)
    2. [Code](#code)
12. [Acknowledgements](#acknowledgements)

## Project Goals

### User Goals
- 

### Application Owner Goals
- 

## User Experience

### Target Audience
-

### User Requirements and Expectations
- A simple, elegant application that anyone can use

## User Stories

### Anonymous User
1. 

### Registered User
1. 

### Application Owner
1. 

## Design

### Colours
The colours I used for the application have been picked using the [Adobe Color Wheel](https://color.adobe.com/create/color-wheel). I first found a 'main' colour that I wanted to use (#color) before moving on to the other colours.

<details><summary>Screenshot of Adobe Color Wheel</summary>
    <img src="docs/design/adobe-color-wheel.JPG">
</details>

### Fonts
The fonts that I used are [Font](https://fonts.google.com/specimen/) for the logo and [Font](https://fonts.google.com/specimen/) for all other text elements. 

### Structure
The application uses common web design conventions and is structured in an intuitive, easy to use way.

The navigation bar has a logo on the left and the links to the right. When the screen size is too small to display the links, the menu turns into a collapsable menu with the familiar 'hamburger' icon.

The footer is at the bottom of the page and contains links to my Github and LinkedIn page.

The application contains the following pages:

- page with description

### Wireframes

<details><summary>Page</summary>
    <img src="docs/wireframes/page-wireframe.png">
</details>

## Technologies Used

### Languages
- [**HTML**](https://www.python.org/)
- [**CSS**](https://www.python.org/)
- [**JavaScript**](https://www.python.org/)

### Tools
- [**Git**](https://git-scm.com/) was used for version control
- [**GitHub**](https://github.com/) was used as a remote repository to store the all project files
- [**Gitpod**](https://gitpod.io/) was used as the IDE to write the project code
- [**Heroku**](https://dashboard.heroku.com/) was used to deploy the project
- [**Google Fonts**](http://pep8online.com/) was used to supply the fonts for my project
- [**Font Awesome**](https://fontawesome.com/) was used to supply the icons for my project
- [**WC3's Markup Validation Service**](https://validator.w3.org/) was used to validate my HTML code
- [**W3C's CSS Validation Service**](https://jigsaw.w3.org/css-validator/) was used to validate my CSS code
- [**Google Chrome's DevTools**](https://developer.chrome.com/docs/devtools/) was used to benchmark the applications' performance, accessibility, best practices and SEO
- [**Wave WebAIM's web accessibility evaluation tool**](https://wave.webaim.org/) was used to validate my Python code
- [**Am I Responsive**](http://ami.responsivedesign.is/) was used to create the mock-up image for this project
- [**Balsamiq**](https://balsamiq.com/) was used to create the wireframes for this project
- [**Favicon.io**](https://favicon.io/) was used to create a favicon of my logo

### Libraries
- [**React 17.0.2**](https://17.reactjs.org/) was used to build the user interfaces
- [**React Bootstrap 4.6**](https://react-bootstrap-v4.netlify.app/) was used for the application layout, styling and making each component responsive.
- [**React Router**](https://v5.reactrouter.com/web/guides/quick-start) was used as for dynamic routing. I used it to allow for navigation between views of different components and to control what users see when they enter a specific URL in the browser.
- [**Axios**](https://axios-http.com/docs/intro) was used as the promise based HTTP client for node.js and the browser. I used it specifically to send API requests to the back end and to avoid any CORS errors when sending cookies.
- [**JWT**](https://jwt.io/) was used to create JSON Web Tokens. They were needed to prevent anonymous users from making extra network requests to refresh their access token, to remove timestamps from the browser when the users' refresh token expires or  when the user logs out.

## Front end
### React
React is a JavaScript library that is used for building interactive user interfaces. It uses declarative views to make your code easier to read and debug. The user interfaces consist of a collection of encapsulated and reusable components, allowing for complex user interfaces that are easy to manage thanks to separating the individual components.

React was used for several reasons:

- Reusability
    - Each time you write a component it can be reused in other parts of your application, or even in a completely new/different application. This saves a lot of time.
- Userbase and documentation
    - Since React is one of the most popular JavaScript libraries in the world, there is a plethora of of documentation and Stack Overflow questions for you to look at if you run into any errors. 
- Flexibility
    - Compared to other JavaScript libraries and front end frameworks, React code is easy to maintain and flexible thanks to its modular structure.
- Performance
    - React is already fast out of the box, but can be easily optimized by using components like the [react-infinite-scroll-component](https://www.npmjs.com/package/react-infinite-scroll-component) to avoid rerendering components over and over again when a user doesn't need them.
- React Bootstrap
    - The first time I used Bootstrap was around 2013/2014 and I have been using it on and off ever since. Being able to use Bootstrap with [React Bootstrap](https://react-bootstrap.github.io/) highly sped up the overall development process by being able to make the application responsive and aesthetic by applying its classes alongside my custom classes.

## Back end

## Features
The website has a total of X features:

### Feature
- 

<details><summary>Screenshot feature</summary>
    <img src="docs/features/feature.JPG">
</details>

## Validation

### HTML Validation
The HTML of the application has been validated using W3C's Markup Validation Service. all of the pages pass with no errors or warnings.

<details><summary>Screenshot of x page HTML validation</summary>
    <img src="docs/validation/html/x-page-html-validation.JPG">
</details>

### CSS Validation
The CSS of the application has been validated using W3C's CSS Validation Service. It passed with no errors or warnings.

<details><summary>Screenshot of x module CSS validation</summary>
    <img src="docs/validation/css/x-module-css-validation.JPG">
</details>

### JSX Validation
The JavaScript of the application has been validated using JSHint. It passed with no errors or warnings.

<details><summary>Screenshot of meal-planner.js JSHint validation</summary>
    <img src="docs/validation/js/meal-planner-jshint.JPG">
</details>

### Accessibility (Wave WebAIM)
The accessibility of the application has been measured using the Wave WebAIM web accessibility evaluation tool - all pages pass without errors.

<details><summary>Screenshot of x page accessibility evaluation</summary>
    <img src="docs/validation/wave/x-wave.JPG">
</details>

### Performance (Google Lighthouse)
The performance of the application has been measured with Google Lighthouse with either a perfect or near perfect score on each page.

<details><summary>Screenshot of x page Lighthouse performance</summary>
    <img src="docs/validation/lighthouse/x-lighthouse.JPG">
</details>


## Testing

### Manual Testing - User Stories

1. story

| **Feature** | **Action** | **Expected Result** | **Actual Result** |
|-------------|------------|---------------------|-------------------|
| feature | action | expected | result |

<details><summary>Supporting Screenshots - User Story 1</summary>
    <img src="docs/testing/user-story-testing/user-stories-01.png">
</details>

### Automated Testing


## Bugs

| **Bug** | **Fix** |
|-------------|------------|
| bug | fix - [link to commit](https://github.com/vkleer/) |



## Deployment

### GitHub
This website was deployed using Github Pages with the following steps:

1. Go to your Github Repository
2. Navigate to the 'Settings' page
3. On the left hand menu under 'Code and automationo', click on 'Pages'
4. Under 'Source', click on the 'Branch' dropdown element and set it to your main branch (in my case, this branch is called 'main')
5. Click on 'Save'
6. Refresh the page and you will be provided with a link to your deployed Github Page.

If you want to fork this repository, follow these steps:

1. Go to the Github repository (https://github.com/vkleer/CI_PP4_WhatsCooking)
2. Click on the 'Fork' button in the top right corner under the navigation bar

If you want to clone this repository, follow these steps:

1. Go to the Github repository (https://github.com/vkleer/CI_PP4_WhatsCooking)
2. Click on the 'Code' button above the list of files
3. Select your preferred way of cloning, I recommend using the 'GitHub CLI' option
4. Under 'GitHub CLI', click on the copy button to copy the clone command
5. In you IDE, open Git Bash
6. Navigate to the working directory where you want to clone this directory
7. Paste in the clone command you copied and press the 'enter' key to create the clone

### Heroku
This application has been deployed using Heroku with the following steps:

1. Login to [Heroku](https://id.heroku.com/login)
1. Go to your Heroku dashboard
3. In the top-right corner, click on the 'New' button, followed by the 'Create a new app' button
4. Enter an app name (it has to be unique) and choose your region under the 'Choose a region' dropdown menu.
5. Click on the 'Create app' button
6. On the next page, click on the 'Settings' tab 
7. Under 'Config Vars', click on 'Reveal Config Vars' to add a new Config var - this is where you can store sensitive data, like your Google service account key
8. Under 'Buildpacks' click on the 'Add buildpack' button to install additional dependencies. For this project the 'python' and 'nodejs' buildpacks were added, in that specific order
9. Click on the 'Deploy' tab
10. Under 'Deployment method', click on 'Github'. You can then search for your repository under 'Search for a repository to connect to'
11. Click on the 'Connect' button to connect your repository
12. On the next page, under 'Choose a branch to deploy' you can choose the branch you want to deploy your app from
13. Either click on the 'Enable Automatic Deploys' button under 'Automatic deploys' to have the app deploy automatically on each push you make to the branch, or click on the 'Deploy Branch' button under 'Manual deploy'
14. Wait for the app to build and be deployed. Once the app is ready, a message will be displayed saying 'App was successfully deployed' along with a button which takes you to your newly deployed app

## Credits

The logo and assets were created by the developer.

### Images
-

### Code
- 'Buzz of Berlin' is the result of building on the ['Moments'](https://github.com/Code-Institute-Solutions/moments) walkthrough that was provided by Code Institute. Though it was used as a foundation, a lot of extra functionality has been added to make this project truly my own. Code Institute has been credited throughout my code where applicable using docstrings.

## Acknowledgements
I would like to thank my partner Lauren Baker for helping me with the name of the application.