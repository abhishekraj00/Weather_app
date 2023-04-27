/* eslint-disable testing-library/prefer-screen-queries */
import Home from "../pages/Home/Home";
import { fireEvent, render, waitFor } from "@testing-library/react";

describe("Home component testing", () => {
  test("renders input, submit button,heading Text", () => {
    const { getByPlaceholderText, getByText } = render(<Home />);
    const inputElement = getByPlaceholderText("Enter Country");
    const submitButton = getByText("Submit");
    const headingText = getByText("Weather App");
    expect(inputElement).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(headingText).toBeInTheDocument();
  });

  test("when user input text in input filed submit button active", () => {
    const { getByPlaceholderText, getByText } = render(<Home />);
    const inputElement = getByPlaceholderText("Enter Country");
    const submitButton = getByText("Submit");
    fireEvent.change(inputElement, { target: { value: "Argentina" } });
    expect(submitButton).toBeTruthy();
  });

  test("when input field is empty, submit button should be disabled", () => {
    const { getByPlaceholderText, getByText } = render(<Home />);
    const inputElement = getByPlaceholderText("Enter Country");
    const submitButton = getByText("Submit");
    fireEvent.change(inputElement, { target: { value: "" } }); // simulate input field being empty
    expect(submitButton).toBeDisabled();
  });

  test("calls API and renders results", async () => {
    const mockData = [
      {
        name: { common: "Argentina" },
        capital: ["Buenos Aires"],
        latlng: [-34, -64],
        flags: { png: "https://restcountries.com/data/arg.svg", alt: "flag" },
        population: 43590400,
      },
    ];
    global.fetch = jest.fn(() =>
      Promise.resolve(new Response(JSON.stringify(mockData), { status: 200 }))
    );
    const { getByPlaceholderText, getByText, findByText } = render(<Home />);
    const inputElement = getByPlaceholderText("Enter Country");
    const submitButton = getByText("Submit");
    fireEvent.change(inputElement, { target: { value: "Argentina" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    const capital = await findByText("Capital");
    const capitalData = await findByText("Buenos Aires", { exact: false });
    expect(capital).toBeInTheDocument();
    expect(capitalData).toBeInTheDocument();

    const population = await findByText("population");
    const populationData = await findByText("43590400", { exact: false });
    expect(population).toBeInTheDocument();
    expect(populationData).toBeInTheDocument();

    const latitude = await findByText("latitude");
    const latitudeData = await findByText("-34", { exact: false });
    expect(latitude).toBeInTheDocument();
    expect(latitudeData).toBeInTheDocument();

    const longitude = await findByText("Longitude");
    const longitudeData = await findByText("-64", { exact: false });
    expect(longitude).toBeInTheDocument();
    expect(longitudeData).toBeInTheDocument();
  });

  test("displays error message when API call fails", async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error("Failed to fetch data"))
    );
    const { getByText, findByText, getByPlaceholderText } = render(<Home />);

    const inputElement = getByPlaceholderText("Enter Country");
    const submitButton = getByText("Submit");
    fireEvent.change(inputElement, { target: { value: "Argentina" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    const errorMessage = await findByText("Failed to fetch data");
    expect(errorMessage).toBeInTheDocument();
  });
});
