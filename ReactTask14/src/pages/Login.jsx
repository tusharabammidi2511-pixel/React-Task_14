import { useReducer, useState } from "react";
import formReducer, {
  initialState,
} from "../reducer/formReducer";

function Login() {
  const [form, dispatch] = useReducer(
    formReducer,
    initialState
  );

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (event) => {
    dispatch({
      type: "SET_FIELD",
      field: event.target.name,
      value: event.target.value,
    });

    // Clear success message when user edits the form
    setSuccess(false);
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!form.email.includes("@")) {
      newErrors.email = "Enter a valid email";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password =
        "Password must contain at least 6 characters";
    }

    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validate();

    setErrors(validationErrors);
    setSuccess(false);

    if (Object.keys(validationErrors).length === 0) {
      setSuccess(true);
      setErrors({});

      dispatch({
        type: "RESET",
      });
    }
  };

  return (
    <section className="form-section">
      <form
        className="login-form"
        onSubmit={handleSubmit}
      >
        <h1>Create Account</h1>

        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={form.name}
          onChange={handleChange}
        />

        {errors.name && (
          <p className="error">
            {errors.name}
          </p>
        )}

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={form.email}
          onChange={handleChange}
        />

        {errors.email && (
          <p className="error">
            {errors.email}
          </p>
        )}

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={form.password}
          onChange={handleChange}
        />

        {errors.password && (
          <p className="error">
            {errors.password}
          </p>
        )}

        <button type="submit">
          Submit
        </button>

        {success && (
          <p className="success">
            Successfully submitted! ✅
          </p>
        )}
      </form>
    </section>
  );
}

export default Login;