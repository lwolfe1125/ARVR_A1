# Assignment 1, Part 2: Babylon.js and TypeScript

This is a skeleton of a small project that will let you build, debug, and run Babylon applications locally.

The objective of this assignment is twofold:
1. Get your computer set up to work with the toolset we are using.
2. Do a little bit of work with Babylon.

## Rubric
Review the material presented in the first TypeScript/Babylon tutorial before attempting the assignment. Details about features to add in this assignment can also be found in the [Babylon 101](https://doc.babylonjs.com/babylon101/) tutorials website.

1. Program builds with no warnings. (.5)
2. Debug layer added to the scene. (.5)
3. Ground texture selected and positioned appropriately relative to the camera view. (.5)
4. MeshBuilder is used to place 2 textured objects on the ground(1)
5. Using keyframe animation, add two moving objects above the ground. (1)
6. A non-white SpotLight is added to the scene, reasonably close to the viewer’s position and aimed down so that scene objects are illuminated. (.5)
7. Add SpotLight shadows. (.5)
8. Build the program by executing `npm run build` and then upload the contents of the `dist` folder to your public webspace.  Make sure to set the permissions so that it loads correctly in a web browser.  You should include this URL in the brightspace submission. (.5)

## Submission

You will need to clone the project under your student gitlab repo for this course. Details about using GitLab for submitting course assignments can be [found here](https://helpdesk.cs.dal.ca/gitlab). The project folder should contain just the additions to the sample project that are needed to implement the project.  Do not add extra files, and do not remove the `.gitignore` file (we do not want the "node_modules" directory in your repository.)

**Do not change the names** of the existing files.  I need to be able to test your program as follows:

1. check out your project 
2. cd into the directory and run ```npm install```
3. start a local web server and compile by running ```npm run start``` and pointing the browser at your ```index.html```

Please test that your submission meets these requirements: after you commit your final version of the assignment to GitLab, check it out again to a new directory and make sure everything builds and runs correctly.

## Dependencies

The sample has already been set up with a complete project for Typescript development.

To work with this sample and prepare your submission, you should have Node.js installed, which you can retrieve from [nodejs.org](http://nodejs.org) or by downloading `npm` using a package manager.

In addition to Node, you should make sure a recent (>= version 3.9) version of Typescript is installed.  The easiest way to do this is by executing `npm install --global typescript`.

## Local Development 

After cloning and checking out the project, you need to initialize by pulling the dependencies with:
```
npm install
```

After that, you can compile and run a server with:
```
npm run start
```

Under the hood, we are using the `npx` command to both build the project (with webpack) and run a local http webserver on your machine.  The included ```package.json``` file is set up to do this automatically.  You do not have to run ```tsc``` to compile the .js files from the .ts files;  ```npx``` builds them on the fly as part of running webpack.

You can run the program by pointing your web browser at ```https://localhost:8080```.

## Build and Deployment

After you have finished the assignment, you can build a distribution version of your program with:

```
npm run build
```

This will generate an `index.html` file and a Babylon bundle in the `dist` subdirectory of your project.  Note that this generated code is not human readable, so you can deploy the contents of this directory without worrying about other students using your code.

To complete the final step in this assignment, you will need to upload your dist and resources directories to your web space and set permissions so that the directories are executable and the files are readalbe (details available [here](https://web.cs.dal.ca/uploading)).

If you have problems with deploying to your web space, contact the FCS help desk.  

## License

Most material for this assignment was created by E.S. Rosenberg and is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-nc-sa/4.0/).

The intent of choosing CC BY-NC-SA 4.0 is to allow individuals and instructors at non-profit entities to use this content.  This includes not-for-profit schools (K-12 and post-secondary). For-profit entities (or people creating courses for those sites) may not use this content without permission (this includes, but is not limited to, for-profit schools and universities and commercial education sites such as Coursera, Udacity, LinkedIn Learning, and other similar sites).   

## Acknowledgments

This assignment was adapted for CSCI 4262 (Virtual and Augmented Reality) by Derek Reilly, and was originally based upon content from the [3D User Interfaces Fall 2020](https://github.blairmacintyre.me/3dui-class-f20) course by Blair MacIntyre.
