import ProductDetailContent from "@/Components/ProductDetails"
export async function generateMetadata({ params }) {
    // fetch data
    const productData = await fetch(`${process.env.API_PROD_URL}product/slug/${params?.productSlug}`).then((res) => res.json()).catch((err) => console.log("err", err))
    return {
        openGraph: {
            title: productData?.meta_title,
            description: productData?.meta_description,
            images: [productData?.product_meta_image?.original_url, []],
        },
    }
}

const ProductDetails = ({ params }) => {
    return (
        <ProductDetailContent type="product" params={params?.productSlug} />
    )
}

export default ProductDetails