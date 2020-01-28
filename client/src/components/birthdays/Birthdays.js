import React, { useContext, Fragment, useEffect } from "react";
import BirthdayContext from "../../context/Birthday/BirthdayContext";
import BirthdaysItem from "./BirthdaysItem";
import FilterForm from "../birthdays/FilterForm";

export default function Birthdays() {
  const birthdayContext = useContext(BirthdayContext);
  const { birthdays, filtered, getBirthday, loading } = birthdayContext;
  useEffect(() => {
    getBirthday();
    //eslint-disable-next-line
  }, []);
  return (
    <Fragment>
      <FilterForm />
      {birthdays !== null && !loading && (
        <div style={{ paddingTop: "10%" }}>
          {filtered
            ? filtered.map(birthday => (
                <BirthdaysItem key={birthdays._id} birthdayProps={birthday} />
              ))
            : birthdays.map(birthday => (
                <BirthdaysItem birthdayProps={birthday} />
              ))}
        </div>
      )}
    </Fragment>
  );
}
