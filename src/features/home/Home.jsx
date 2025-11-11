import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <h1>Welcome to StudyMate</h1>
      <p>
        A simple app to help you manage subjects, to-do tasks, and flashcards.
        Log in or create an account to start organising your studies!
      </p>

      <div>
        <Link to="/login">
          <button>Log In</button>
        </Link>
        <Link to="/register">
          <button>Register</button>
        </Link>
      </div>
    </>
  );
}
