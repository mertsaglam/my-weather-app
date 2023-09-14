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

  return (
    <>
      <label className="title">Daily</label>
      <Accordion allowZeroExpanded>
        {data.list.splice(0, 7).map((item, idx) => (
          <AccordionItem key={idx}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="daily-item">
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
            <AccordionItemPanel></AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default Forecast;
