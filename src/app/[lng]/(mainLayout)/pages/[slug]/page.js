
import PagesContent from '@/Components/Pages/PagesContent'
// import defaultImage from '../../../../../../public/assets/images/logo.png'

export async function generateMetadata({ params }) {
    // fetch data
    const pagesData = await fetch(`${process.env.API_PROD_URL}page/slug/${params?.slug}`).then((res) => res.json()).catch((err) => console.log("err", err))
    return {
        openGraph: {
            title: pagesData?.meta_title,
            description: pagesData?.meta_description,
            images: [
                {
                    // url: '../../../../../../public/assets/images/logo.png',
                    url: pagesData?.page_meta_image?.original_url,
                    width: 1200,
                    height: 600,
                },
                {
                    // url: pagesData?.page_meta_image?.original_url,
                    url: '../../../../../../public/assets/images/logo.png',
                    width: 1200,
                    height: 600,
                }
            ]
        },
    }
}
const Pages = ({ params }) => {
    return (
        params && <PagesContent params={params.slug} />
    )
}

export default Pages