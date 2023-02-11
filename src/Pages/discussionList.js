import Discussion from "../Components/discussion";

const DiscussionList = ({ data }) => {
  return (
    <section className="discussion__wrapper">
      <ul className="discussions__container">
        {data.map((data) => {
          return <Discussion data={data} key={data.id} />;
        })}
      </ul>
    </section>
  );
};

export default DiscussionList;
