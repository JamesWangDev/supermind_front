import WrapperComponent from '../Common/WrapperComponent';

const MapSection = () => {
  return (
    <WrapperComponent classes={{ sectionClass: 'map-section', fluidClass: 'p-0' }} noRowCol={true}>
      <div className='map-box'>
        <iframe
          src='https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d2994.3803116994895!2d55.29773782339708!3d25.222534631321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m5!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai%20-%20United%20Arab%20Emirates!3m2!1d25.2048493!2d55.2707828!4m0!5e1!3m2!1sen!2sin!4v1652217109535!5m2!1sen!2sin'
          style={{ border: 0 }}
          allowFullScreen=''
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'></iframe>
      </div>
    </WrapperComponent>
  );
};

export default MapSection;
