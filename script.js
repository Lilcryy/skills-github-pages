body {
    font-family: sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f0f0f0;
    color: #333;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: space-around;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

nav li {
    padding: 10px;
    cursor: pointer;
    text-align: center;
    flex-grow: 1;
    border-bottom: 2px solid transparent; /* Default state */
    transition: border-bottom 0.3s ease;
}

nav li.active {
    font-weight: bold;
    border-bottom: 2px solid #007bff; /* Active state */
}

main section {
    display: none;
    padding: 20px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
}

main section.active {
    display: block;
}
