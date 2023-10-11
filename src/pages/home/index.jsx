import { Helmet } from "react-helmet-async";
import { HeroComponent, LayananComponent } from "../../components";

const HomePage = () => {
   return (
      <>
         <Helmet>
            <meta
               name="description"
               content="Registrasi data mahasiswa. aplikasi khusus bagi mahasiswa IAI Al Muhammad Cepu"
            />
            <title>Siakad Mahasiswa | IAI Al Muhammad Cepu</title>
         </Helmet>
         <HeroComponent />
         <LayananComponent />
      </>
   );
};

export default HomePage;
