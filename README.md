# Dogs4life

<br>

## Description

A platform for Dog lovers, where the visitor can register and as a user can search for breeds, list their favourites, add and remove comments.

<br>

## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage and see the list of dog breeds, log in and sign up.
- **sign up** - As a user I want to sign up on the web page so that I can add favorite dogs to my list and comment on each breed.
- **login** - As a user I want to be able to log in on the web page so that I can get back to my account.
- **logout** - As a user I want to be able to log out from the web page so that I can make sure no one will access my account
- **Profile** - As a user I want to be able to access my profile and delete it if I want to.
- **Breeds page** - As a user I want to see a list of all dog breeds on the web page.
- **Breed details page** - As a user I want to see a page with details about a breed and comments I and other users might have left about that breed.
- **Find a Breed** - As a user I want to have quick access to a specific breed.
- **Favorites** - As a user I want to see the list of my favorites and have quick access to them.

<br>

## Server Routes (Back-end):

| **Method** | **Route**                          | **Description**                                                          | Request - Body                                           |
| ---------- | ---------------------------------- | ------------------------------------------------------------------------ | -------------------------------------------------------- |
| `GET`      | `/`                                | Main page route. Renders home `index` view.                              |                                                          |
| `GET`      | `/login`                           | Renders `login` form view.                                               |                                                          |
| `POST`     | `/login`                           | Sends Login form data to the server.                                     | { email, password }                                      |
| `GET`      | `/signup`                          | Renders `signup` form view.                                              |                                                          |
| `POST`     | `/signup`                          | Sends Sign Up info to the server and creates user in the DB.             | { email, password }                                      |
| `GET`      | `/breeds`            | Renders a page with a  cards list of all dog breeds from the DB. | { allBreeds, image, currentUser } |view.                         |                                                          |
| `GET`      | `/breeds/search`            | Private Route. Allows the user to search for a breed. | { allBreeds, currentUser }  |
| `GET`      | `/breed/:breedId`               | Private route. Renders the breed details page | { breed, image, currentUser }                                                                                    
| `GET`     | `/user/profile`              | Private Route. Renders the User profile page.                 | { currentUser }                          |
| `POST`   | `/user/profile/delete` | Private Route. Deletes the existing User profile user.      |                                                          |
| `GET`      | `/user/favorites`                     | Private Route. Renders a User's favorites page | { currentUser, userFavorites } | view.                                              |                                                          |
| `POST`      | `/ruser/favorites/add/:breedId`         | Private Route. Adds a favorite breed to the User's favorites 
view.
| `POST`      | `/user/comments/add/:breedId`                                | Private Route. Adds a comment to by a User to the breed details page view.                              |                                                          |
| `POST`      | `/user/comments/remove/:breedId/:commentId`                                | Private Route. Removes a comment by a User from the breed details page view.                              |                                                          |
particular.             |                                                          |

## Models

User model

```javascript
{
  username: String,
  email: String,
  password: String,
  favorites: [{}],
  comments: [{}]
}

```

Comments model

```javascript
{
  content: String,
  author: {},
  breedRelated: [{}]
}

```

Breed model

```javascript
{
  weight: {},
  height: {},
  id: Number,
  name: String,
  bred_for: String,
  breed_group: String,
  life_span: String,
  temperament: String,
  origin: String,
  ref_img_id: String,
  image: String,
  comments: [{}]
}

```

<br>

## API's

The Dog API

<br>

## Packages

Ironlauncher

<br>

## Backlog

<br>

## Links

### Git

The url to your repository and to your deployed project

[Repository Link](https://github.com/AakaiLeite/dogs4life)

[Deploy Link](https://dogs4life.onrender.com/)

<br>

### Slides

The url to your presentation slides

[Slides Link](https://www.canva.com/design/DAFrzh6YWQM/mnqeo3TbCLmJVbdoeADe8A/view?utm_content=DA[…]WQM&utm_campaign=designshare&utm_medium=link&utm_source=viewer)

### Contributors

Miguel Leite - [`<AakaiLeite>`](https://github.com/AakaiLeite) - [`<linkedin-profile-link>`](https://www.linkedin.com/in/mikeleite/)

João Elias - [`<johnseliseto>`](https://github.com/johnseliseto) - [`<linkedin-profile-link>`](https://www.linkedin.com/in/jpelias24)
