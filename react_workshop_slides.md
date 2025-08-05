# React Frontend Development Workshop

*A hands-on introduction to modern React development*

---

## Workshop Agenda

1. **Node.js & npm Foundation**
2. **Project Setup with Vite**
3. **React Components Fundamentals**
4. **Component Lifecycle**
5. **React Hooks (useState & useEffect)**
6. **Routing with React Router**
7. **State Management with Context API**
8. **Building a Complete Mini Project**

---

## 1. Node.js & npm Foundation

### What is Node.js?
- **Runtime environment** for executing JavaScript outside the browser
- Built on Chrome's V8 JavaScript engine
- Enables server-side JavaScript development
- **Essential for modern frontend tooling**

### What is npm?
- **Node Package Manager** - world's largest software registry
- Manages JavaScript packages and dependencies
- Comes bundled with Node.js installation
- Think of it as an "app store" for JavaScript libraries

### Quick Setup Check
```bash
# Check if Node.js is installed
node --version

# Check npm version
npm --version

# If not installed, download from nodejs.org
```

### Essential npm Commands
```bash
# Initialize a new project
npm init

# Install a package
npm install package-name

# Install globally
npm install -g package-name

# Run scripts
npm run script-name
```

---

## 2. Project Setup with Vite

### Why Vite?
- **Lightning fast** development server
- **Hot Module Replacement (HMR)** - instant updates
- **Modern tooling** with minimal configuration
- **Optimized builds** for production

### Creating Your First React Project

```bash
# Create new React project with Vite
npm create vite@latest my-react-app -- --template react

# Navigate to project directory
cd my-react-app

# Install dependencies
npm install

# Start development server
npm run dev
```

### Project Structure Overview
```
my-react-app/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

### Key Files Explained
- **`main.jsx`** - Entry point, renders the root component
- **`App.jsx`** - Main application component
- **`index.html`** - HTML template
- **`package.json`** - Project configuration and dependencies

---

## 3. React Components Fundamentals

### What are Components?
- **Reusable pieces of UI**
- Like JavaScript functions that return HTML (JSX)
- Can accept inputs (props) and maintain state

### Functional Components (Modern Approach)

```jsx
// Simple Component
function Welcome() {
  return <h1>Hello, World!</h1>;
}

// Component with Props
function Greeting({ name, age }) {
  return (
    <div>
      <h2>Hello, {name}!</h2>
      <p>You are {age} years old.</p>
    </div>
  );
}

// Using the Component
function App() {
  return (
    <div>
      <Welcome />
      <Greeting name="Arun" age={20} />
      <Greeting name="Priya" age={21} />
    </div>
  );
}
```

### JSX Rules
1. **Return single parent element** (or use React.Fragment)
2. **Use className instead of class**
3. **Close all tags** (including self-closing ones)
4. **Use camelCase for attributes**

```jsx
// ✅ Correct JSX
function MyComponent() {
  return (
    <div className="container">
      <img src="image.jpg" alt="Description" />
      <p>This is a paragraph</p>
    </div>
  );
}

// ✅ Using Fragment
function MyComponent() {
  return (
    <>
      <h1>Title</h1>
      <p>Content</p>
    </>
  );
}
```

### Hands-on Exercise 1: Create Your First Component

**Task:** Create a `StudentCard` component that displays student information.

```jsx
// StudentCard.jsx
function StudentCard({ name, course, year, university }) {
  return (
    <div className="student-card">
      <h3>{name}</h3>
      <p><strong>Course:</strong> {course}</p>
      <p><strong>Year:</strong> {year}</p>
      <p><strong>University:</strong> {university}</p>
    </div>
  );
}

export default StudentCard;
```

```jsx
// App.jsx
import StudentCard from './StudentCard';

