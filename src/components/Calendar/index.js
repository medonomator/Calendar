import React, { useEffect, useState } from "react";
import styles from "./calendar.module.sass";
import { months, weeks } from "./data";
import { customChunk, getRandomString } from "../../helpers";

import LeftArrow from "../../assets/svg/left-arrow.svg";
import RightArrow from "../../assets/svg/right-arrow.svg";

const Calendar = () => {
  const [currentMonth, setMonth] = useState(months[new Date().getMonth()]);
  const [currentMonthNumber, setMonthNumber] = useState(new Date().getMonth());
  const [yearNumber, setYear] = useState(new Date().getFullYear());
  const [firstDayInMonth, setFirstDayInMonth] = useState(null);
  const [arrayOfDays, pushArrayOfDays] = useState([]);

  useEffect(() => {
    let makeFirstDay = false;

    if (!firstDayInMonth) {
      const firstDay = new Date(yearNumber, currentMonthNumber, 0).getDay();
      setFirstDayInMonth(firstDay);
      makeFirstDay = true;
    }

    if (!arrayOfDays.length) {
      const array = [];

      for (let i = 0; i < currentMonth.days; i++) {
        array.push({
          number: i + 1,
          checked: false,
          active: true,
          id: getRandomString(),
        });
      }

      if (makeFirstDay) {
        const firstDayInMonth = new Date(
          yearNumber,
          currentMonthNumber,
          0
        ).getDay();

        for (let i = 0; i < firstDayInMonth; i++) {
          const day = new Date(
            yearNumber,
            currentMonthNumber,
            i * -1
          ).getDate();

          if (array.length < 35) {
            array.unshift({
              number: day,
              checked: false,
              active: false,
              id: getRandomString(),
            });
          }
        }

        if (array.length < 35) {
          const count = 35 - array.length;
          for (let i = 0; i < count; i++) {
            array.push({
              number: i + 1,
              checked: false,
              active: false,
              id: getRandomString(),
            });
          }
        }
      }

      pushArrayOfDays(array);
    }
  });

  const setPrevMonth = (e) => {
    const numbers = e.target.parentElement.parentElement.children[1];

    if (currentMonthNumber > 0) {
      const prevMonthNumber = currentMonthNumber - 1;
      setMonthNumber(prevMonthNumber);
      setMonth(months[prevMonthNumber]);
      setFirstDayInMonth(null);
      pushArrayOfDays([]);
    } else {
      const prevMonthNumber = 11;
      setMonthNumber(prevMonthNumber);
      setMonth(months[prevMonthNumber]);
      setFirstDayInMonth(null);
      pushArrayOfDays([]);
    }
  };

  const setNextMonth = () => {
    if (currentMonthNumber < 11) {
      const nextMonthNumber = currentMonthNumber + 1;
      setMonthNumber(nextMonthNumber);
      setMonth(months[nextMonthNumber]);
      setFirstDayInMonth(null);
      pushArrayOfDays([]);
    } else {
      const nextMonthNumber = 0;
      setMonthNumber(nextMonthNumber);
      setMonth(months[nextMonthNumber]);
      setFirstDayInMonth(null);
      pushArrayOfDays([]);
    }
  };

  const toggleItem = (e) => {
    const key = e.target.attributes.getNamedItem("data-id").value;
    const array = [...arrayOfDays];

    array.forEach((item) => {
      if (item.id === key) {
        item.checked = !item.checked;
      }
    });

    pushArrayOfDays(array);
  };

  console.log(customChunk(arrayOfDays));

  return (
    <div className={styles.main}>
      <div className={styles.top}>
        <img
          className={styles.arrow}
          onClick={setPrevMonth}
          src={LeftArrow}
          alt="left-arrow"
        />
        <div className={styles.monthYear}>
          {currentMonth.name} {yearNumber}
        </div>
        <img
          className={styles.arrow}
          onClick={setNextMonth}
          src={RightArrow}
          alt="right-arrow"
        />
      </div>

      <div className={styles.numbers}>
        {customChunk(arrayOfDays).map((item, index) => {
          return (
            <div>
              <div className={styles.weeks}>{weeks[index]}</div>
              <div>
                {item.map((item2, index2) => {
                  return (
                    <div
                      // style={{ color: item2.active ? "#364860" : "#a0a0a0" }}
                      className={item2.checked ? styles.dayChecked : styles.day}
                      data-id={item2.id}
                      onClick={toggleItem}
                      key={index2}
                    >
                      {item2.number}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
