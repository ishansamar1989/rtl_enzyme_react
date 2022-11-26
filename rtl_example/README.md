import { getByAltText, getByTestId, render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
render(<App />); //runs a virtual dom you can access by 'screen'
const linkElement = screen.getByRole('link',{name:/learn react/i});
//'find on screen where \
 //get by text is this regex.You can use actual string too'.
//this is from react testing library that helps you interact witht
//the virtual dom
expect(linkElement).toBeInTheDocument();// assertion is created by
//jest.expect is a global jest object,
//and toBeInTheDocument is jest-dom and these matchers
//gets added in setUpTests.js
//
});
// to see jest custom matchers go to https://github.com/testing-library/jest-dom and scroll at the bottom
//expect(element.textContent).toBe ('hello')
//expect(customArray).toHaveLength(7)
//toBeVisible
//toBeChecked

//toHaveBeenCalled
//so jest,there are other test runners too like mocha and jasmine.but
//jest comes with create-react-app and is preferred by RTL too
//jest runs in watch mode

//SEMANTIC ELEMENTS .HOE YOU GET HOLD OF SOMETHING ON SCREEN AS PER W3C
//how do you access element on the page
//getByRole-mostly used for interactive element.this should be ur first try.like getByRole('button',{name:/submit/i})
//getByLabelText-like in forms
//getByPlaceHolderText-placeholders
//getByText-not useful in forms.But mostly used for non interactive elements]\

//if non OF ABOVE is possible.
//getByAltText-USED FOR ALT FOR image,area,input.

//ur last resort bcoz user cant see them and screen reader
//cant read them.should be getByTestId-(like where text is dynamic)

SCREEN QUERY METHODS

        command[All]ByQueryType- below is command and then all is optional and by and then query type.u can mix and match and create query.


              COMMAND

GET:EXPECT ELEMENT IN THE DOM
QUERY:EXPECT ELEMENT NOT TO BE IN THE DOM
FIND:EXPECT ELEMENT TO APPEAR ASYNC

[ALL]
IF U DONT INCLUDE,ONLY 1 MATCH
IF U INCLUDE MORE THAN 1 MATCH

                QUERY TYPE

ROLE-MOST PREFERRED
ALTTEXT-IMAGES
TEXT-NON FORM ELEMENTS
FORM:-
PLACEHOLDERTEXT
LABELTEXT
DISPLAYVALUE
u can always do screen.debug()
also u can log roles
import{logRoles} from '@testing-library/dom'
test('showe roles,()=>{
const {container}= render(<App/>)
logRoles(container)
})

//if u get error like an update to component inside a test was not wrapped in act(...) o
cant perform update on unmounted component u need to make sure ur code dont exist before awaiting for it
so use await findBy\* to make it work.