function App() {
  return (
    <div className="app">
      <h1>CS Students - University of Jaffna</h1>
      <StudentCard 
        name="Rajesh Kumar" 
        course="Computer Science" 
        year="3rd Year"
        university="University of Jaffna"
      />
      <StudentCard 
        name="Meera Selvam" 
        course="Computer Science" 
        year="2nd Year"
        university="University of Jaffna"
      />
    </div>
  );
}
```

---

## 4. Component Lifecycle

### Understanding Component Lifecycle
Components go through different phases:
1. **Mounting** - Component is created and inserted into DOM
2. **Updating** - Component re-renders due to state/props changes
3. **Unmounting** - Component is removed from DOM

### Lifecycle in Functional Components (with Hooks)

```jsx
import { useEffect } from 'react';

function LifecycleDemo() {
  // Mounting & Updating
  useEffect(() => {
    console.log('Component mounted or updated');
  });

  // Mounting only (empty dependency array)
  useEffect(() => {
    console.log('Component mounted');
  }, []);

  // Cleanup (Unmounting)
  useEffect(() => {
    return () => {
      console.log('Component will unmount');
    };
  }, []);

  return <div>Lifecycle Demo Component</div>;
}
```

---

## 5. React Hooks - useState & useEffect

### useState Hook - Managing Component State

```jsx
import { useState } from 'react';

function Counter() {
  // Declare state variable
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div className="counter">
      <h2>Count: {count}</h2>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}
```

### Multiple State Variables

```jsx
function UserProfile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);

  return (
    <form>
      <input 
        type="text" 
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input 
        type="email" 
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input 
        type="number" 
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(Number(e.target.value))}
      />
      <div className="preview">
        <h3>Preview:</h3>
        <p>Name: {name}</p>
        <p>Email: {email}</p>
        <p>Age: {age}</p>
      </div>
    </form>
  );
}
```

### useEffect Hook - Side Effects

```jsx
import { useState, useEffect } from 'react';

