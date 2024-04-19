import "./listcard.scss";
import { listData } from "../../libs/dummydata";
import Card from "../card/Card";

export default function ListCard() {
  return (
    <>
      <div className="list">
        {listData.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}
