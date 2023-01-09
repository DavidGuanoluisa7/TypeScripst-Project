# THE COURSES PROJECT - Frontend

## Design choices and decisions

To carry out the project, the Material UI library was used because it has a lot of diversity in the components to choose for 
React UI.


## Documents how the code is working

- In the assets folder there are some resources used in the project such as the 1Mentor logo and the image located on the 
left of the web page.

- In the data folder you will find courses.ts, which is the array where all the courses of the project are located.

- In the helpers folder is getCourses.ts, which is the function in charge of filtering the courses based on the provider, 
also in the same document was created the function to show when the provider is 'Other'.

- At the root of the project is App.tsx where the entire user interface was created using Material UI, as well as the 
selectProvider function, which is in charge of filtering the provider by importing the getCourses and getCoursesOther 
functions from the helpers folder.
 
- And in the index.css file located at the root of the project you will find all the styles applied to the project.


## Deploy project

To deploy the project on github.com, you only have to upload the project to your github repository and deploy it using the 
GitHub Pages tool.


## Tests can be run

The tests that can be executed in the project are:

1.- Create a data array to execute the function that filters the courses by provider, by clicking on each one of them.

2.- Create two arrays to test the functionality of creating the data table through the Material UI TableContainer component.