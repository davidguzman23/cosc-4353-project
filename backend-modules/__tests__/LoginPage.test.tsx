import { render, screen, fireEvent } from "@testing-library/react";
import LoginPage from "./LoginPage";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { jest } from "@jest/globals";

// Mock dependencies
jest.mock("axios");
jest.mock("react-hot-toast", () => ({
  error: jest.fn(),
  success: jest.fn(),
}));
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("LoginPage Component", () => {
  test("renders login page title", () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    expect(screen.getByRole("heading", { name: /log in/i })).toBeInTheDocument();
  });

  test("renders input fields and submit button", () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText("Enter username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
  });

  test("renders forgot password and sign-up links", () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    expect(screen.getByText(/forgot password\?/i)).toBeInTheDocument();
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
  });

  test("handles form submission successfully", async () => {
    (axios.post as jest.Mock).mockResolvedValue({ data: {} });

    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Enter username"), { target: { value: "testuser" } });
    fireEvent.change(screen.getByPlaceholderText("Enter password"), { target: { value: "password123" } });

    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    expect(axios.post).toHaveBeenCalledWith("/login", { username: "testuser", password: "password123" });
  });

  test("shows error message on failed login", async () => {
    (axios.post as jest.Mock).mockResolvedValue({ data: { error: "Invalid credentials" } });

    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Enter username"), { target: { value: "wronguser" } });
    fireEvent.change(screen.getByPlaceholderText("Enter password"), { target: { value: "wrongpassword" } });

    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    expect(toast.error).toHaveBeenCalledWith("Invalid credentials");
  });
});
