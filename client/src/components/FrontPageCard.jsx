export default function FrontPageCard({
  mirror,
  title,
  content,
  imgSrc,
  imgAlt,
}) {
  return (
    <div
      className={`card  lg:card-side bg-base-300 my-4 shadow-xl ${
        mirror && "lg:flex-row-reverse"
      }`}
    >
      <figure className="p-2 max-w-2xl lg:p-10">
        <img src={imgSrc} alt={imgAlt} className="h-96  shadow-lg" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{content}</p>
        {/* <div className="card-actions justify-end">
          <button className="btn btn-primary">Listen</button>
        </div> */}
      </div>
    </div>
  );
}
