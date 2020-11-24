## How to use
On loading the site, you'll be prompted for your Giphy API key. Enter it, and if it's valid, you should be redirected to a grid of infinitely-scrollable, clickable Giphy images with a search bar on the top.

## How I made it
I indeed started with `create react-app` (of the `TypeScript`) variety, i.e.:

```
yarn create react-app signal-takehome --template typescript
```

and went from there. Pretty straightforward.

## Things I'd do if I had more time
First and foremost, I'd add test coverage: that's probably the most glaring omission at the moment. I might also refine the debouncing behavior of the search and scroll functions of the app and add some fit and finish to the design—perhaps opt for a background color other than white, add radiuses and/or borders the images, add more loading spinners, etc. The app's also got some components which are built as classes; I might try to port those other to purely functional components and make more extensive use of React hooks. While I'm at it, I've got the basic bones of TypeScript integrated into the code, but I could certainly be more precise with them and take better advantage of the types included in the third-party libraries utilized in this app, e.g. `ThunkAction` instead of `Promise<void>`. Oh, and mobile views—but then again, this is Signal _Desktop_, amirite? :P

## Interesting tradeoffs, design choices, etc.
### Generating image URLs
Looking at the `/trending` and `/search` endpoints in the Giphy API, it would appear that there are a great many links returned for each image—I noticed a pattern and determined that the only real pieces of information that were important to bring into this app's Redux store were the image `id`, which could be interpolated into standard formats of the Giphy URL, e.g.

```javascript
`https://i.giphy.com/media/${id}/200w.gif`
```

and the image `title`, which I would pass along as the image `alt` text to pictures rendered in the app. I also realized that the URLs which came back contained e.g. `media0` or `media1` in the subdomain, but those would render Giphy headers and footers on the images; replacing these subdomains with `i` rendered purely the images themselves, which I found made for a nicer user experience. I do realize that these oh-so-clever tricks do make this code a bit more brittle; should Giphy decide to restructure the way they generate their URLs, my code would break, whereas a version of it that explicitly used the URLs passed down from the Giphy API might not, but for the reasons aforementioned, it was a tradeoff I was willing to make.

### Implementing search-as-you-type
I added search-as-you-type as opposed to having a separate submit button on the search bar, as:
1. it made for a more enjoyable user experience
1. it made for a more interesting problem, as a superfluous number of API calls in rapid succession make a pretty strong case for incorporating debouncing, which I did

### Handling credentials
I didn't want to check my Giphy API key into the repo for obvious reasons and so decided to go with a super streamlined "login" prompt, where the user is prompted for their own Giphy API key before being redirected to the main infinitely scrolling view. I reduce the user's API key into the Redux store, which has the benefit of vanishing from the browser cache as soon as the page is closed or reloaded—yay, no logout necessary!—but also the detriment of vanishing should the user reload the page: live by the sword, and die by it, too. Revisiting the topic of things I'd do if I had more time, I could have persisted it into browser local storage and then added a logout option as well. (Adding OAuth and/or a separate server to store Giphy credentials and manage user sessions is beyond the scope of this takehome project...)
