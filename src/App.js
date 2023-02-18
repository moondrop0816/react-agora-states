import "./App.css";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import DiscussionList from "./Pages/discussionList";

function App() {
  const [data, setData] = useState([]); // 전체 게시글 데이터
  const [author, setAuthor] = useState(""); // 작성자
  const [title, setTitle] = useState(""); // 제목
  const [story, setStory] = useState(""); // 내용
  let nextId = useRef(46); // 새로 등록될 id
  const url = "http://localhost:4000/discussions";

  const getData = async () => {
    // return fetch(url)
    //   .then((res) => res.json())
    //   .then((json) => {
    //     setData(json);
    //     nextId.current = json[0].id + 1;
    //   });

    // axios
    // return axios.get(url).then((res) => {
    //   setData(res.data);
    //   nextId.current = res.data[0].id + 1;
    // });

    // axios + async/await
    try {
      const res = await axios.get(url);
      setData(res.data);
      nextId.current = res.data[0].id + 1;
    } catch (err) {
      console.error(err);
    }
  };

  const postData = async (newData) => {
    // return fetch(url, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(newData),
    // }).then(() => getData());

    // axios
    // return axios.post(url, newData).then(() => getData());

    // axios + async/await
    try {
      await axios.post(url, newData);
      getData();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteData = async (id) => {
    // return fetch(`${url}/${id}`, {
    //   method: "DELETE",
    // }).then(() => getData());

    // axios
    // return axios.delete(url + `/${id}`).then(() => getData());

    // axios + async/await
    try {
      await axios.delete(url + `/${id}`);
      getData();
    } catch (err) {
      console.error(err);
    }
  };

  const putData = async (id, title, updatedAt) => {
    const updatedData = {
      id,
      title,
      updatedAt,
    };

    // return fetch(url + `/${id}`, {
    //   method: "PUT",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(updatedData),
    // }).then(() => getData());

    // axios
    // return axios.put(url + `/${id}`, updatedData).then(() => getData());

    // axios + async/await
    try {
      await axios.put(url + `/${id}`, updatedData);
      getData();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChangeAuthor = (event) => {
    setAuthor(event.target.value);
  };
  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };
  const handleChangeStory = (event) => {
    setStory(event.target.value);
  };

  const addDiscussion = (event) => {
    event.preventDefault();

    const newData = {
      id: nextId.current,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      title,
      url: "",
      author,
      answer: null,
      bodyHTML: story,
      avatarUrl: null,
    };

    // post 요청 보내기
    postData(newData);
    setAuthor("");
    setTitle("");
    setStory("");
    nextId.current += 1;
  };

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
                    onChange={handleChangeAuthor}
                    value={author}
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
      <DiscussionList data={data} deleteData={deleteData} putData={putData} />
    </main>
  );
}

export default App;
