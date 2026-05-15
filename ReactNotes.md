# React Notes - Chai Aur Code

---

## Lecture #1: Basics

---

### 1) Why Learn React?
- Makes it easy to **manage & build complex applications**

---

### 2) Single Element Rule + Fragment
- In React we can **return only one element**
- To solve that, two options are introduced:

| Option | Syntax |
|--------|--------|
| Fragment | `<> </>` |
| Div | `<div> </div>` |

---

### 3) JSX Expressions `{}`
```jsx
const username = "Admin"
<h1>Chai aur {username}</h1>
```
- `{}` is an **evaluated expression** — it shows the final outcome of a variable
- It is NOT full JavaScript — only final outcomes like variables, ternary, function calls
- You **cannot** write `if/else` directly inside JSX — use ternary instead

---

### 4) Why Do We Need Hooks?
- Hooks are **simple functions that help do some task**
- **Problem:** Count increases on button click but the UI doesn't update
- **Solution:** Hooks like `useState` are ready-made functions that update the current state and re-render the UI

---

### 5) What is Babel?
- Babel is a JavaScript **compiler (transpiler)** for React
- Converts modern JS (JSX + ES6+) into backward-compatible JavaScript

```
JSX → React.createElement() → Virtual DOM object
```

---

### 6) Hooks

#### I) `useState()`
- Responsible for **changing the state**
- "Change" means propagating the updated value to the UI/DOM

```js
const [counter, setCounter] = useState(0);
```
- `counter` → the variable (current value)
- `setCounter` → the method that controls/updates the variable
- When `counter` updates, React re-renders everywhere it's used

---

#### II) `useCallback()`
- Caches a function definition between re-renders
- Prevents unnecessary function recreation
- Returns a **memoized version** of the callback — only changes if dependencies change

```js
const memoizedFn = useCallback(fn, dependencies);
```

- **Dependencies** = things that can cause this function to change
- Example in password generator: `[length, charAllow, numberAllow, setPassword]`
- "Mere pass function usse jitana ho sake utna cache/memory main rakh lo — jab re-run ho tab jo purana part hai usse use kar lo"

---

#### III) `useEffect()`
- Runs **after the component renders**
- Used to trigger side effects (API calls, DOM updates, etc.)
- After changing a value, it reflects on the UI

---

#### IV) `useRef()`
- Used to create a **reference to a DOM element**
- Example: copying text to clipboard — you ref the input, then use `.select()` on it

---

#### V) `useId()`
- Generates **unique IDs** for elements within a component
- Ensures IDs are unique across the entire application
- Useful for **accessibility** — linking form inputs with their labels

---

#### VI) `forwardRef`
- Lets a parent component pass a `ref` down to a child component's DOM element

---

### 7) `createRoot` & Fiber Algorithm

#### `createRoot`
- Creates its own **Virtual DOM**
- Only updates what changed — no full page reload

#### Keys in Lists
- When converting arrays into lists/buttons, **keys are required**
- Fiber algorithm: to improve list performance, each iteration needs a unique key
- Keys should be **stable** and **unique**

#### Fiber (React 16+)
- New **reconciliation engine** — also called the **Diffing Algorithm**
- Allows React to:
  - Pause work and come back to it later
  - Assign priority to different types of work
  - Reuse previously completed work
  - Abort work if it's no longer needed
- Enables showing bulk data progressively → better UX

---

### 8) Tailwind Setup (Version 3)

```bash
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
```

`tailwind.config.js`:
```js
content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"]
```

`index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- Install **Tailwind CSS IntelliSense** plugin for VS Code

**To remove a broken install:**
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
```

---

### 9) What are Props?
- Used to **pass properties to reuse a component** (like cards)

```jsx
<Cards mission="Alice mission one" />
```

```jsx
export default function Cards({ mission }) { ... }
```

- If passing an **object**, use `props.name`, `props.getId` etc.
- If passing a **single value**, destructure it directly `({ mission })`

---

### 10) `setCharAllowed((prev) => !prev)`
- Simple **callback function** that uses the previous state
- Gives you the previous value so you can toggle/change it safely

```js
setCharAllowed((prev) => !prev)
// prev = false → returns true
// prev = true  → returns false
```

---

### 11) React Router DOM

```bash
npm i react-router-dom
```

---

### 12) Context API — Context Provider

#### I) Prop Drilling
- Passing props from parent → child → grandchild even when middle components don't need it
- Called **prop drilling** — messy and hard to maintain
- **Solution:** Context API (also solved by Redux, Zustand)

