# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

Project overview :-

-  step 1: 
        ratings array of rating objects   -   store id, rating, message
        selectedRating                    -   store rating
        message                           -   store message
        editing                           -   for index

-    step 2: 
        useEffect()              -   stop repeatation
        setItem, getItem         -   save ratings array in local storage
        inspect ->  application ->  data
        also add in localstorage||sessionstorage

-    step 3: handleSubmit()  -   handles for submition

-    step 4: handleDelete()  -   Delete feedback entry

-    step 5: handleEdit()    -   handle edit button

-    step 6: calculate average rating

-    step 7: html and css code

start 

step 1: npm create vite@latest
step 2: npm i
step 3: npm run dev

end
