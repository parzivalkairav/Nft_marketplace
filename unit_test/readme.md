<h1>Unit Tests</h1>
This project contains unit tests to ensure that the NFT Marketplace code is working as expected. Unit tests help to catch errors early and ensure that the code continues to work as changes are made.<br/>

Running the Tests:
To run the unit tests, use the following command:<br/>

npm test<br/>

This command will run all of the unit tests in the test/ directory and display the results in the terminal.<br/>

<h1>Writing Unit Tests</h1>
To write a unit test, create a new file in the test/ directory with the extension .test.js. This file should contain one or more tests for a specific piece of functionality.<br/>

Tests should use the chai and sinon libraries to make assertions and create test doubles, respectively. Tests should cover both the success and error cases of the code being tested.<br/>

In the context of the NFT Marketplace, some examples of tests could include:<br/>

Testing that a user can create a new NFT and that it appears in the marketplace.<br/>
Testing that a user can purchase an NFT from the marketplace and that their balance is updated accordingly.<br/>
Testing that a user cannot purchase an NFT that is already sold.<br/>
Example unit tests are included in the test/ directory of this project. Study these tests to get an idea of how to write your own tests.<br/>

Continuous Integration<br/>
Unit tests can be integrated into a continuous integration (CI) pipeline to automatically run tests on every commit or pull request. This helps to catch errors before they are merged into the codebase.<br/>

Popular CI tools for JavaScript projects include GitHub Actions, Travis CI, and CircleCI.
