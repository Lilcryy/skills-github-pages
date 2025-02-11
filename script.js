/* style.css */

body {
  font-family: 'Roboto', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f4f4f4;
  color: #333;
}

header {
  background-color: #333;
  color: #fff;
  padding: 1rem 0;
  text-align: center;
}

header h1 {
  margin: 0;
}

nav ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

nav ul li {
  display: inline;
  margin: 0 1rem;
}

nav a {
  color: #fff;
  text-decoration: none;
}

main {
  padding: 2rem;
  text-align: center;
}

#balance-section {
  margin-bottom: 2rem;
}

.balance-container {
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto;
}

#balance {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -100%); /* Position above coin */
  font-size: 1.5rem;
  font-weight: 500;
  color: #333;
}

#coin {
  cursor: pointer;
}

#coin img {
  width: 200px;
  height: 200px;
  border-radius: 50%; /* Make it a circle */
  transition: transform 0.2s ease-in-out;
}

#coin img:hover {
  transform: scale(1.1);
}

#tasks {
  margin-top: 2rem;
}

.tasks-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.task-card {
  width: 300px;
  background-color: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: left;
}

.task-icon {
  font-size: 2rem;
  color: #007bff;
  margin-bottom: 0.5rem;
}

.task-card h3 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
}

.task-card p {
  font-size: 0.9rem;
  color: #666;
}

.task-button {
  background-color: #28a745;
  color: #fff;
  border: none;
  padding: 0.75rem 1.25rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  font-size: 1rem;
  display: block;
  margin-top: 1rem;
  width: 100%;
  text-align: center;
}

.task-button:hover {
  background-color: #218838;
}

footer {
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 1rem 0;
  position: fixed;
  bottom: 0;
  width: 100%;
}
