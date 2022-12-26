export default function FrontPageCard({
  mirror,
  title,
  content,
  imgSrc,
  imgAlt,
}) {
  const mirrorStyle = "bg-[#0c010c] rounded-none lg:flex-row-reverse";
  let wrapperStyle =
    "flex py-5 lg:py-20 flex-col-reverse gap-3 items-center my-1 lg:my-4 shadow-xl lg:px-20 lg:flex-row";
  if (mirror) {
    wrapperStyle += " ";
    wrapperStyle += mirrorStyle;
  }
  return (
    <div className={wrapperStyle}>
      <figure className="p-2 max-w-2xl lg:p-10">
        <img src={imgSrc} alt={imgAlt} className="h-64 lg:h-96 shadow-lg" />
      </figure>
      <div className="flex flex-col items-center gap-2 px-2">
        <h2 className="text-xl lg:text-3xl text-white font-bold">{title}</h2>
        <p className="text-white text-md lg:text-lg">{content}</p>
      </div>
    </div>
  );
}
