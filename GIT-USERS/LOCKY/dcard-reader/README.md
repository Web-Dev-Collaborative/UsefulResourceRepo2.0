# Dcard reader

To start this project, use following command.
```
# cd to the project root folder 
$ npm start
```

This project is bootstrapped using CRA. 

# Structure
```
├── express
│   └── app.js
├── src
│   ├── App.js
│   ├── axios-instance.js
│   ├── container
│   │   ├── Dcard.js 
│   │   └── Dcard.module.css
│   ├── hooks
│   │   └── useAxios.js 
│   ├── index.css
│   └── index.js
└── package.json
```

- `axios-instance.js` is the file for setting up the default settings of axios instance so that we don't need 
  to append the url prefix each time when we use it.
- `container/Dcard.js` is the main file where the infinite scrolling logic locates. In this file, the posts array from
  Dcard API is rendered as a list. And we observe the last element of the post lists using built-in web API `IntersectionObserver(callback)` to detect if the last element of the lists is visible so that the program will call API again to fetch the next pagination of posts.
- `hooks/useAxios.js` is a custom hook holding the logic of fetching data using GET and managing some other states like loading, error.
- the `app.js` under express folder is used to deal with the cors issue when directly calling the Dcard API from browser.