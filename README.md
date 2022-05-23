AUTH /api/auth/

|  Method  | URL | Description | Protected | Roles |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| POST  | /signup  | Signup |    |  |
| POST  | /login  | Login | Yes  | All |
| POST  | /logout | Logout  | Yes  | All |

USERS /api/users

|  Method  | URL | Description | Protected | Roles |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| GET  | /  | Users  | Yes  | Admin |
| GET  | /id  | User profile  | Yes  | User |
| PUT  | /:id/edit  | Edit user profile | Yes  | User |
| DELETE  | /:id/delete  | Delete user profile  | Yes  | All |

BOARDGAMES /api/boardgames

|  Method  | URL | Description | Protected | Roles |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| GET  | /  | Games   |   |  |
| POST  | /create  | Create boardgames   | Yes  | All |
| PUT | /:id/edit  | Edit boardgames  | Yes  | All |
| DELETE  | /:id/delete  | Delete boardgames  | Yes  | All |
| GET  | /:id/like ? | Like boardgames  | Yes  | All |
| POST | /:id/dislike ?  | Dislike boardgames | Yes  | All |

MATCH /api/match

|  Method  | URL | Description | Protected | Roles |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| GET  | /  | Matches list   |   |  |
| POST  | /create  | Create matches   | Yes  | All |
| PUT | /:id/edit  | Edit matches  | Yes  | All |
| DELETE  | /:id/delete  | Delete matches  | Yes  | All |
| GET | /:id/join  | Join matches | Yes  | All |
| GET | /:id/unjoin  | Unjoin matches | Yes  | All |

EVENT /api/event

|  Method  | URL | Description | Protected | Roles |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| GET  | /  | Events   |   |  |
| POST  | /create  | Create event   | Yes  | Admin |
| PUT | /:id/edit  | Edit event  | Yes  | Admin |
| DELETE  | /:id/delete  | Delete event  | Yes  | Admin |
| GET | /:id/join  | Join event | Yes  | All |
| GET | /:id/unjoin  | Unjoin event | Yes  | All |


GAME BOOKING /api/bookings

|  Method  | URL | Description | Protected | Roles |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| GET  | /  | Boardgames to rent list   |   |  |
| POST  | /create  | Create booking   | Yes  | User |
| PUT | /:id/edit  | Edit booking  | Yes  | User |
| DELETE  | /:id/delete  | Delete booking  | Yes  | User |


------------- CLIENTE --------------------

| /  | Home   |

AUTH

| URL | Description |
| ------------- | ------------- |
| /signup  | Sign Up   |
| /login  | Login   |

USUARIO

| URL | Description |
| ------------- | ------------- |
| /profile  | Profile   |
| /profile/bookings  | Bookings   |

LISTA JUEGOS

| URL | Description |
| ------------- | ------------- |
| /boardgames  | Games   |
| /boardgames/details  | Game details   |
| /boardgames/edit  | Edit game   |

LISTA JUEGOS PARA PRESTAR

| URL | Description |
| ------------- | ------------- |
| /rentgames  | Rent games list   |
| /rentgames/details  | Rent game details   |
| /rentgames/edit  | Rent game edit   |

LISTA PARTIDAS

| URL | Description |
| ------------- | ------------- |
| /match  | Matches list   |
| /match/details  | Match details   |
| /match/edit  | Edit match   |

LISTA EVENTOS

| URL | Description |
| ------------- | ------------- |
| /event  | Events list   |
| /event/details  | Event details   |
| /event/edit  | Edit event   |

LISTA ALQUILER

| URL | Description |
| ------------- | ------------- |
| /bookings  | Booking games   |
| /bookings/details  | Booking games details   |

```
LISTA DE COMPONENTES
├── src
│    └── Components
│       └── NavBar
│       └── FiltersBar
│       └── LikeGamesButton
│       └── DislikeGamesButton
│       └── Games
│       │    │── GamesList
│       │    │── CardGame
│       │    │── CommentsGame
│       │    │── CreateGameForm
│       │    └── EditGameForm
│       └── RentGames
│       │    │── RentGamesList
│       │    │── CardRentGame
│       │    │── CreateRentGameForm
│       │    └── EditRentGameForm
│       └── Matches
│       │    │── MatchesList
│       │    │── CardMatch
│       │    │── CreateMatchForm
│       │    └── EditMatchForm
│       └── Events
│       │    │── EventsList
│       │    │── CardEvent
│       │    │── CreateEventForm
│       │    └── EditEventForm
│       └── User
│       │    │── CardUser
│       │    │── UserList
│       │    │── FavGames
│       │    │── MyGames
│       │    │── MyRentGames
│       │    └── EditUserForm
│       └── Auth
│       │    │── SignUpForm
│       │    └── LoginForm
│       └── Footer
│       └── Spinner


PAGES
  └── HomePage

  └── GamesPage  - HUGO
  └── GameDetailsPage - HUGO
  └── EditGamePage
  └── CreateGamesPage
  └── RentGamesDetailsPage 
  └── EditRentGamesPage

  └── MatchesPage - ALVARO
  └── MatchesDetailsPage - ALVARO
  └── EditMatchesPage

  └── UserProfilePage - MARIA
  └── EditUserProfilePage
  └── UserProfileBookingsPage

  └── SignUpPage - MARIA
  └── LoginPage - MARIA
```
