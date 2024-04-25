import "./listcard.scss";
import Card from "../card/Card";

export default function ListCard({ posts }) {
  return (
    <>
      <div className="list">
        {posts.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}
