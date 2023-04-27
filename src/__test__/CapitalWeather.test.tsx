/* eslint-disable testing-library/prefer-screen-queries */
import { fireEvent, render } from "@testing-library/react";
import CapitalWeather from "../components/CapitalWeather";

describe("CapitalWeather component", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  test("should render without errors", () => {
    const { getByText } = render(<CapitalWeather capital={"Buenos Aires"} />);
    const capitalWeatherButton = getByText("Capital Weather");
    expect(capitalWeatherButton).toBeInTheDocument();
  });

  test("should toggle display of weather information when button is clicked", async () => {
    const mockData = {
      current: {
        temp_c: 25,
        condition: {
          text: "Sunny",
          icon: "//cdn.weatherapi.com/weather/64x64/day/113.png",
        },
        wind_kph: 10,
        precip_in: 0.0,
      },
    };
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    );
    const { queryByText, getByText, findByText } = render(
      <CapitalWeather capital="Buenos Aires" />
    );

    // Check that weather information is initially hidden
    expect(queryByText(/wind_speed/i)).not.toBeInTheDocument();

    // Click button to toggle display of weather information
    fireEvent.click(getByText("Capital Weather"));
    expect(global.fetch).toHaveBeenCalledTimes(1);

    // Wait for weather information to be fetched and displayed
    const wind = await findByText(/wind_speed/i);
    expect(wind).toBeInTheDocument();

    // Click button again to hide weather information
    fireEvent.click(getByText("❌"));
    expect(queryByText(/wind_speed/i)).not.toBeInTheDocument();
  });

  test("Api get failed", async () => {
    const mockFetch = jest.fn(() =>
      Promise.reject(new Error("Api get Failed"))
    );

    global.fetch = mockFetch;

    const { getByText, findByText } = render(
      <CapitalWeather capital="Buenos Aires" />
    );
    const button = getByText("Capital Weather");
    button.click();

    await findByText("Error");
  });
});
