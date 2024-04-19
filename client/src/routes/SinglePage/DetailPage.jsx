import Map from "../../components/map/Map";
import Slider from "../../components/slider/Slider";
import { singlePostData, userData } from "../../libs/dummydata";
import "./detailpage.scss";

export default function DetailPage() {
  const detailData = singlePostData;

  console.log(detailData, "<----disinglepage");

  return (
    <>
      <div className="detailContainer">
        <div className="details">
          <div className="wrapper">
            <Slider images={detailData.images} />
            <div className="infoContainer">
              <div className="top">
                <div className="post">
                  <h1>{detailData.title}</h1>
                  <div className="address">
                    <img src="/pin.png" alt={detailData.title} />
                    <span>{detailData.address}</span>
                  </div>
                  <div className="price">$ {detailData.price}</div>
                </div>
                <div className="user">
                  <img src={userData.img} alt={userData.name} />
                  <span>{userData.name}</span>
                </div>
              </div>
              <div className="bottom">{detailData.description}</div>
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
                  <p>Render is responsible</p>
                </div>
              </div>
              <div className="feature">
                <img src="/pet.png" alt="" />
                <div className="featureText">
                  <span>Pet Policy</span>
                  <p>Pets Allowed</p>
                </div>
              </div>
              <div className="feature">
                <img src="/fee.png" alt="" />
                <div className="featureText">
                  <span>Property Fees</span>
                  <p>Must have 3x the rent in the total household income</p>
                </div>
              </div>
            </div>
            <div className="title">Sizes</div>
            <div className="listSize">
              <div className="size">
                <img src="/size.png" alt="" />
                <span>80 sqft</span>
              </div>
              <div className="size">
                <img src="/bed.png" alt="" />
                <span>2 beds</span>
              </div>
              <div className="size">
                <img src="/bath.png" alt="" />
                <span>1 bathroom</span>
              </div>
            </div>
            <div className="title">Nearby Places</div>
            <div className="listNearby">
              <div className="feature">
                <img src="/school.png" alt="" />
                <div className="featureText">
                  <span>School</span>
                  <p>250m away</p>
                </div>
              </div>
              <div className="feature">
                <img src="/pet.png" alt="" />
                <div className="featureText">
                  <span>Bus Stop</span>
                  <p>100m away</p>
                </div>
              </div>
              <div className="feature">
                <img src="/fee.png" alt="" />
                <div className="featureText">
                  <span>Restaurant</span>
                  <p>200m away</p>
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
