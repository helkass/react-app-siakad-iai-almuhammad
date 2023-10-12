import { Route, Routes } from "react-router-dom";
import {
   BiayaKuliahPage,
   DashboardPage,
   ErrorPage,
   HasilStudi,
   HomePage,
   LoginPage,
   PhotoProfile,
   ProfilePage,
   RegistrasiPage,
   RencanaStudi,
   TagihanPage,
   Transkrip,
   ValidationRegister,
} from "./pages";
import { LayoutComponent, UserLayout } from "./components";
import ProtectRoute from "./middleware/ProtectRoute";

function App() {
   return (
      <div className="App">
         <Routes>
            <Route path="/">
               <Route
                  index
                  element={
                     <LayoutComponent>
                        <HomePage />
                     </LayoutComponent>
                  }
               />
               <Route
                  path="login"
                  element={
                     <LayoutComponent>
                        <LoginPage />
                     </LayoutComponent>
                  }
               />
               <Route
                  path="registrasi"
                  element={
                     <LayoutComponent>
                        <ValidationRegister />
                     </LayoutComponent>
                  }
               />
               <Route
                  path="registrasi/:id"
                  element={
                     <LayoutComponent>
                        <RegistrasiPage />
                     </LayoutComponent>
                  }
               />
               <Route
                  path="mhs/:nim"
                  element={
                     <ProtectRoute>
                        <UserLayout />
                     </ProtectRoute>
                  }>
                  <Route index element={<DashboardPage />} />
                  <Route path="dashboard" element={<DashboardPage />} />
                  <Route path="profile" element={<ProfilePage />} />
                  <Route path="photo" element={<PhotoProfile />} />
                  <Route path="krs" element={<RencanaStudi />} />
                  <Route path="khs" element={<HasilStudi />} />
                  <Route path="transkrip" element={<Transkrip />} />
                  <Route path="biaya" element={<BiayaKuliahPage />} />
                  <Route path="tagihan" element={<TagihanPage />} />
               </Route>
               <Route path="*" element={<ErrorPage />} />
            </Route>
         </Routes>
      </div>
   );
}

export default App;
