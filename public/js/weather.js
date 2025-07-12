document.addEventListener('DOMContentLoaded', () => {
          const WEATHER_API_URL = 'https://api.open-meteo.com/v1/forecast';
          const LATITUDE = 39.0997;
          const LONGITUDE = -94.5786;
          const TIMEZONE = 'America%2FChicago';

          const currentWeatherEl = document.getElementById('current-weather');
          const hourlyForecastEl = document.getElementById('hourly-forecast');
          const dailyForecastEl = document.getElementById('daily-forecast');

          function getWeatherDescription(code) {
                    switch (code) {
                              case 0: return 'Clear sky ☀️';
                              case 1:
                              case 2: return 'Mainly clear to partly cloudy 🌤️';
                              case 3: return 'Overcast ☁️';
                              case 45:
                              case 48: return 'Fog 🌫️';
                              case 51:
                              case 53:
                              case 55: return 'Drizzle 🌧️';
                              case 56:
                              case 57: return 'Freezing Drizzle 🧊🌧️';
                              case 61:
                              case 63:
                              case 65: return 'Rain ☔';
                              case 66:
                              case 67: return 'Freezing Rain 🥶☔';
                              case 71:
                              case 73:
                              case 75: return 'Snow ❄️';
                              case 77: return 'Snow grains 🌨️';
                              case 80:
                              case 81:
                              case 82: return 'Rain showers 🚿';
                              case 85:
                              case 86: return 'Snow showers 🌨️';
                              case 95: return 'Thunderstorm ⛈️';
                              case 96:
                              case 99: return 'Thunderstorm with hail 🌩️';
                              default: return 'Unknown ❓';
                    }
          }

          async function fetchWeatherData() {
                    try {
                              const res = await fetch(`${WEATHER_API_URL}?latitude=${LATITUDE}&longitude=${LONGITUDE}&hourly=temperature_2m,precipitation_probability,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code,precipitation_sum&current_weather=true&temperature_unit=fahrenheit&timezone=${TIMEZONE}`);
                              const data = await res.json();

                              if (data.current_weather) {
                                        const temp = Math.round(data.current_weather.temperature);
                                        const desc = getWeatherDescription(data.current_weather.weathercode);
                                        currentWeatherEl.innerHTML = `
                  <p class="text-4xl font-extrabold text-blue-700">${temp}°F</p>
                  <p class="text-xl text-gray-700">${desc}</p>
                  <p class="text-sm text-gray-500">Last updated: ${new Date(data.current_weather.time).toLocaleTimeString()}</p>
                `;
                              }

                              hourlyForecastEl.innerHTML = '';
                              const now = new Date();
                              for (let i = 0; i < 24; i++) {
                                        const hour = new Date(data.hourly.time[i]);
                                        if (hour > now) {
                                                  const temp = Math.round(data.hourly.temperature_2m[i]);
                                                  const desc = getWeatherDescription(data.hourly.weather_code[i]);
                                                  hourlyForecastEl.innerHTML += `
                    <div class="flex-shrink-0 text-center p-3 bg-blue-50 rounded-lg shadow-sm">
                      <p class="text-sm font-semibold">${hour.toLocaleTimeString([], { hour: 'numeric' })}</p>
                      <p class="text-lg font-bold">${temp}°F</p>
                      <p class="text-xs text-gray-600">${desc}</p>
                    </div>
                  `;
                                        }
                              }

                              dailyForecastEl.innerHTML = '';
                              for (let i = 0; i < 7; i++) {
                                        const day = new Date(data.daily.time[i]);
                                        const max = Math.round(data.daily.temperature_2m_max[i]);
                                        const min = Math.round(data.daily.temperature_2m_min[i]);
                                        const desc = getWeatherDescription(data.daily.weather_code[i]);
                                        dailyForecastEl.innerHTML += `
                  <div class="flex items-center justify-between bg-blue-50 p-3 rounded-lg shadow-sm">
                    <p class="font-medium w-1/4">${day.toLocaleDateString('en-US', { weekday: 'short' })}</p>
                    <p class="w-1/4 text-center">${max}°F / ${min}°F</p>
                    <p class="w-2/4 text-right">${desc}</p>
                  </div>
                `;
                              }
                    } catch (e) {
                              currentWeatherEl.innerHTML = `<p class="text-red-500">Failed to load weather data.</p>`;
                    }
          }

          fetchWeatherData();
});