#### II) Steps to Create Context API

```js
// xyz.js
const UserContext = React.createContext()   // 1. Create it
export default UserContext                  // 2. Export it
```

```js
// Full example with custom hook
import { createContext, useContext } from "react";

export const ToDoContext = createContext({
  todos: [{ id: 1, todo: "To do message", completed: false }],
  addToDo: (todo) => {},
  updateToDo: (id, todo) => {},
  deleteToDo: (id) => {},
  toggleComplete: (id) => {}
  // Like an interface — just defines the shape
})

export const useToDo = () => {
  return useContext(ToDoContext)
}

export const ToDoProvider = ToDoContext.Provider
```

#### III) When to Use Context vs Redux Toolkit
- Context = simpler apps, light state sharing
- Redux Toolkit = complex apps, large state, async logic

---

### 13) Redux and Redux Toolkit

#### Redux
- **Centralized state management** library (single store for entire app)
- Uses **actions + reducers** to update state predictably
- Good for large apps with complex data flow

#### Redux Toolkit (RTK)
- Modern, **official way** to use Redux (simplifies everything)
- Removes boilerplate using `createSlice`, `configureStore`
- Built-in support for immutability, DevTools, async logic

---

### 14) Why Shift from Flux → Redux?

| # | Reason | Detail |
|---|--------|--------|
| I | Simpler architecture | Flux = multiple stores, Redux = **single store** → easier to manage & debug |
| II | Predictable state updates | Redux uses **pure reducers** → same input = same output → no confusion |
| III | Better developer experience | Redux DevTools (time travel debugging) + less complexity → faster development |

---

### 15) Redux Core Concepts

#### I) Store
- Central place where all app data (state) is stored
- Created using `configureStore()`
- Only **one store** in Redux
- Think: *"Database of frontend"*

#### II) Reducer
- A function that decides **how state should change**
- Takes: `(currentState, action)` → Returns: `newState`
- Think: *"Logic that updates store"*

#### III) `useSelector`
- Used to **read data** from the store
- Think: *"Get data from store"*

```js
const count = useSelector((state) => state.counter.value);
```

#### IV) `useDispatch`
- Used to **send an action** to the reducer → triggers state change

```js
dispatch(increment());
```

---

### 16) Redux Toolkit Setup

```bash
npm install @reduxjs/toolkit
npm install react-redux
```


---

## Lecture #2: MegaBlog Project — Hooks, RTK & Features Used

---

### 17) Project Overview — What We Built
- Full stack blog application — MegaBlog
- Users can register, login, create posts, edit posts, delete posts
- Protected routes — only logged in users can add/edit/delete
- Only the **author** of a post can edit or delete it
- Frontend: React + Redux Toolkit + React Router + React Hook Form + TinyMCE
- Backend: Spring Boot + JWT + MySQL

---

### 18) Environment Variables with Vite
- Never hardcode API URLs — use `.env` file
- Vite reads variables prefixed with `VITE_`
- Access them via `import.meta.env.VITE_VARIABLE_NAME`
- Wrap in `String()` to avoid `undefined` becoming a string literally

**Where used:** `conf/conf.js` — single place to read all env vars, then import `conf` everywhere

---

### 19) Service Layer Pattern (Class-based)
- Instead of calling API directly in components, we create a **service class**
- All API logic lives in one place — easy to swap backend (Appwrite → custom backend)
- Components just call `authService.login()`, `appwriteService.getPosts()` etc.
- Two service files:
  - `appwrite/auth.js` → AuthService class (register, login, getCurrentUser, logout)
  - `appwrite/config.js` → Service class (createPost, updatePost, deletePost, getPost, getPosts, uploadFile, deleteFile, getFilePreview)

**Why class?** Group related methods together, share the axios instance, easy to export a single instance

---

### 20) Axios Instance + Interceptors
- Create one axios instance with `baseURL` set — no need to repeat URL in every call
- **Interceptor** = middleware that runs before every request automatically
- Used to attach JWT token from `localStorage` to every request header
- `api.interceptors.request.use()` — runs before request is sent

**Where used:** Both `auth.js` and `config.js` — token auto-attached to all protected API calls

---

### 21) Redux Toolkit in MegaBlog — `authSlice`

#### What state we store
- `status` → boolean (is user logged in?)
- `userData` → object with user info (`$id`, `name`, `email`)

