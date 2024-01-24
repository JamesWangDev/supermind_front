import React, { useContext } from "react";
import { Col, Row } from "reactstrap";
import SettingContext from "@/Helper/SettingContext";
import defaultMaintenance from "../../../public/assets/images/vegetable/bg-img.jpg"

const MaintenanceComponent = () => {
  const { settingData } = useContext(SettingContext);

  return (
    <section
      className="coming-soon-section pt-0"
      style={{backgroundImage: `url(${settingData?.maintenance?.maintenance_image?.original_url ?? defaultMaintenance})`,}}
    >
      <div className="bg-black"></div>
      <div className="container-fluid-lg w-100">
        <Row>
          <Col lg="5" />

          <Col xxl="5" xl="6" lg="7">
            <div className="coming-box">
              <div>
                <div className="coming-title">
                  <h2>{settingData?.maintenance?.title}</h2>
                </div>
                <p className="coming-text">
                  {settingData?.maintenance?.description}
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default MaintenanceComponent;
