'use client'

import { useEffect, useState, useContext } from "react";
import { useRouter } from 'next/navigation';
import I18NextContext from '@/Helper/I18NextContext';
import { loadStripe } from "@stripe/stripe-js"
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout
} from '@stripe/react-stripe-js';
import { createBuyPointsSession } from "@/Utils/AxiosUtils/API";
import { PointCredit } from "@/Utils/AxiosUtils/API";
import request from "@/Utils/AxiosUtils";
import useCreate from "@/Utils/Hooks/useCreate";
import { UNIT_TOKEN_PRICE } from "@/Utils/TokenUtil/calculateTokenPrice";

const stripePromise = loadStripe('pk_test_51OdHY7KW8hGDL1NPMQo0EdWgWQabti7SYRMp8uJvr5gmS0uNfWXYQY98iUPCAF9RuGJDmHna5YVZiiXcZqqNIbUA000m7uxswq');

const BuyPoints = ({params}) => {
    const router = useRouter();
    const [loaded, setLoaded] = useState(false);
    const [clientSecret, setClientSecret] = useState();
    const [payamount, setPayamount] = useState(0);
    const { i18Lang } = useContext(I18NextContext);
    // const [options, setOptions] = useState({});
    const { mutate: createPointCredit, isLoading: creditLoader } = useCreate(PointCredit, false, false, false, () => {
        alert(`Great! You bought the ${payamount / UNIT_TOKEN_PRICE} points successfully!`);
        router.push(`/${i18Lang}/account/dashboard`);
    }, true);

    useEffect(() => {
        fetchClientSecret();
    }, [])

    const fetchClientSecret = async () => {
        setLoaded(false);
        const response = await request({ url: createBuyPointsSession, params: { payamount: params.points * UNIT_TOKEN_PRICE } });
        setClientSecret(response.data.client_secret);
        setPayamount(response.data.amount_total || 0);
    }

    const handleOnBuyComplete = () => {
        createPointCredit({balance: payamount / UNIT_TOKEN_PRICE});
    }

    return (
        <>
            {clientSecret && <EmbeddedCheckoutProvider
                stripe={stripePromise}
                options={{ 
                    clientSecret: clientSecret,
                    onComplete: handleOnBuyComplete
                }}
            >
                <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>}
        </>
    )
}

export default BuyPoints;