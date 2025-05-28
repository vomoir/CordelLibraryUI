# Cordel Library UI

This project is the front end for the [https://github.com/vomoir/CordelLibraryApi](https://github.com/vomoir/CordelLibraryApi%5C) backend project.
Running this project is dependent on running the API first.

The task was to create a simple API that emplys an in memory database to create, edit and store a list of library books.

I added some seed data and code to the API  so that you have something to play with right off the bat. I also made use of the Book Covers Open Library (https://covers.openlibrary.org) to display a cover for the books.

Note that the book covers don't align with the actual title of the books! They're just for decorative purposes. To get the actual book cover would require looking up the ISBN of the title and then using that in the URL. Out of the scope for this task!

The UI is written in plain old javascript on the React platform.  
There's nothing very special about the codebase except that it uses **zustand** [(https://zustand.docs.pmnd.rs/getting-started/introduction)](https://zustand.docs.pmnd.rs/getting-started/introduction%5C) as the state management apparatus.  
**Zustand** is pretty much a drop in replacement for React Contexts or Redux and is where all of the API interaction takes place.  
Zustand, like Context, circumvents prop drilling and allows for the passing of data and state to components. 

Redux is better suited for larger more complex uses and scales better, but for most smaller, lighter weight applications, zustand is pretty neat.

All the state and api interactions take place in the **"src/stores/bookstore.js"** file. The code needs a little optimising but I was learning as I was going so it may look a little obtuse.
The interface itself is fairly pedestrian. The application's styling is a bit inconsistent as well: using CSS styling in most instances but also javascript styling in the EditBook form.

## Available Scripts

In the project directory, you can run:

### \`npm start\`

Runs the app in the development mode.\\  
Open http://localhost:3000 to view it in your browser.

The page will reload when you make changes.\\  
You may also see any lint errors in the console.

### \`npm test\`

Tests are a bit light on the ground and is where I would focus on if continuing this project.

Launches the test runner in the interactive watch mode.\\  
See the section about \[running tests\](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### \`npm run build\`

Builds the app for production to the \`build\` folder.\\  
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\\
