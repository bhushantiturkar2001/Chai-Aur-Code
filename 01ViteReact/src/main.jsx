import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import React from 'react'

// How react create html after render it not works here cause render have its owed proper but in
// customer react we crete it manually dom element to render 
// const reactElemet = {
//   type: "a",
//   props: {
//     href: "https://google.com",
//     target: "_blank",
//   },
//   children: "Click me to go google website",
// };

// This type is supported by render method

// By default injec bable transpiler 
const reactElemet = React.createElement(
  'a',
  {href:'https://www.flipkart.com/', target: '_blank'},
  'click me to go filpcart'
)

createRoot(document.getElementById('root')).render(
  reactElemet
)