#### Two actions
- `login(action.payload.userData)` → sets `status: true`, stores user data
- `logout()` → sets `status: false`, clears user data

#### Where each is used

| Action / Selector | Used In | Why |
|---|---|---|
| `dispatch(login({userData}))` | App.jsx, Login.jsx, Signup.jsx | After successful auth, update global state |
| `dispatch(logout())` | LogoutBtn.jsx | After logout API call, clear global state |
| `useSelector(state => state.auth.status)` | Header.jsx, AuthLayout.jsx | Show/hide nav items, protect routes |
| `useSelector(state => state.auth.userData)` | Post.jsx, PostForm.jsx | Check if current user is the author |

---

### 22) `useState` in MegaBlog

Used in almost every component for local state:

| Component | State | Purpose |
|---|---|---|
| App.jsx | `loading` | Show nothing until auth check is done on app start |
| AuthLayout.jsx | `loader` | Show "Loading..." while checking auth status |
| Login.jsx | `error` | Show error message if login fails |
| Signup.jsx | `error` | Show error message if register fails |
| Home.jsx | `posts` | Store fetched posts list |
| AllPosts.jsx | `posts` | Store all posts list |
| Post.jsx | `post` | Store single post data |
| EditPost.jsx | `post` | Store post being edited |

---

### 23) `useEffect` in MegaBlog

Runs after render to fetch data or check auth:

| Component | What it does |
|---|---|
| App.jsx | On app load — calls `getCurrentUser()`, dispatches login/logout based on result |
| AuthLayout.jsx | Watches `authStatus` — redirects to `/login` or `/` based on auth + route requirement |
| Home.jsx | Fetches all active posts on mount |
| AllPosts.jsx | Fetches all posts on mount |
| Post.jsx | Fetches single post by slug/id from URL params |
| EditPost.jsx | Fetches post by slug to pre-fill the form |
| PostForm.jsx | Watches `title` field — auto-generates slug from title using `watch` |

---

### 24) `useSelector` in MegaBlog
- Reads data from Redux store
- Used to get `authStatus` and `userData` from `state.auth`

| Component | What it reads | Why |
|---|---|---|
| Header.jsx | `state.auth.status` | Show Login/Signup or All Posts/Add Post/Logout |
| AuthLayout.jsx | `state.auth.status` | Decide whether to redirect or allow access |
| Post.jsx | `state.auth.userData` | Compare `userData.$id` with `post.userId` to show Edit/Delete |
| PostForm.jsx | `state.auth.userData` | Pass `userData.$id` as `userId` when creating a post |

---

### 25) `useDispatch` in MegaBlog
- Sends actions to Redux store to update state

| Component | Action dispatched | When |
|---|---|---|
| App.jsx | `login({userData})` or `logout()` | On app start after checking current user |
| Login.jsx | `login({userData})` | After successful login |
| Signup.jsx | `login({userData})` | After successful register |
| LogoutBtn.jsx | `logout()` | After logout API call resolves |

---

### 26) `useNavigate` in MegaBlog
- Programmatic navigation — redirect user without clicking a link

| Component | Navigates to | When |
|---|---|---|
| AuthLayout.jsx | `/login` or `/` | If auth check fails for the route |
| Login.jsx | `/` | After successful login |
| Signup.jsx | `/` | After successful register |
| Header.jsx | nav item slug | When nav button is clicked |
| Post.jsx | `/` | If post not found, or after delete |
| EditPost.jsx | `/` | If no slug in URL |
| PostForm.jsx | `/post/:id` | After create or update post |

---

### 27) `useParams` in MegaBlog
- Reads dynamic URL parameters like `/post/:slug`
- Used to know **which post** to fetch

| Component | Param | Used for |
|---|---|---|
| Post.jsx | `slug` | Fetch the post to display |
| EditPost.jsx | `slug` | Fetch the post to pre-fill edit form |

---

### 28) `useCallback` in MegaBlog
- Used in `PostForm.jsx` for the `slugTransform` function
- Converts post title → URL-friendly slug (lowercase, hyphens, no special chars)
- Wrapped in `useCallback` so it doesn't get recreated on every render
- Dependency array is empty `[]` — function never changes

---

### 29) `useId` in MegaBlog
- Used in `Input.jsx` and `Select.jsx` components
- Generates a unique ID for each input field
- Links `<label htmlFor={id}>` with `<input id={id}>`
- Ensures accessibility — screen readers can associate label with input correctly

