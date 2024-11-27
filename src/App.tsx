import { useEffect, useState } from "react";
// IMG
import LeftArrow from "./assets/left-arrow.svg";
import RightArrow from "./assets/right-arrow.svg";

function App() {
  const [weekDays] = useState<string[]>([
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
  ]);
  const [currentMonth, setCurrenMonth] = useState(new Date());
  const [currenDate] = useState(new Date());
  const [dates, setDates] = useState<(null | number)[]>([]);

  useEffect(() => {
    setCurrenMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0)
    );
  }, []);

  useEffect(() => {
    let dCount = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    ).getDate();

    let d = [];
    let counter = 1;
    let weekDay = currentMonth.getDay();

    for (let i = 1; i <= 42; i++) {
      if (weekDay == 0) {
        d.push(null);
        weekDay += 6;
      }
      if (weekDay > i) {
        d.push(null);
      } else if (counter > dCount) {
        d.push(null);
      } else {
        d.push(counter);
        counter++;
      }
    }
    setDates(d);
  }, [currentMonth]);

  function handlePrev() {
    setCurrenMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  }
  function handleNext() {
    setCurrenMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  }
  return (
    <div className="mt-20 container mx-auto">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">
          {currentMonth.getMonth() + 1} {currentMonth.getFullYear()}
        </h3>
        <div className="flex gap-3 items-center">
          <span
            className="cursor-pointer px-3 py-2  rounded-full  hover:bg-slate-200 "
            onClick={handlePrev}
          >
            <img src={LeftArrow} alt="rasm" width={20} />
          </span>
          <span
            className="cursor-pointer px-3 py-2 rounded-full  hover:bg-slate-200 "
            onClick={handleNext}
          >
            <img src={RightArrow} alt="rasm" width={20} />
          </span>
        </div>
      </div>
      <div className="flex flex-wrap mt-5 justify-between">
        {weekDays.length > 0 &&
          weekDays.map(function (weekDay, index) {
            return (
              <div className="font-bold text-xl text-center w-1/7" key={index}>
                <h3 className=" text-center bg-red-400">{weekDay}</h3>
              </div>
            );
          })}
        {dates.length > 0 &&
          dates.map(function (date, index) {
            return (
              <div
                className={`font-bold text-md text-center w-1/7 min-h-20  p-2 border-black mt-2 ${
                  date ? "border" : ""
                } ${
                  currenDate.getFullYear() == currentMonth.getFullYear() &&
                  currenDate.getMonth() == currentMonth.getMonth() &&
                  currenDate.getDate() == currentMonth.getDate() &&
                  currenDate.getDate() == date
                    ? "bg-gray-600"
                    : ""
                }`}
                key={index}
              >
                <h3 className=" text-right">{date}</h3>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
