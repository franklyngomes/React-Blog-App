import ResponsiveAppBar from '../header/Header'

const Wrapper = ({children}) => {
  return (
    <>
    <ResponsiveAppBar/>
      {children}
    </>
  )
}

export default Wrapper