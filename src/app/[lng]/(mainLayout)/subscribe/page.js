'use client'

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js"
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout
} from '@stripe/react-stripe-js';
import { createCheckoutSession } from "@/Utils/AxiosUtils/API";
import request from "@/Utils/AxiosUtils";


const stripePromise = loadStripe('pk_test_51OxDKSCDWd9X1idI3QNCSTnGjgZHCt4eEi3ZUP8rahY85DjmdbYwfjKCNNIlkdyYqnGpergudtZ4YuUNim4Criae00q50z6rse');

const SubScription = () => {
    const [loaded, setLoaded] = useState(false);
    const [clientSecret, setClientSecret] = useState();
    // const [options, setOptions] = useState({});

    useEffect(() => {
        fetchClientSecret();
    }, [])

    const fetchClientSecret = async () => {
        setLoaded(false);
        const response = await request({ url: createCheckoutSession });
        setClientSecret(response.data.client_secret);
    }

    return (
        <>
            {clientSecret && <EmbeddedCheckoutProvider
                stripe={stripePromise}
                options={{ clientSecret: clientSecret }}
            >
                <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>}
        </>
    )
}

export default SubScription;