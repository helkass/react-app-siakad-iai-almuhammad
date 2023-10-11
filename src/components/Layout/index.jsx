import HeaderComponent from "../home/Header";
import FooterComponent from "../Footer";

const LayoutComponent = ({ children }) => {
   return (
      <>
         <HeaderComponent />
         {children}
         <FooterComponent />
      </>
   );
};

export default LayoutComponent;
