import "./listPage.scss";
import { listData } from "../../libs/dummydata";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card";
import Map from "../../components/map/Map";
import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";

export default function ListPage() {
  // const data = listData;

  const data = useLoaderData();

  console.log(data, "<---dilistpage1");

  return (
    <>
      <div className="container">
        <div className="listContainer">
          <div className="wrapper">
            <Filter />
            <Suspense fallback={<div>Loading nih boss...</div>}>
              <Await resolve={data.postResponse} errorElement={<p>Error loading posts!</p>}>
                {(postResponse) => postResponse.data.map((post) => <Card key={post.id} item={post} />)}
              </Await>
            </Suspense>
          </div>
        </div>
        <div className="mapContainer">
          <Suspense fallback={<div>Loading nih boss...</div>}>
            <Await resolve={data.postResponse} errorElement={<p>Error loading posts!</p>}>
              {(postResponse) => <Map items={postResponse.data} />}
            </Await>
          </Suspense>
        </div>
      </div>
    </>
  );
}
