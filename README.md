# SAY

## USER STORIES

when i type a phrase into a text area and click say button, the word is speech synthesized.

if instead I type a phrase and click save button im able to save the phrase as related to a one or more

i can create a topic and associate it to phrases

the interface allows quick access to the topics and the phrases associated to them

i have the ability to create add and remove phrases and topics as i see fit

# 1. First Steps

    initalize npm and install and require express and mongoose

    created empty app.js along with empty models views, and controllers dirs.

    allow express middleware for all routes , for json

    express middleware for rendering static html

# 2. Setting up Phrase schema

create .gitignore and add node modules to it

setup basic phrase model in phraseModel.js, export it, import it in phraseController

download dotenv, touch .env, add to git ignore

        add local port and local mongodb url value

mkdir public \*

touch server.js file and setup mongodb connection logic \*

home route working on local \*

# 3. Starting on phrase routes

setup logicless routs for regestration and phrases \*

setup basic user model in userModels.js \*

set view engine to ejs \*

install ejs ejs-mate method-override \*

        -require ejs
        -require method-override

create empty pages for view routes and check connection

    user:
        -login page (login.ejs) *
        -register page (register.ejs)*
    phrases:
        -create phrase(newPhrase.ejs)*
        -phrases index (index.ejs)*
        -phrase by id (phrase.ejs)*
        -edit phrase (edit.ejs)*


    ??? had issue rendering ,
    *** I named my User schema Phrase

    ?? having promise rejection error but routes seem to be working well

fill out basic view forms (no actions yet)

    phrases:
        edit.ejs *
        index.es *
        newPhrases.ejs *
        show.ejs *
    user:
        login.ejs *
        register.ejs *

connect and rout GET phrases to POST phrases

        create phrase *
        set newPhrase action to /phrases with a method of post *
    get phrases is working with post phrases to create new phrase in db

setup post phrases to redirect to phrase index page

        -added Add Phrase link to new phrase route from index page

setup show phrase my id page and routes \*

    - need to check up on method override right about now

delete route and page setup

    ??? problems
    *** helps to open the mongodb shell

Read a unique list of topics

    -create GET /phrases/topics
    - in phrases view touch topics.ejs

    - in the route query for the phrases and include them in the route
    -create topics.ejs in phraseView

    ? having trouble figuring out how to remove duplicates form the topics

    - next ill try to make a function in topics.ejs that contains the results of looping through phrases to list out the topics
    - then I will filter the results and render those.

    ?? no luck above
    *** the solution was to place the logic in the route
    - i created an empty topicArray,
    - loop through phrases object to push topics to topicArray,
    - then we filter topic array to remove duplicates and call the result uniqueTopics.
    - pass in uniqueTopics to the topics.ejs page
    - setup topics.ejs

    -change route to /topics

next I want to select a topic on the topic.ejs and have It show me all the phrases that have.

    plan:- I need to setup a GET /topic route
         - in the route i need to query all phrases that have the same topic and render them to a page (phrases.ejs)

         - in topic route im quering phrases that have a topic of selectedTopic

         - now I need to send the value of selectedTopic (topic selected) to the topic route from the topics route

         ** progress, when I click on a topic I get redirected to topic Phrases route with the topic in the params

        ?? when i click a topic Im redirected to topic pharses and I get the right ammount of li for the objects in the console but no phrases visible
        - ill try and make the array in the route instead and then send it to topic.ejs
        -I think the problem has something to do with phrases being an array of objects
        ***** using a for loop with an index solves this issue, in the loop i select the phrase of the object indexed

i can now view phrases by topic!

lets setup a git phrase Say route. console.log the name of the topic for now ??(working but unsure if this is the right way to do it)

    -when I click a phrase I want to log the phrase and then return to the phrases

    - Maybe the links should be buttons instead instead of trying to say via say route
    - removed say rout and ejs page
    - change links on topic.ejs to btns instead
    * working better already
    ?? cant seem to setup an event listener for the button because doucment dosent exist in express ??
    - maybe document will works now that I have jsdom
    -no luck with js dom
    - ill try to add an event listener in a script on topic.ejs, see if we can get a console.log
    ??? no luck in the script tag lets try in the route

    - lets try with node event emitters

stuck on events , emitter in my topic/:name route
