import { render, screen, fireEvent } from "@testing-library/react";
import SignUpPage from "./SignUpPage";
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

describe("SignUpPage Component", () => {
  test("renders sign-up page title", () => {
    render(
      <BrowserRouter>
        <SignUpPage />
      </BrowserRouter>
    );

    expect(screen.getByRole("heading", { name: /sign up/i })).toBeInTheDocument();
  });

  test("renders input fields and submit button", () => {
    render(
      <BrowserRouter>
        <SignUpPage />
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText("Enter email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
  });

  test("handles form submission successfully", async () => {
    (axios.post as jest.Mock).mockResolvedValue({ data: {} });

    render(
      <BrowserRouter>
        <SignUpPage />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Enter email"), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Enter username"), { target: { value: "testuser" } });
    fireEvent.change(screen.getByPlaceholderText("Enter password"), { target: { value: "password123" } });

    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    expect(axios.post).toHaveBeenCalledWith("/SignUpPage", { username: "testuser", email: "test@example.com", password: "password123" });
  });

  test("shows error message on failed signup", async () => {
    (axios.post as jest.Mock).mockResolvedValue({ data: { error: "Email already in use" } });

    render(
      <BrowserRouter>
        <SignUpPage />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Enter email"), { target: { value: "used@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Enter username"), { target: { value: "existinguser" } });
    fireEvent.change(screen.getByPlaceholderText("Enter password"), { target: { value: "password123" } });

    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    expect(toast.error).toHaveBeenCalledWith("Email already in use");
  });
});
