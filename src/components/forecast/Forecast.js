import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "./Forecast.css";
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const Forecast = ({ data }) => {
  const day = new Date().getDay() + 1;

  console.log(day);
  const dayArray = days.slice(day).concat(days.slice(0, day));
  console.log(dayArray);
  const getBackgroundColor = (temp) => {
    if (temp >= 30) {
      return "#FF5733"; // hot
    } else if (temp >= 20) {
      return "#FFC300"; // warm
    } else if (temp >= 10) {
      return "#03f0fc"; // mild
    } else {
      return "#338DFF"; // cold
    }
  };

  return (
    <>
      <label className="title">Daily</label>
      <Accordion allowZeroExpanded>
        {data.list.splice(0, 7).map((item, idx) => (
          <AccordionItem key={idx}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div
                  className="daily-item"
                  style={{
                    backgroundColor: getBackgroundColor(item?.main?.temp),
                  }}
                >
                  <img
                    className="icon-small"
                    alt="weather"
                    src={"icons/" + item?.weather[0]?.icon + ".png"}
                  />
                  <label className="day">{dayArray[idx]}</label>
                  <label className="description">
                    {item?.weather[0]?.description}
                  </label>
                  <label className="min-max">
                    {Math.round(item?.main?.temp_min)}°C /{" "}
                    {Math.round(item?.main?.temp_max)}°C
                  </label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="daily-details-grid">
                <div className="daily-details-grid-item">
                  <label className="daily-details-title">Feels Like</label>
                  <label className="daily-details-value">
                    {Math.round(item?.main?.feels_like)}°C
                  </label>
                </div>
                <div className="daily-details-grid-item">
                  <label className="daily-details-title">Humidity</label>
                  <label className="daily-details-value">
                    {item?.main?.humidity}%
                  </label>
                </div>
                <div className="daily-details-grid-item">
                  <label className="daily-details-title">Pressure</label>
                  <label className="daily-details-value">
                    {item?.main?.pressure} hPa
                  </label>
                </div>
                <div className="daily-details-grid-item">
                  <label className="daily-details-title">Wind</label>
                  <label className="daily-details-value">
                    {item?.wind?.speed} m/s
                  </label>
                </div>
                <div className="daily-details-grid-item">
                  <label className="daily-details-title">Cloudiness</label>
                  <label className="daily-details-value">
                    {item?.clouds?.all}%
                  </label>
                </div>
                <div className="daily-details-grid-item">
                  <label className="daily-details-title">Visibility</label>
                  <label className="daily-details-value">
                    {item?.visibility / 1000} km
                  </label>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default Forecast;
