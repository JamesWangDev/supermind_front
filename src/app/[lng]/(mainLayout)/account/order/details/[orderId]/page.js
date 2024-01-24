import OrderDetailsContain from "@/Components/Account/Orders/Details"

const OrderDetails = ({ params }) => {
    return (
        <>
            {params?.orderId && <OrderDetailsContain params={params?.orderId} />}
        </>
    )
}

export default OrderDetails