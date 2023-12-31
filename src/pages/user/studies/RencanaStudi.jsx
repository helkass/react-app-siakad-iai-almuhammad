import {
   Button,
   Table,
   TableContainer,
   Tbody,
   Td,
   Th,
   Thead,
   Tr,
} from "@chakra-ui/react";
import ErrorBoundary from "../../../components/error/ErrorBoundary";
import UserSection from "../../../components/layout/UserSection";
import { TableLoaderComponent } from "../../../components/common/LoaderComponent";
import { AiFillPrinter } from "react-icons/ai";
import { useFetch } from "../../../helpers";
import { useAuth } from "../../../contexts/useAuth";
import { useEffect } from "react";
import { downloadBase64File } from "../../../utils/downloadFile";

const RencanaStudi = () => {
   const jadwalKuliah = useFetch();
   const rencanaStudi = useFetch();

   const { user } = useAuth();

   const handleDownload = () => {
      downloadBase64File(
         rencanaStudi.data?.file,
         `KRS_${rencanaStudi.data?.nim}`,
         ".pdf"
      );
   };

   useEffect(() => {
      jadwalKuliah.get(`/jadwal?kelas=${user.kelas}`);
      rencanaStudi.get(`/transkrip/rencana?nim=${user.nim}`);
   }, []);

   return (
      <UserSection title="Rencana Studi">
         <TableContainer bg="white">
            <Table variant="striped" size={"md"} colorScheme="blackAlpha" p="2">
               <Thead>
                  <Tr>
                     <Th w="2%" rowSpan={2}>
                        No.
                     </Th>
                     <Th rowSpan={2}>Kode MK</Th>
                     <Th rowSpan={2}>nama MK</Th>
                     <Th rowSpan={2}>dosen pengajar</Th>
                     <Th rowSpan={2}>sks</Th>
                     <Th rowSpan={2}>Kelas</Th>
                     <Th colSpan={3} textAlign="center">
                        perkuliahan
                     </Th>
                  </Tr>
                  <Tr>
                     <Th textAlign="center">ruang</Th>
                     <Th textAlign="center">hari</Th>
                     <Th textAlign="center">waktu</Th>
                  </Tr>
               </Thead>
               <Tbody>
                  {jadwalKuliah.isLoading ? (
                     <TableLoaderComponent colSpan={9} />
                  ) : jadwalKuliah.data !== null ? (
                     jadwalKuliah.data.map((item, idx) => {
                        const {
                           jadwal_mata_kuliah,
                           dosen_jadwal_kuliah,
                           waktu_jadwal_kuliah,
                           ...rest
                        } = item;
                        return (
                           <Tr key={item.id}>
                              <Td w="2%">{idx + 1}</Td>
                              <Td textAlign="left">
                                 {jadwal_mata_kuliah.kode}
                              </Td>
                              <Td>{rest.mata_kuliah}</Td>
                              <Td>{dosen_jadwal_kuliah.name}</Td>
                              <Td>{jadwal_mata_kuliah.sks}</Td>
                              <Td>{user.kelas}</Td>
                              <Td textAlign="center">{rest.ruangan}</Td>
                              <Td textAlign="center">{rest.hari}</Td>
                              <Td textAlign="center">
                                 {waktu_jadwal_kuliah.waktu_mulai} -
                                 {waktu_jadwal_kuliah.waktu_berakhir}
                              </Td>
                           </Tr>
                        );
                     })
                  ) : (
                     <ErrorBoundary />
                  )}
               </Tbody>
            </Table>
         </TableContainer>
         <Button
            colorScheme="yellow"
            gap="4"
            color="white"
            w="max-content"
            mx="auto"
            onClick={handleDownload}
            my="5">
            <AiFillPrinter size={22} />
            Cetak KRS
         </Button>
      </UserSection>
   );
};

export default RencanaStudi;
