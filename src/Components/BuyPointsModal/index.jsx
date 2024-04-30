import { useState, useContext } from "react"
import CustomModal from "../Common/CustomModal"
import CustomDropDown from "../Common/CustomDropDown/CustomDropDown"
import Btn from "@/Elements/Buttons/Btn"
import SettingContext from "@/Helper/SettingContext"
import { UNIT_TOKEN_PRICE } from "@/Utils/TokenUtil/calculateTokenPrice"
import { useRouter } from "next/navigation"
import I18NextContext from "@/Helper/I18NextContext"

const pointsList = [
    {
        name: "500000",
        value: 500000
    },
    {
        name: "1,000,000",
        value: 1000000
    },
    {
        name: "5,000,000",
        value: 5000000
    },
    {
        name: "10,000,000",
        value: 10000000
    },
    {
        name: "50,000,000",
        value: 50000000
    },
    {
        name: "100,000,000",
        value: 100000000
    },
    {
        name: "custom",
        value: "custom"
    }
]

const BuyPointsModal = ({modal, setModal}) => {
    const router = useRouter();
    const [point, setPoint] = useState(500000);
    const { convertCurrency } = useContext(SettingContext);
    const [customPoint, setCustomPoint] = useState(0);
    const { i18Lang } = useContext(I18NextContext);

    const handleGoToBuy = () => {
        const pointsvalue = point === "custom" ? customPoint : point;
        if (pointsvalue == 0) {
            alert("Please set the points amount to buy...");
            return;
        }

        if (pointsvalue < 500000) {
            alert("Points amount should be greater than 10000 points...");
            return;
        }

        router.push(`/${i18Lang}/buypoints/${pointsvalue}`);
    }

    return (
        <CustomModal modal={modal} setModal={setModal} classes={{ modalClass: 'theme-modal delete-modal', modalHeaderClass: 'p-2' }}>
            {/* <RiDeleteBinLine className='icon-box' /> */}
            <h5 className='modal-title'>{'Do you want to buy additional points?'}</h5>
            <p>{"Please set the points amount you want to buy for now."} </p>
            <div className='w-100 d-flex justify-content-between align-items-center p-3'>
                <div className='w-50'>
                    <CustomDropDown items={pointsList} value={point} handleSelectChange={setPoint} placeholder={"Select Points amout..."} toggleStyle={{ height: "40px" }} toggleClassName={"w-100 rounded-2"} />
                    {point === "custom" && <Input min={10000} type='number' value={customPoint} onChange={(e) => setCustomPoint(e.target.value)} style={{ height: "40px", border: "none" }} className="rounded-2 text-center mt-2" />}
                </div>
                <div className='w-50 d-flex justify-content-center' style={{ fontWeight: 600, fontSize: 20 }}>
                    {convertCurrency(UNIT_TOKEN_PRICE * (point == "custom" ? customPoint : point) / 100)}
                </div>
            </div>
            <div className='button-box mt-4'>
                <Btn title='Cancel' className='btn btn-md btn-theme-outline fw-bold' onClick={() => {
                    setModal('');
                }}
                />
                <Btn title='Confirm' className='theme-bg-color btn-md fw-bold text-light' onClick={handleGoToBuy} />
            </div>
        </CustomModal>
    )
}

export default BuyPointsModal