function DataFetcher() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data when component mounts
  useEffect(() => {
    fetchUsers();
  }, []); // Empty dependency array = run once on mount

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const userData = await response.json();
      setUsers(userData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading users...</div>;
  }

  return (
    <div>
      <h2>Users List</h2>
      {users.map(user => (
        <div key={user.id} className="user-card">
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}
```

### Hands-on Exercise 2: Todo App with Hooks

**Task:** Build a simple todo application using useState.

```jsx
import { useState } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, {
        id: Date.now(),
        text: inputValue,
        completed: false
      }]);
      setInputValue('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="todo-app">
      <h2>My Todo List</h2>
      <div className="todo-input">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new todo..."
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <span onClick={() => toggleTodo(todo.id)}>
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

## 6. Routing with React Router

### Installation

```bash
npm install react-router-dom
```

### Basic Routing Setup

```jsx
// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

### Creating Routes

```jsx
// App.jsx
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import NotFound from './components/NotFound';

function App() {
  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/contact" className="nav-link">Contact</Link>
      </nav>

      {/* Routes */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </main>
    </div>
  );
}
```

### Route Parameters

```jsx
import { useParams, useNavigate } from 'react-router-dom';

// Student Detail Component
function StudentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [student, setStudent] = useState(null);

  useEffect(() => {
    // Fetch student data based on ID
    fetchStudentById(id).then(setStudent);
  }, [id]);

  const goBack = () => {
    navigate(-1); // Go back to previous page
  };

  if (!student) {
    return <div>Loading student details...</div>;
  }

  return (
    <div className="student-detail">
      <button onClick={goBack}>← Back</button>
      <h2>{student.name}</h2>
      <p>Student ID: {student.id}</p>
      <p>Course: {student.course}</p>
    </div>
  );
}

// In your Routes
<Route path="/student/:id" element={<StudentDetail />} />
```

### Hands-on Exercise 3: Multi-page Student Portal

**Task:** Create a student portal with multiple pages.

```jsx
// components/Home.jsx
function Home() {
  return (
    <div className="home">
      <h1>Welcome to University of Jaffna</h1>
      <p>Computer Science Department Student Portal</p>
    </div>
  );
}

// components/Students.jsx
import { Link } from 'react-router-dom';

function Students() {
  const students = [
    { id: 1, name: 'Arun Kumar', course: 'CS' },
    { id: 2, name: 'Priya Sharma', course: 'CS' },
    { id: 3, name: 'Ravi Patel', course: 'CS' }
  ];

  return (
    <div className="students">
      <h2>Students List</h2>
      <div className="student-grid">
        {students.map(student => (
          <div key={student.id} className="student-card">
            <h3>{student.name}</h3>
            <p>Course: {student.course}</p>
            <Link to={`/student/${student.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## 7. State Management with Context API

### Why Context API?
- **Share state** across multiple components
- **Avoid prop drilling** (passing props through many levels)
- **Centralized state management** for medium-sized applications

### Creating a Context

```jsx
// contexts/StudentContext.jsx
import { createContext, useContext, useState } from 'react';

// Create Context
const StudentContext = createContext();

// Context Provider Component
export function StudentProvider({ children }) {
  const [students, setStudents] = useState([
    { id: 1, name: 'Arun Kumar', course: 'Computer Science', year: 3 },
    { id: 2, name: 'Priya Sharma', course: 'Computer Science', year: 2 },
    { id: 3, name: 'Ravi Patel', course: 'Computer Science', year: 3 }
  ]);

  const addStudent = (student) => {
    setStudents([...students, { ...student, id: Date.now() }]);
  };

  const removeStudent = (id) => {
    setStudents(students.filter(student => student.id !== id));
  };

  const updateStudent = (id, updatedStudent) => {
    setStudents(students.map(student =>
      student.id === id ? { ...student, ...updatedStudent } : student
    ));
  };

  const value = {
    students,
    addStudent,
    removeStudent,
    updateStudent
  };

  return (
    <StudentContext.Provider value={value}>
      {children}
    </StudentContext.Provider>
  );
}

// Custom Hook to use Student Context
export function useStudents() {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudents must be used within StudentProvider');
  }
  return context;
}
```

### Setting up the Context Provider

```jsx
// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { StudentProvider } from './contexts/StudentContext';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <StudentProvider>
        <App />
      </StudentProvider>
    </BrowserRouter>
  </React.StrictMode>
);
```

### Using Context in Components

```jsx
// components/StudentList.jsx
import { useStudents } from '../contexts/StudentContext';

function StudentList() {
  const { students, removeStudent } = useStudents();

  return (
    <div className="student-list">
      <h2>All Students</h2>
      {students.map(student => (
        <div key={student.id} className="student-item">
          <h3>{student.name}</h3>
          <p>{student.course} - Year {student.year}</p>
          <button onClick={() => removeStudent(student.id)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

// components/AddStudent.jsx
import { useState } from 'react';
import { useStudents } from '../contexts/StudentContext';

function AddStudent() {
  const { addStudent } = useStudents();
  const [formData, setFormData] = useState({
    name: '',
    course: '',
    year: 1
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addStudent(formData);
    setFormData({ name: '', course: '', year: 1 });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="add-student-form">
      <h2>Add New Student</h2>
      <input
        type="text"
        name="name"
        placeholder="Student Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="course"
        placeholder="Course"
        value={formData.course}
        onChange={handleChange}
        required
      />
      <select name="year" value={formData.year} onChange={handleChange}>
        <option value={1}>1st Year</option>
        <option value={2}>2nd Year</option>
        <option value={3}>3rd Year</option>
        <option value={4}>4th Year</option>
      </select>
      <button type="submit">Add Student</button>
    </form>
  );
}
```

---

## 8. Complete Mini Project: Student Management System

Let's combine everything we've learned to build a complete student management system!

### Project Structure
```
src/
├── components/
│   ├── Header.jsx
│   ├── StudentList.jsx
│   ├── StudentCard.jsx
│   ├── AddStudent.jsx
│   └── StudentDetail.jsx
├── contexts/
│   └── StudentContext.jsx
├── pages/
│   ├── Home.jsx
│   ├── Students.jsx
│   └── About.jsx
├── styles/
│   └── App.css
├── App.jsx
└── main.jsx
```

### Key Features
1. **View all students** in a responsive grid
2. **Add new students** with a form
3. **Edit student information**
4. **Delete students** with confirmation
5. **Search and filter** students
6. **Routing** between different pages
7. **Local storage** to persist data

### Final Implementation Highlights

```jsx
// Enhanced Student Context with Local Storage
export function StudentProvider({ children }) {
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('students');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  // ... rest of context logic
}

// Search and Filter Component
function StudentFilter({ onFilter }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [yearFilter, setYearFilter] = useState('all');

  useEffect(() => {
    onFilter({ searchTerm, yearFilter });
  }, [searchTerm, yearFilter, onFilter]);

  return (
    <div className="student-filter">
      <input
        type="text"
        placeholder="Search students..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select value={yearFilter} onChange={(e) => setYearFilter(e.target.value)}>
        <option value="all">All Years</option>
        <option value="1">1st Year</option>
        <option value="2">2nd Year</option>
        <option value="3">3rd Year</option>
        <option value="4">4th Year</option>
      </select>
    </div>
  );
}
```

---

## Best Practices & Tips

### 1. Component Organization
- **One component per file**
- **Use descriptive names**
- **Keep components focused and small**

### 2. State Management
- **Start with local state (useState)**
- **Use Context for shared state**
- **Consider external libraries (Redux) for complex apps**

### 3. Performance Optimization
- **Use React.memo for expensive components**
- **Optimize useEffect dependencies**
- **Avoid creating objects in render**

### 4. Code Style
- **Use consistent naming conventions**
- **Write readable JSX**
- **Add PropTypes or TypeScript for type safety**

### 5. Common Mistakes to Avoid
- **Don't mutate state directly**
- **Use keys properly in lists**
- **Handle loading and error states**
- **Clean up side effects in useEffect**

---

## Next Steps

### What to Learn Next
1. **Testing** with Jest and React Testing Library
2. **TypeScript** for better type safety
3. **State Management** with Redux or Zustand
4. **Styling** with CSS Modules, Styled Components, or Tailwind
5. **Build Tools** and deployment strategies
6. **Performance optimization** techniques

### Resources for Continued Learning
- **Official React Documentation**: react.dev
- **React Router Documentation**: reactrouter.com
- **Vite Documentation**: vitejs.dev
- **Practice Projects**: Build todo apps, weather apps, e-commerce sites

---

## Workshop Exercises Summary

### Exercise 1: StudentCard Component
Create reusable student information cards

### Exercise 2: Todo App with Hooks
Build interactive todo list using useState

### Exercise 3: Multi-page Student Portal
Implement routing with React Router

### Exercise 4: Complete Student Management System
Combine all concepts in a full application

---

## Q&A Session

**Common Questions:**

**Q: When should I use Context vs props?**
A: Use props for direct parent-child communication. Use Context when you need to share state across many components at different levels.

**Q: How do I handle forms in React?**
A: Use controlled components with useState, or libraries like Formik or React Hook Form for complex forms.

**Q: What's the difference between useState and useReducer?**
A: useState for simple state, useReducer for complex state logic with multiple sub-values or complex state transitions.

**Q: How do I fetch data from APIs?**
A: Use useEffect with fetch() or axios, handle loading states, and clean up with AbortController if needed.

---

## Thank You!

### Contact Information
- **Workshop Materials**: Available on department portal
- **Office Hours**: Available for follow-up questions
- **Next Workshop**: Advanced React Patterns & Performance

**Happy Coding! 🚀**
