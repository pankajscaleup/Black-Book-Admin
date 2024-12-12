import React, { useState, useEffect, useRef, useCallback } from "react";
import { Icon } from "@iconify/react";
import { useOnClickOutside } from "usehooks-ts";

import classes from "./LangBox.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { setLang } from "../../../../store/lang.store";

function LangBox() {
  const { lang } = useSelector((state: RootState) => state.langSlice);
  const dispatch = useDispatch();
  const [showLangBox, setShowLangBox] = useState(false);
  const langBoxRef = useRef<HTMLDivElement>(null);

  const showBoxHandler = function toDo() {
    setShowLangBox((prev) => !prev);
  };
  useEffect(() => {
    document.documentElement.dir = lang === "en" ? "ltr" : "rtl";
    document.documentElement.lang = lang === "en" ? "en" : "fa";
  }, [lang]);
  const checkIfClickedOutside = useCallback(() => {
    // If the menu is open and the clicked target is not within the menu,
    // then close the menu
    if (showLangBox && langBoxRef.current) {
      setShowLangBox(false);
    }
  }, [showLangBox]);

  //custom hook - when click outside of langbox, it will close.
  useOnClickOutside(langBoxRef, checkIfClickedOutside);

  return (
    <div className={classes.lang} ref={langBoxRef}>
      <div className={classes.lanBox} onClick={showBoxHandler}>
        <Icon icon='clarity:language-line' width='20' />

        <div className={classes.lang_slc}>{lang}</div>

        <Icon icon='ep:arrow-down-bold' width='10' />
      </div>
      <div
        className={`${classes.lang_menu} ${showLangBox ? classes.show : ""}`}
      >
        <div
          onClick={() => {
            dispatch(setLang("en"));
            showBoxHandler();
          }}
        >
          English (en)
        </div>
        <div
          onClick={() => {
            dispatch(setLang("fa"));
            showBoxHandler();
          }}
        >
          Farsi (fa)
        </div>
      </div>
    </div>
  );
}

export default LangBox;
