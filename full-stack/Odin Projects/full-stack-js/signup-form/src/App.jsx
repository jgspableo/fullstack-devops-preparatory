import "./App.css";

function App() {
  return (
    <main>
      {/* left side */}
      <div className="left-container">
        <img id="img" src="leaves.jpg" alt="leaves" />

        <div className="logo-container">
          <div className="logo-elements">
            <img src="odin-logo.png" alt="odin-logo" />
            <p>ODIN</p>
          </div>
        </div>

        <div className="footer-container">
          <footer>Photo by Haloe West on Unsplash</footer>
        </div>
      </div>

      <div className="right-container">
        <div className="wrapper">
          <div className="top-container">
            <h3>
              This is not a real online service! You know you need something
              like this in your life to help you realize your deepest dreams.
              Sign up <i>now</i> to get started.
            </h3>
            <h3>
              You <i>know</i> you want to.
            </h3>
          </div>

          <div className="middle-container">
            <h3>Let's do this!</h3>
            <div className="form-container">
              <div className="first-name">
                <label htmlFor="first-name">FIRST NAME</label>
                <input type="text" name="first-name" />
              </div>
              <div className="last-name">
                <label htmlFor="last-name">LAST NAME</label>
                <input type="text" name="last-name" />
              </div>
              <div className="email">
                <label htmlFor="email">EMAIL</label>
                <input type="email" name="email" />
              </div>
              <div className="phone-number">
                <label htmlFor="phone-number">PHONE NUMBER</label>
                <input type="tel" name="phone-number" />
              </div>
              <div className="password">
                <label htmlFor="pswd">PASSWORD</label>
                <input type="password" name="pswd" />
              </div>
              <div className="conf-password">
                <label htmlFor="confirm-pswd">CONFIRM PASSWORD</label>
                <input type="password" name="confirm-pswd" />
              </div>
            </div>
          </div>

          <div className="bottom-container">
            <div className="conf-container">
              <button type="submit">Create Account</button>
            </div>
            <h3>Already have an account? Log in</h3>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
