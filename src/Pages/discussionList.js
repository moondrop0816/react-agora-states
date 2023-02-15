import Discussion from "../Components/discussion";

const DiscussionList = ({ data, deleteData, putData }) => {
  return (
    <section className="discussion__wrapper">
      <ul className="discussions__container">
        {data.map((data) => {
          return (
            <Discussion
              data={data}
              key={data.id}
              deleteData={deleteData}
              putData={putData}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default DiscussionList;
