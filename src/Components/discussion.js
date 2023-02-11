const Discussion = ({ data }) => {
  const parseDate = (date) => {
    return new Date(date).toLocaleString("ko-KR");
  };

  const isAnswered = data.answer ? "material-icons complete" : "material-icons";

  return (
    <li className="discussion__container">
      <div>
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
          <h2 className="discussion__title">
            <a href={data.url}>{data.title}</a>
          </h2>
          <div className="discussion__information">
            {`${data.author} / ${parseDate(data.createdAt)}`}
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
