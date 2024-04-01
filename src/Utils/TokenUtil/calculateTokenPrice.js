const UNIT_TOKEN_PRICE = 0.00001 // 0.001 USD cent

export const calculateTokenPrice = (token_price, token_value) => {
    const token_price_USDC = token_price / 1000 * 100;
    const total_price = token_price_USDC * token_value;
    return total_price / UNIT_TOKEN_PRICE;
}