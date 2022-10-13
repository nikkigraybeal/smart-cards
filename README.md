Smart Cards is a flashcard creation app. This app allows users to view publicly available flashcard sets or to signup/login and create their own custom sets of flashcards. The app also tracks a logged-in user’s self-reported success or failure upon viewing cards and uses a simple spaced repetition algorithm to show cards that have been answered correctly with less frequency as time goes by.

This app is my first attempt at creating a project with a backend. It uses Node.js, Express.js, EJS, Mongoose and MongoDB.

How it works: The home page displays publically available flashcard sets as well as sets authored by the currently logged-in user. Sets are listed by subject, subcategory and title, with the title being a clickable link to a details page that allows the user to study that particular set. The details view first displays a set card that contains the set information including subcategory, title, author and the number of cards that the user has to study in the set. The user can click a button to begin viewing the cards in the set or, if they are the author of the set, can click a button to edit the set information for all of the cards in the set. 
If the user clicks to view the cards, cards are displayed one at a time with the question (or card-front) face-up first. A button allows the user to flip the card and view the answer. The card-back also displays a "nailed it!" button and a "blew it!" button that can be clicked to initiate smart functionality for that particular card and user. 
Smart functionality tracks successful views indicated by the user by saving the card ID, last successful view and consecutive successful views to the logged-in user object. A simple spaced repetition algorithm decides which cards the user should study and when so that when a particular set of cards is requested, cards that have recently been answered correctly will be pulled out of the set for a number of days that correlates with the number of consecutive successful views. 
Edit views allow users to edit the set information for an entire set of cards or the information for individual cards for cards that they authored. 
A create view also allows users to create new sets and cards and indicate if they would like to make the set publicly available. Publicly available sets can be viewed by anyone who uses the app but only logged in users may create new sets and edit thier own sets. 
Login and signup pages allow new and returning users to create flashcard sets and track their learning.

Where to view and try it: coming soon...? Next up, learning to deploy a node app! In the meantime, grab it off of Github and try it out on your own machine. 


