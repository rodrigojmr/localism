# Models

# Route Handlers for REST API

METHOD ENDPOINT/ACTION DESCRIPTION

// Route handlers regarding posts
GET - '/' - List nearby places & Recent Updates and send them as JSON to the client.
GET - '/profile/:id' - Find user and send as JSON to the client.
PATCH - '/profile/:id' - Handle form submission to edit user.
DELETE - '/profile/:id' - Handle form submission to delete user. Redirect to homepage.

GET - '/feed' - List all posts, sort by date and send them as JSON to the client.
GET - '/feed/updates' - List all updates, sort by date and send them as JSON to the client.
GET - '/feed/promos' - List all promos, sort by date (?) and send them as JSON to the client.
GET - '/feed/recommendations' - List all recommendations, sort by upvotes within a certain date and send them as JSON to the client.

GET - '/place/:id' - Find place and send it as JSON to the client.
GET - '/event/:id' - Find event and send it as JSON to the client.
PATCH - '/place/:id' - Handle form submission to edit place.
PATCH - '/place/:id' - Handle form submission to edit place.
DELETE - '/event/:id' - Handle form submission to delete event.
DELETE - '/event/:id' - Handle form submission to delete event.

POST - '/recommendation' - Handle recommendation creation form submission. Send the created recommendation in JSON response.
PATCH - '/recommendation' - Handle recommendation edit form submission. Send the created recommendation in JSON response.
DELETE - '/recommendation' - Handle recommendation delete form submission. Send the created recommendation in JSON response.

// Route handlers regarding authentication
POST - '/authentication/sign-up' - Handle sign up form submission.
POST - '/authentication/sign-in' - Handle sign in form submission.
POST - '/authentication/sign-out' - Handle sign out form submission.
GET - '/authentication/me' - Load an the authenticated user

### Explanation of request methods

GET - Load data. Should not mutate anything on the server or database.
POST - Add data. Usually includes a request body. Mutate data on the server or database.
DELETE - Delete data. Usually does not include a request body. Mutate data on the server or database.
PATCH - Edit data. Usually includes a request body. Mutate data on the server or database.
PUT - Replace data. Usually includes a request body. Mutate data on the server or database.

### Client-side routes

'/' - Home view, calls service that lists nearby places from REST API
OR
'/' - Home view, calls service that lists nearby places from REST API in Google Maps & Feed with Recent Updates

'/profile/:id' - Profile view, calls service that loads user information from REST API
'/sign-in' - Sign in view
'/signup' - Sign up view

'/feed' - Feed view, by default show everything
after MVP
'/feed/updates' - Recent Updates view
'/feed/promos' - Promos view
'/feed/recommendations' - Recommendations view
'/feed/events' - Events view

'/place/:id' - Single place view, calls service that loads single place from REST API
'/event/:id' - Single event view, calls service that loads single event from REST API

'/create/recommendation' - Create recommendation view, when submitted, calls service to create recommendation
'/create/place' - Create event view, when submitted, calls service to create event: For businesses, exclusive to owners, for everything else,
needs a certain activity level or permission?
'/create/event' - Create event view, when submitted, calls service to create event

'/recommendation/:id/edit' - Edit recommendation view, calls service that loads single recommendation from REST API. Has form that, when submited, calls service that edits specific recommendation. Has second form that, when submited, calls service that deletes recommendation. - Customize depending on the type of place?
'/place/:id/edit' - Edit place view, calls service that loads single place from REST API. Has form that, when submited, calls service that edits specific place. Has second form that, when submited, calls service that deletes place. - Customize depending on the type of place?
'/event/:id/edit' - Edit event view, calls service that loads single event from REST API. Has form that, when submited, calls service that edits specific event. Has second form that, when submited, calls service that deletes event. - Customize depending on the type of place?
IDEALLY '/post/:id/edit' - Customize view & methods depending on post type, so a view/method doesn't need to be created for each one
same for DELETE