---

### 30) `forwardRef` in MegaBlog
- Used in `Input.jsx` and `Select.jsx`
- Allows parent components to pass a `ref` down to the actual `<input>` / `<select>` DOM element
- Required because React Hook Form uses refs internally to register fields
- Without `forwardRef`, the ref would be lost at the component boundary

---

### 31) React Hook Form (`react-hook-form`)
- Library for handling forms — replaces manual `useState` for every field
- Much less code, built-in validation, better performance

#### What we use from it

| Method / Property | Where | Purpose |
|---|---|---|
| `useForm()` | Login, Signup, PostForm | Initialize the form |
| `register` | All form fields | Connect input to form state |
| `handleSubmit` | form `onSubmit` | Validate then call our submit function |
| `watch` | PostForm | Watch `title` field to auto-generate slug |
| `setValue` | PostForm | Programmatically set slug value |
| `control` | PostForm → RTE | Pass control to Controller for non-native inputs |
| `getValues` | PostForm | Read current form values |
| `defaultValues` | PostForm | Pre-fill form when editing an existing post |

#### `Controller` component
- Used to connect **non-native inputs** (like TinyMCE editor) to react-hook-form
- Wraps the editor and passes `onChange` and `value` to it

---

### 32) TinyMCE Rich Text Editor (`@tinymce/tinymce-react`)
- Used in `RTE.jsx` for the blog post content editor
- Full WYSIWYG editor — bold, italic, lists, images, links etc.
- Controlled via react-hook-form's `Controller`
- `value` prop keeps it in sync with form state
- `onEditorChange` fires when user types — updates form state via `onChange`

---

### 33) `html-react-parser`
- Used in `Post.jsx` to render the blog post content
- TinyMCE saves content as **HTML string**
- `parse(post.content)` converts that HTML string → actual React elements
- Without this, the raw HTML tags would show as text on screen

---

### 34) Protected Routes — `AuthLayout` Component
- Wraps routes that need authentication
- Two modes controlled by `authentication` prop:
  - `authentication={true}` → must be logged in (Add Post, Edit Post, All Posts)
  - `authentication={false}` → must be logged OUT (Login, Signup — redirect if already logged in)
- Uses `useSelector` to read auth status from Redux
- Uses `useEffect` to redirect if condition not met
- Shows "Loading..." while checking — prevents flash of wrong content

---

### 35) React Router DOM in MegaBlog

#### Setup
- `createBrowserRouter` — defines all routes as a config array
- `RouterProvider` — provides router to the whole app
- `Provider` (Redux) wraps `RouterProvider` so all routes have store access

#### `<Outlet />`
- Used in `App.jsx` — renders the matched child route component
- App.jsx is the layout shell (Header + main + Footer), `<Outlet>` is where page content goes

#### Route structure
- `/` → Home (public)
- `/login` → Login (only if NOT logged in)
- `/signup` → Signup (only if NOT logged in)
- `/all-posts` → AllPosts (must be logged in)
- `/add-post` → AddPost (must be logged in)
- `/edit-post/:slug` → EditPost (must be logged in)
- `/post/:slug` → Post (public)

---

### 36) Author Check — `isAuthor`
- In `Post.jsx`, Edit and Delete buttons only show if the logged-in user is the author
- Compare `post.userId` (stored when post was created) with `userData.$id` (from Redux)
- If they match → `isAuthor = true` → show Edit/Delete buttons
- This is a **frontend check** — backend also enforces it (403 Forbidden if not owner)

---

### 37) Slug — What and Why
- A slug is a URL-friendly version of the post title
- Example: "My First Blog Post" → `my-first-blog-post`
- Used in the URL: `/post/my-first-blog-post`
- Auto-generated from title using `slugTransform` in PostForm
- Transformation: trim → lowercase → replace special chars with `-` → replace spaces with `-`

---

### 38) `...props` and `...register` Pattern
- `...props` = spread all remaining props onto the element (className, placeholder, type etc.)
- `...register("fieldName", rules)` = react-hook-form registers the field AND spreads `name`, `ref`, `onChange`, `onBlur` onto the input
- This is why `Input` and `Select` components work with react-hook-form without any extra wiring

---

### 39) Barrel Export — `components/index.js`
- Single file that imports and re-exports all components
- Instead of: `import Header from './components/Header/Header'`
- You write: `import { Header } from './components'`
- Cleaner imports, one place to manage all component exports
