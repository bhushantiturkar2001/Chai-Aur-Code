function customeReader(reactElemet, container) {
  //   // Repeat task for attribute
  //   const domElement = document.createElement(reactElemet.type);
  //   domElement.innerHTML = reactElemet.children;
  //   domElement.setAttribute("href", reactElemet.props.href);
  //   domElement.setAttribute("target", reactElemet.props.target);
  //   container.appendChild(domElement);

  // Optimize way for in loop 
  const domElement = document.createElement(reactElemet.type);
  domElement.innerHTML = reactElemet.children;

  for (const prop in reactElemet.props) {
    if (prop == "children") continue; //fro innere child escape

    domElement.setAttribute(prop, reactElemet.props[prop]);
  }

  container.appendChild(domElement);
}

// How react create html after render
const reactElemet = {
  type: "a",
  props: {
    href: "https://google.com",
    target: "_blank",
  },
  children: "Click me to go google website",
};  

// vritula dom
const maiaContainer = document.querySelector("#root");

customeReader(reactElemet, maiaContainer);
