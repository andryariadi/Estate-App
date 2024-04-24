import "./listPage.scss";
import { listData } from "../../libs/dummydata";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card";
import Map from "../../components/map/Map";
import { useLoaderData } from "react-router-dom";

export default function ListPage() {
  // const data = listData;

  const posts = useLoaderData();

  console.log(posts, "<---dilistpage");

  return (
    <>
      <div className="container">
        <div className="listContainer">
          <div className="wrapper">
            <Filter />
            {posts.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </div>
        </div>
        <div className="mapContainer">
          <Map items={posts} />
        </div>
      </div>
    </>
  );
}
