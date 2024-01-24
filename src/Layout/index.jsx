'use client';
import React, { useContext, useEffect, useState } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SubLayout from './SubLayout';
import ThemeOptionProvider from '@/Helper/ThemeOptionsContext/ThemeOptionProvider';
import SettingProvider from '@/Helper/SettingContext/SettingProvider';
import ProductProvider from '@/Helper/ProductContext/ProductProvider';
import I18NextContext from '@/Helper/I18NextContext';
import CategoryProvider from '@/Helper/CategoryContext/CategoryProvider';
import AccountProvider from '@/Helper/AccountContext/AccountProvider';
import CartProvider from '@/Helper/CartContext/CartProvider';
import { ToastContainer } from 'react-toastify';
import BlogProvider from '@/Helper/BlogContext/BlogProvider';
import CompareProvider from '@/Helper/CompareContext/CompareProvider';
import ProductIdsProvider from '@/Helper/ProductIdsContext/ProductIdsProvider';
import CurrencyProvider from '@/Helper/CurrencyContext/CurrencyProvider';

const MainLayout = ({ children, lng  }) => {
  const { i18Lang, setI18Lang } = useContext(I18NextContext);
  const [queryClient] = useState(() => new QueryClient());
  useEffect(() => {
    if (i18Lang == '') {
      setI18Lang(lng);
    }
  }, [lng]);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={children.dehydratedState}>
          <ThemeOptionProvider>
            <AccountProvider>
              <BlogProvider>
                <ProductIdsProvider>
                  <CompareProvider>
                    <CartProvider>
                      <CategoryProvider>
                        <ProductProvider>
                          <SettingProvider>
                            <CurrencyProvider>
                              <SubLayout children={children}  />
                            </CurrencyProvider>
                          </SettingProvider>
                        </ProductProvider>
                      </CategoryProvider>
                    </CartProvider>
                  </CompareProvider>
                </ProductIdsProvider>
              </BlogProvider>
            </AccountProvider>
          </ThemeOptionProvider>
        </Hydrate>
      </QueryClientProvider>
      <ToastContainer theme='colored' />
    </>
  );
};

export default MainLayout;
