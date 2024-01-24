import SingleStoreDetail from "@/Components/Seller/Stores/SingleStoreDetail"

const SellerStoreDetail = ({ params }) => {
    return (
        <SingleStoreDetail params={params?.slug} />
    )
}
export default SellerStoreDetail