## About

**My Ad Board** is a Node.js and Express project that serves as a platform for posting ads. This project uses Sequelize as its ORM (Object-Relational Mapping) tool for interacting with the SQLite database. It includes two built-in admin users: anyone can post ads, but admins need to approve them before they are displayed..

A practical example of using modern web technologies to build a full-stack application, including:

- **Node.js** for server-side JavaScript.
- **Express** for handling HTTP requests and routing.
- **Sequelize** for ORM-based database interactions.
- **SQLite** as the database engine.
- 
<h1>Assumptions</h1>
<p>
  The site use bootstap CDN therefore assumes an internet connection is available.
</p>

<h1>Dependencies</h1>
<ul>
        <li><a href="https://www.npmjs.com/package/connect-session-sequelize">connect-session-sequelize</a>: ^7.1.7</li>
        <li><a href="https://www.npmjs.com/package/cookie-parser">cookie-parser</a>: ~1.4.4</li>
        <li><a href="https://www.npmjs.com/package/debug">debug</a>: ^4.3.4</li>
        <li><a href="https://www.npmjs.com/package/ejs">ejs</a>: ^3.1.6</li>
        <li><a href="https://www.npmjs.com/package/express">express</a>: ^4.17.1</li>
        <li><a href="https://www.npmjs.com/package/express-session">express-session</a>: ^1.18.0</li>
        <li><a href="https://www.npmjs.com/package/http-errors">http-errors</a>: ^1.7.3</li>
        <li><a href="https://www.npmjs.com/package/morgan">morgan</a>: ~1.9.1</li>
        <li><a href="https://www.npmjs.com/package/mysql2">mysql2</a>: ^2.3.3</li>
        <li><a href="https://www.npmjs.com/package/nodemon">nodemon</a>: ^2.0.2</li>
        <li><a href="https://www.npmjs.com/package/sequelize">sequelize</a>: ^6.28.0</li>
        <li><a href="https://www.npmjs.com/package/sequelize-cli">sequelize-cli</a>: ^6.3.0</li>
        <li><a href="https://www.npmjs.com/package/sqlite3">sqlite3</a>: ^5.1.7</li>
    </ul>


<h1>Sequelize Configuration</h1>
<p>
    This project uses Sequelize as the Object-Relational Mapping (ORM) tool for interacting with the database.
    Sequelize is configured using two separate files based on the environment - <code>config.json</code> for SQLite and
    <code>config-mysql.json</code> for MySQL.
</p>

<h2>SQLite Configuration (config.json)</h2>
<p>
    In the development environment, the project uses SQLite as the database. The configuration is specified in
    <code>config.json</code>
</p>

<h1>Models</h1>
<p>
    The project utilizes Sequelize to define and interact with database models. Two main models are defined in the
    <code>models</code> folder: <code>Ad</code> and <code>Admin</code>.
</p>

<h2>Ad Model</h2>
<p>
    The <code>Ad</code> model represents the structure of the advertisements in the database. It includes the following fields:
</p>
<ul>
    <li><code>title</code>: A non-null string representing the title of the ad.</li>
    <li><code>description</code>: A string describing the ad.</li>
    <li><code>price</code>: A non-null decimal representing the price of the item in the ad.</li>
    <li><code>phone</code>: A string representing the phone number associated with the ad.</li>
    <li><code>email</code>: A non-null string representing the email associated with the ad, validated as a valid email.</li>
    <li><code>isApproved</code>: A boolean indicating whether the ad has been approved.</li>
</ul>

<h2>Admin Model</h2>
<p>
    The <code>Admin</code> model represents the structure of the administrators in the system. It includes the following fields:
</p>
<ul>
    <li><code>name</code>: A non-null string representing the name of the administrator.</li>
    <li><code>password</code>: A non-null string representing the password of the administrator.</li>
</ul>
<p>
    Both models are initialized and associated with the Sequelize instance in their respective files and are used throughout
    the project to interact with the database.
</p>

<h1>Getting Started</h1>
<p>
    To run this project, make sure you have Node.js and npm installed. After cloning the repository, navigate to the project
    directory in the terminal and run the following command to install the dependencies:
</p>
<pre>
npm install
</pre>

<h2>Admin Users</h2>
<p>
    The application comes with two pre-initialized admin users. You can use the following credentials to log in as an admin:
</p>
<ul>
    <li>Username: <code>admin</code>, Password: <code>admin</code></li>
    <li>Username: <code>admin2</code>, Password: <code>admin2</code></li>
</ul>

<h2>Default Advertisement</h2>
<p>
    Upon starting the application, a default advertisement is created in the database. You can find it with the following details:
</p>
<ul>
    <li>Title: <code>Some Title</code></li>
    <li>Description: <code>Some Ad Description</code></li>
    <li>Price: <code>$50.00</code></li>
    <li>Phone: <code>0545454545</code></li>
    <li>Email: <code>example@example.com</code></li>
    <li>Status: <code>Approved</code></li>
</ul>

<p>
    The provided information includes default admin users, their credentials, and the initial advertisement to help you get started with the application.
</p>

<h2>Starting the Server</h2>
<p>
    After installing the dependencies, start the server by running the following command in the terminal:
</p>
<pre>
npm start
</pre>

<p>
    Once the server is running, you can access the application by navigating to <code>http://localhost:3000</code> in your web browser.
</p>
