import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';
import { RiFacebookFill, RiInstagramLine, RiPinterestFill, RiTwitterFill } from 'react-icons/ri';
import Slider from 'react-slick';
import { Col, Row } from 'reactstrap';
import { creativeTeamSlider } from '../../../Data/SliderSettingsData';
import WrapperComponent from '../Common/WrapperComponent';

const CreativeTeam = () => {
  const { themeOption } = useContext(ThemeOptionContext);

  return (
    <WrapperComponent classes={{ sectionClass: 'team-section section-lg-space' }} colProps={{ xs: 12 }} noRowCol>
      <div className='about-us-title text-center'>
        <h4 className='text-content'>{ themeOption?.about_us?.team?.sub_title }</h4>
        <h2 className='center'>{ themeOption?.about_us?.team?.title }</h2>
      </div>
      <Row>
        <Col xs='12'>
          <Slider className='slider-user product-wrapper ' {...creativeTeamSlider}>
            {themeOption?.about_us?.team?.members?.map((data, index) => (
              <div className='team-box' key={index}>
                <div className='team-iamge'>
                  <img height={183.5} width={183.5} src={data?.profile_image_url} className='img-fluid' alt={data?.name} />
                </div>
                <div className='team-name'>
                  <h3>{data?.name}</h3>
                  <h5>{data?.designation}</h5>
                  <p>{data?.description}</p>
                  <ul className='team-media'>
                    {data?.facebook && <li><Link href={data?.facebook} className='fb-bg' target='_blank'><RiFacebookFill /></Link></li>}
                    {data?.pinterest && <li><Link href={data?.pinterest} className='pint-bg' target='_blank'><RiPinterestFill /></Link></li>}
                    {data?.twitter && <li><Link href={data?.twitter} className='twitter-bg' target='_blank'><RiTwitterFill /></Link></li>}
                    {data?.instagram && <li><Link href={data?.instagram} className='insta-bg' target='_blank'><RiInstagramLine /></Link></li>}
                  </ul>
                </div>
              </div>
            ))}
          </Slider>
        </Col>
      </Row>
    </WrapperComponent>
  );
};

export default CreativeTeam;
