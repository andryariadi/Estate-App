import { useLoaderData } from "react-router-dom";
import Map from "../../components/map/Map";
import Slider from "../../components/slider/Slider";
import { singlePostData, userData } from "../../libs/dummydata";
import "./detailpage.scss";

export default function DetailPage() {
  const detailData = singlePostData;

  const post = useLoaderData();

  console.log(post, "<----disinglepage");

  return (
    <>
      <div className="detailContainer">
        <div className="details">
          <div className="wrapper">
            <Slider images={post.images} />
            <div className="infoContainer">
              <div className="top">
                <div className="post">
                  <h1>{post.title}</h1>
                  <div className="address">
                    <img src="/pin.png" alt={post.title} />
                    <span>{post.address}</span>
                  </div>
                  <div className="price">$ {post.price}</div>
                </div>
                <div className="user">
                  <img src={post.user.avatar || "/noavatar.jpg"} alt={post.user.username} />
                  <span>{post.user.username}</span>
                </div>
              </div>
              <div className="bottom">{post.postDetail.desc}</div>
            </div>
          </div>
        </div>
        <div className="features">
          <div className="wrapper">
            <div className="title">General</div>
            <div className="listGeneral">
              <div className="feature">
                <img src="/utility.png" alt="" />
                <div className="featureText">
                  <span>Utilities</span>
                  {post.postDetail.utilities === "owner" ? <p>Owner is responsible</p> : <p>Tenant is responsible</p>}
                </div>
              </div>
              <div className="feature">
                <img src="/pet.png" alt="" />
                <div className="featureText">
                  <span>Pet Policy</span>
                  {post.postDetail.pet === "allowed" ? <p>Pets Allowed</p> : <p>Pets not Allowed</p>}{" "}
                </div>
              </div>
              <div className="feature">
                <img src="/fee.png" alt="" />
                <div className="featureText">
                  <span>Income Policy</span>
                  <p>{post.postDetail.income}</p>
                </div>
              </div>
            </div>
            <div className="title">Sizes</div>
            <div className="listSize">
              <div className="size">
                <img src="/size.png" alt="" />
                <span>{post.postDetail.size} sqft</span>
              </div>
              <div className="size">
                <img src="/bed.png" alt="" />
                <span>{post.bedroom} beds</span>
              </div>
              <div className="size">
                <img src="/bath.png" alt="" />
                <span>{post.bathroom} bathroom</span>
              </div>
            </div>
            <div className="title">Nearby Places</div>
            <div className="listNearby">
              <div className="feature">
                <img src="/school.png" alt="" />
                <div className="featureText">
                  <span>School</span>
                  <p>{post.postDetail.school > 999 ? post.postDetail.school / 1000 + " km" : post.postDetail.school + " m"} away</p>
                </div>
              </div>
              <div className="feature">
                <img src="/pet.png" alt="" />
                <div className="featureText">
                  <span>Bus Stop</span>
                  <p>{post.postDetail.bus} m away</p>
                </div>
              </div>
              <div className="feature">
                <img src="/fee.png" alt="" />
                <div className="featureText">
                  <span>Restaurant</span>
                  <p>{post.postDetail.restaurant}</p>
                </div>
              </div>
            </div>
            <div className="title">Location</div>
            <div className="mapContainer">
              <Map items={[detailData]} />
            </div>
            <div className="buttons">
              <button>
                <img src="/chat.png" alt="" />
                Send a Message
              </button>
              <button>
                <img src="/save.png" alt="" />
                Save the Place
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
