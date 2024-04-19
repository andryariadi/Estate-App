import "./listPage.scss";
import { listData } from "../../libs/dummydata";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card";
import Map from "../../components/map/Map";

export default function ListPage() {
  const data = listData;

  return (
    <>
      <div className="container">
        <div className="listContainer">
          <div className="wrapper">
            <Filter />
            {data.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </div>
        </div>
        <div className="mapContainer">
          <Map items={data} />
        </div>
      </div>
    </>
  );
}
