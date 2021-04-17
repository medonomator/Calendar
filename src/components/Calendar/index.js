import React, { useEffect, useState } from "react";
import styles from "./calendar.module.sass";
import { months, weeks } from "./data";
import { customChunk, getRandomString } from "../../helpers";
import { throttle } from "lodash";

import LeftArrow from "../../assets/svg/left-arrow.svg";
import RightArrow from "../../assets/svg/right-arrow.svg";
import "./animation.css";

const MAX_NUMBER_DESKTOP = 35;

const Calendar = () => {
  const [currentMonth, setMonth] = useState(months[new Date().getMonth()]);
  const [currentMonthNumber, setMonthNumber] = useState(new Date().getMonth());
  const [yearNumber, setYear] = useState(new Date().getFullYear());
  const [firstDayInMonth, setFirstDayInMonth] = useState(null);
  const [arrayOfDays, pushArrayOfDays] = useState([]);
  // calculate pannel data
  const [successRate, changeSuccessRate] = useState(0);
  const [countDayMet, setCountDayMet] = useState(0);

  useEffect(() => {
    if (!firstDayInMonth) {
      const firstDay = new Date(yearNumber, currentMonthNumber, 0).getDay();
      setFirstDayInMonth(firstDay);
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

      const firstDayInMonth = new Date(
        yearNumber,
        currentMonthNumber,
        0
      ).getDay();

      for (let i = 0; i < firstDayInMonth; i++) {
        const day = new Date(yearNumber, currentMonthNumber, i * -1).getDate();

        if (array.length < MAX_NUMBER_DESKTOP) {
          array.unshift({
            number: day,
            checked: false,
            active: false,
            id: getRandomString(),
          });
        }
      }

      if (array.length < MAX_NUMBER_DESKTOP) {
        const count = MAX_NUMBER_DESKTOP - array.length;
        for (let i = 0; i < count; i++) {
          array.push({
            number: i + 1,
            checked: false,
            active: false,
            id: getRandomString(),
          });
        }
      }

      pushArrayOfDays(array);
    }
  });

  const setPrevMonth = (e) => {
    defineLeapYear();
    changeSuccessRate(0);
    setCountDayMet(0);

    const numbers = e.target.parentElement.parentElement.children[1];
    const oldStyle = numbers.className.replace("calendar-render", "");

    numbers.className += " right-transit";

    setTimeout(() => {
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
        setYear(yearNumber - 1);
      }

      numbers.className = oldStyle;
    }, 200);
  };

  const setNextMonth = (e) => {
    defineLeapYear();
    changeSuccessRate(0);
    setCountDayMet(0);

    const numbers = e.target.parentElement.parentElement.children[1];
    const oldStyle = numbers.className;

    numbers.className += " left-transit";

    if (numbers.className !== oldStyle)
      setTimeout(() => {
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
          setYear(yearNumber + 1);
        }

        numbers.className = oldStyle;
      }, 200);
  };

  const defineLeapYear = () => {
    if (currentMonth.name === "February" && yearNumber % 4 === 0) {
      console.log(currentMonth);
      // TODO: change count day
    }
  };

  const toggleItem = (e) => {
    const key = e.target.attributes.getNamedItem("data-id").value;
    const array = [...arrayOfDays];

    const onlyCurrentMonthDay = array.filter((item) => item.active);
    let accum = 0;

    array.forEach((item) => {
      if (item.id === key) {
        item.checked = !item.checked;
      }

      if (item.active && item.checked) {
        accum++;
      }

      setCountDayMet(accum);

      const rate = Math.ceil((accum * 100) / onlyCurrentMonthDay.length);
      changeSuccessRate(rate);
    });

    pushArrayOfDays(array);
  };

  return (
    <div className={styles.main}>
      <div className={styles.top}>
        <img
          className={styles.arrow}
          onClick={throttle(setPrevMonth, 10000)}
          src={LeftArrow}
          alt="left-arrow"
        />
        <div className={styles.monthYear}>
          {currentMonth.name} {yearNumber}
        </div>
        <img
          className={styles.arrow}
          onClick={throttle(setNextMonth, 10000)}
          src={RightArrow}
          alt="right-arrow"
        />
      </div>

      <div className={styles.numbers}>
        {customChunk(arrayOfDays).map((item, index) => {
          return (
            <div key={index}>
              <div className={styles.weeks}>{weeks[index]}</div>
              <div>
                {item.map((item2, index2) => {
                  return (
                    <div
                      style={{ color: !item2.active && "#999999" }}
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

      <div className={styles.calculatePanel}>
        <div className={styles.calculatePanelItem}>
          <p className={styles.calculateNumber}>{`${successRate}%`}</p>
          <p className={styles.calculateText}>
            SUCCESS <br /> RATE
          </p>
        </div>
        <div className={styles.calculatePanelItem}>
          <p className={styles.calculateNumber}>{countDayMet}</p>
          <p className={styles.calculateText}>
            GOALS <br /> MET
          </p>
        </div>
        <div className={styles.calculatePanelItem}>
          <p className={styles.calculateNumber}>3</p>
          <p className={styles.calculateText}>
            CURRENT <br /> STREAK
          </p>
        </div>
        <div className={styles.calculatePanelItem}>
          <p className={styles.calculateNumber}>6</p>
          <p className={styles.calculateText}>
            BEST <br /> STREAK
          </p>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
