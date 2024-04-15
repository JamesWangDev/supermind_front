import React, { useContext } from 'react';
import Image from 'next/image';
import Btn from '@/Elements/Buttons/Btn';
import AccountContext from '@/Helper/AccountContext';
import coverImage from '../../../../public/assets/images/inner-page/cover-img.png';
import Avatar from '@/Components/Common/Avatar';

const SidebarProfile = () => {
  const { accountData } = useContext(AccountContext);
  return (
    <>
      <div className='profile-box'>
        <div className='cover-image'>
          <Image src={coverImage} className='img-fluid' alt='cover-image' height={150} width={378} />
        </div>

        <div className='profile-contain'>
          <div className='profile-image'>
            <div className='position-relative'>
              <div className='user-round'>
                <Avatar name={accountData?.name} customImageClass={'update_img'} alt='profile-image' height={108} width={108} />
              </div>
            </div>
          </div>

          <div className='profile-name'>
            <h3>{accountData?.name}</h3>
            <h6 className='text-title'>{accountData?.email}</h6>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarProfile;
