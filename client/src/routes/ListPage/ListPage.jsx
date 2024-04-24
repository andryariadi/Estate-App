import "./listPage.scss";
import { listData } from "../../libs/dummydata";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card";
import Map from "../../components/map/Map";
import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import LoaderPost from "../../components/LoaderPost/LoaderPost";
import ErrorPost from "../../components/ErrorPost/ErrorPost";

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
            <Suspense fallback={<LoaderPost />}>
              <Await resolve={data.postResponse} errorElement={<ErrorPost />}>
                {(postResponse) => postResponse.data.map((post) => <Card key={post.id} item={post} />)}
              </Await>
            </Suspense>
          </div>
        </div>
        <div className="mapContainer">
          <Suspense fallback={<LoaderPost />}>
            <Await resolve={data.postResponse} errorElement={<ErrorPost />}>
              {(postResponse) => <Map items={postResponse.data} />}
            </Await>
          </Suspense>
        </div>
      </div>
    </>
  );
}
