import { useCountdown } from '@/Utils/Hooks/useCountDown';

const Timer = ({ elem }) => {
  const [days, hours, minutes, seconds] = useCountdown('', elem?.end_date);
  if (days + hours + minutes + seconds <= 0) {
    return <h1>Expired</h1>;
  } else {
    return (
      <div className='timer timer-2 ms-0 my-4'>
        <ul className='d-flex justify-content-center'>
          <li>
            <div className='counter'>
              <div className='days'>
                <h6>{days}</h6>
              </div>
            </div>
          </li>
          <li>
            <div className='counter'>
              <div className='hours'>
                <h6>{hours}</h6>
              </div>
            </div>
          </li>
          <li>
            <div className='counter'>
              <div className='minutes'>
                <h6>{minutes}</h6>
              </div>
            </div>
          </li>
          <li>
            <div className='counter'>
              <div className='seconds'>
                <h6>{seconds}</h6>
              </div>
            </div>
          </li>
        </ul>
      </div>
    );
  }
};

export default Timer;
