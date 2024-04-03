import Image from 'next/image';
import gridImage3 from '../../../../public/assets/svg/grid-3.svg';
import gridImage4 from '../../../../public/assets/svg/grid-4.svg';
import gridImage5 from '../../../../public/assets/svg/grid-5.svg';
import listImage from '../../../../public/assets/svg/list.svg';

const GridBox = ({ grid, setGrid }) => {
  return (
    <div className='grid-option d-none d-md-block'>
      <ul>
        <li className={`three-grid ${grid == 3 ? 'active' : ''}`} onClick={() => setGrid(3)}>
          <a>
            <Image src={gridImage3} alt='grid image' height={13} width={15} />
          </a>
        </li>
        <li className={`grid-btn d-xxl-inline-block d-none ${grid == 4 ? 'active' : ''}`} onClick={() => setGrid(4)}>
          <a>
            <Image src={gridImage4} className='d-lg-inline-block d-none' alt='grid image' height={12} width={20} />
          </a>
        </li>
        <li className={`grid-btn d-xxl-inline-block d-none ${grid == 5 ? 'active' : ''}`} onClick={() => setGrid(5)}>
          <a>
            <Image src={gridImage5} className='d-lg-inline-block d-none' alt='grid image' height={12} width={20} />
          </a>
        </li>
        <li className={`list-btn ${grid == 'list' ? 'active' : ''}`} onClick={() => setGrid('list')}>
          <a>
            <Image src={listImage} alt='listImage' height={13} width={16} />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default GridBox;
