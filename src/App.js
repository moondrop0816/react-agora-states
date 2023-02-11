import "./App.css";
import { useEffect, useState } from "react";
import DiscussionList from "./Pages/discussionList";

function App() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");

  const handleChangeName = (event) => {
    setName(event.target.value);
  };
  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };
  const handleChangeStory = (event) => {
    setStory(event.target.value);
  };

  const addDiscussion = (event) => {
    event.preventDefault();
    console.log("adddis");
  };

  const getData = () => {
    return fetch("http://localhost:4000/discussions").then((res) => res.json());
  };

  useEffect(() => {
    getData().then((json) => setData(json));
  }, []);

  return (
    <main>
      <section className="title__wrapper">
        <div className="title__container">
          <div>
            <h1>
              My <br />
              Agora <br />
              States
            </h1>
            <div className="buttons">
              <button>👈</button>
              <button>👉</button>
              <button>clear localStorage</button>
            </div>
          </div>
          <section className="form__container">
            <form
              action=""
              method="get"
              className="form"
              onSubmit={addDiscussion}
            >
              <div className="form__input--wrapper">
                <div className="form__input--name">
                  <input
                    type="text"
                    id="name"
                    onChange={handleChangeName}
                    value={name}
                    required
                  />
                  <label htmlFor="name">작성자</label>
                  <span className="bar"></span>
                </div>
                <div className="form__input--title">
                  <input
                    type="text"
                    id="title"
                    onChange={handleChangeTitle}
                    value={title}
                    required
                  />
                  <label htmlFor="name">제목</label>
                  <span className="bar"></span>
                </div>
                <div className="form__textbox">
                  <textarea
                    id="story"
                    rows="5"
                    onChange={handleChangeStory}
                    value={story}
                    required
                  ></textarea>
                  <label htmlFor="story">내용</label>
                  <span className="bar"></span>
                </div>
              </div>
              <div className="form__submit">
                <input type="submit" value="질문하기" />
              </div>
            </form>
          </section>
        </div>
      </section>
      <DiscussionList data={data} />
    </main>
  );
}

export default App;
