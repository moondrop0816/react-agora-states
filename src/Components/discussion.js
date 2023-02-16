import { useState } from "react";

const Discussion = ({ data, deleteData, putData }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editTxt, setEditTxt] = useState(data.title);
  const parseDate = (date) => {
    return new Date(date).toLocaleString("ko-KR");
  };

  const handleChangeEditTxt = (event) => {
    setEditTxt(event.target.value);
  };

  const editTitle = (event, id, title) => {
    if (event.key === "Enter") {
      const updatedAt = new Date().toISOString();
      putData(id, title, updatedAt);
      setIsEdit(false);
      setEditTxt(data.title);
    }
  };

  const isAnswered = data.answer ? "material-icons complete" : "material-icons";

  return (
    <li className="discussion__container">
      <div>
        <button
          type="button"
          className="btn-delete"
          onClick={() => deleteData(data.id)}
        >
          <span className="material-icons">delete</span>
        </button>
        <div className="discussion__avatar--wrapper">
          <img
            className="discussion__avatar--image"
            src={
              data.avatarUrl
                ? data.avatarUrl
                : `https://randomuser.me/api/portraits/women/50.jpg`
            }
            alt={`avatar of ${data.author}`}
          />
        </div>
        <div className="discussion__content">
          {isEdit ? (
            <textarea
              type="text"
              value={editTxt}
              onChange={handleChangeEditTxt}
              onKeyUp={(event) => editTitle(event, data.id, editTxt)}
            />
          ) : (
            <h2 className="discussion__title" onClick={() => setIsEdit(true)}>
              {data.title}
            </h2>
          )}
          <div className="discussion__information">
            {`${data.author} / ` + data.createdAt !== data.updatedAt
              ? parseDate(data.updatedAt)
              : parseDate(data.createdAt)}
          </div>
        </div>
        <div className="discussion__answered">
          <span className={isAnswered}>favorite</span>
        </div>
      </div>
      <div
        className="discussion__story"
        dangerouslySetInnerHTML={{ __html: data.bodyHTML }}
      ></div>
    </li>
  );
};

export default Discussion;
