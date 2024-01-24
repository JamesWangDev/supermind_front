import MainLayout from "@/Layout"

export default function RootLayout({ children, params: { lng } }) {
  return (
    <>
      <MainLayout lng={lng}>
        {children}
      </MainLayout>
    </>
  )
}
