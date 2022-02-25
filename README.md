# The Write Match!

## Table of Contents

- [Description](#description)
- [Screenshots](#screenshots)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Acknowledgements](#acknowledgements)
- [Contacts](#contacts)

## Description

I'm a young adult fiction writer who moved from Asheville, NC to Minneapolis, MN a few years ago, and lost a wonderful weekly critique group and local writing community in the process. I struggled to connect with other writers in my new home, and often wished there was an easy way to find them. But I doggedly volunteered at literary events and went to book signings and meet-ups, and eventually I made some wonderful connections.

Then covid and lockdown hit, and I, like so many other writers, was once again scrambling to find new ways to build community and meet new, like-minded creatives. I thought: wouldn't it be wonderful if there was an app like Tindr that matched creatives with each other based on medium, common goals, and similar interests? That's when the idea for 'The Write Match' was born!

'The Write Match' aims to help connect writers based on what they are looking for and what they have to offer each other. Users log in with a unique username and password, and then create a profile that includes their genres, what they are looking for, and what they have to offer. They are then matched with other writers. They can select matches, and if confirmed by the other user, they have the option to contact their match. They can also delete selected matches if they change their mind.

This app is deployed on Heroku! To experience the app for yourself, please go to https://gentle-bastion-76166.herokuapp.com/ and register.

## Screenshots

<img src="public/images/LoginPage.jpg" width="200"  />
<img src="public/images/ViewProfile.jpg" width="200"   />
<img src="public/images/NewNav.jpg" width="200"  />
<img src="public/images/NewMatches.jpg" width="200"  />
<img src="public/images/AwaitingConfirmation.jpg" width="200" />
<img src="public/images/ConfirmedMatch.jpg" width="200" />
<img src="public/images/ContactModal.jpg" width="200" />

## Built With

<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" height="40px" width="40px" /></a><a href="https://material-ui.com/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/materialui/materialui-original.svg" height="40px" width="40px" /></a><a href="https://nodejs.org/en/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" height="40px" width="40px" /></a><a href="https://www.postgresql.org/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg" height="40px" width="40px" /></a><a href="https://reactjs.org/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" height="40px" width="40px" /></a><a href="https://redux.js.org/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg" height="40px" width="40px" /></a>

## Getting Started

This application will fully support Chrome browser on iOS mobile. All other browsers are considered out of scope.

### Prerequisites

Express - a web framework for Node.js;
Postgresql - an open source relational database

### Installation

There is a database.sql file to use to set up a database. After that once you fork and clone the repository, you should be able to run npm install, then run the server and client to be able to use the app.

## Usage

You can access the app here:  https://gentle-bastion-76166.herokuapp.com/ . Just go to the Registration Page from the homepage (Login Page) and register a username and password to walk through the app as a user!

When the user lands on the homepage, they will be able to log into the app if they have already created a username and password, which will direct them to their profile page. If they have never logged in before, they can click on "Register," which will route them to the registration page.

Once they have created their username and password, they will be directed to the Create Profile page, where they will enter information into several inputs before submitting. Once they have submitted, they will be routed to the View Profile page. From there, the user can go to either the New Matches or Current Matches pages.

On New Matches, they will be presented with other writers whose profiles have been matched with theirs based on their profile. They can select writers to match with on this page. On the Current Matches page, they can view their current matches. They will be displayed as either "Awaiting Confirmation," which means that the other user has not yet also selected the user as a match, or as "Confirmed Match!" which means that they other user has also selected them. If they have both selected each other, they will have the option to view their contact information.

Next steps include:
-- An Edit Profile option so that writers can edit their inputs to view different matches
-- A Direct Messaging feature within the app
-- Increasing the sophistication of the matching algorithm

## Acknowledgements

I would like to express my undying gratitude to Prime Digital Academy, my wonderful instructor Dev Jana, his incredible teaching assistant Casie Siekman, and my absolutely fabulous Ionian cohort that was cheering me on and helping me troubleshoot every step of the way. It is mind-blowing to think of the progress I've made over the past few months, and I'm so excited to see where I go from here.

## Contacts

<a href="https://www.linkedin.com/in/miriam-mcnamara"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" /></a> <a href="mailto:miriammcnamara@icloud.com"><img src=https://raw.githubusercontent.com/johnturner4004/readme-generator/master/src/components/assets/images/email_me_button_icon_151852.svg /></a>
