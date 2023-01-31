import React, { useReducer } from "react";
import { useMutation } from "react-query";
import Close from "../../assets/icons/close.svg";
import { useAppDispatch } from "../../hooks";
import { action } from "../../redux";
import { postSite } from "../../utils/Sitenary";
import "./styles.scss";

const initialState = { name: "", url: "" };

type ACTIONTYPE =
  | { type: "changeTitle"; payload: string }
  | { type: "changeUrl"; payload: string };

function reducer(state: typeof initialState, action: ACTIONTYPE) {
  switch (action.type) {
    case "changeTitle":
      return { name: action.payload, url: state.url };
    case "changeUrl":
      return { name: state.name, url: action.payload };
    default:
      throw new Error();
  }
}

const AddSiteOverlays = () => {
  const appdispatch = useAppDispatch();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { mutate } = useMutation("sites", postSite, {});

  return (
    <>
      <div className="overlay-container">
        <div className="dialogue-box">
          <div className="dialogue-box__header">
            <div className="dialogue-box__title">Add Site</div>
            <div
              onClick={() => appdispatch(action.app.setAddSiteModalOpen(false))}
              className="dialogue-box__close"
            >
              <img src={Close} alt="close-icon" />
            </div>
          </div>
          <div className="dialogue-box__content">
            <div className="dialogue-box__input">
              <label htmlFor="site-name">Title</label>
              <input
                value={state.name}
                onChange={(e) =>
                  dispatch({ type: "changeTitle", payload: e.target.value })
                }
                type="text"
                id="site-name"
              />
            </div>
            <div className="dialogue-box__input">
              <label htmlFor="site-url">Url</label>
              <input
                value={state.url}
                onChange={(e) =>
                  dispatch({ type: "changeUrl", payload: e.target.value })
                }
                type="text"
                id="site-url"
              />
            </div>
          </div>
          <div className="dialogue-box__footer">
            <button
              onClick={() => appdispatch(action.app.setAddSiteModalOpen(false))}
              className="dialogue-box__button cancel"
            >
              Cancel
            </button>
            <button
              onClick={() => mutate(state)}
              className="dialogue-box__button save"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddSiteOverlays;