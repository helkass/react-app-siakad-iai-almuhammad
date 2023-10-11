import {
   Container,
   VStack,
   Box,
   Image,
   Text,
   Drawer,
   DrawerBody,
   Accordion,
   AccordionItem,
   AccordionButton,
   AccordionPanel,
   AccordionIcon,
   DrawerHeader,
   DrawerOverlay,
   DrawerContent,
   DrawerCloseButton,
   Link as ChakraLink,
   useDisclosure,
   Button,
   HStack,
   Heading,
} from "@chakra-ui/react";
import {
   Link as RouterDom,
   Outlet,
   useLocation,
   useNavigate,
} from "react-router-dom";
import { HiHome } from "react-icons/hi2";
import { FaBars, FaListAlt } from "react-icons/fa";
import { BiBook } from "react-icons/bi";
import { MdOutlineListAlt, MdPayment } from "react-icons/md";
import { BsCardChecklist } from "react-icons/bs";
import user_image from "../../assets/user.jpg";
import { useAuth } from "../../contexts/useAuth";
import { Helmet } from "react-helmet-async";
import ProtectRoute from "../../middleware/ProtectRoute";
import { useCallback, useEffect } from "react";
import { useFetch } from "../../helpers";
import { useLocalStorage } from "../../contexts/useLocalStorage";

const UserLayout = () => {
   const { isOpen, onClose, onOpen } = useDisclosure();
   const { logout } = useAuth();
   const location = useLocation();
   const fromLocation = location.state;
   const mahasiswa = useFetch();
   const user = useLocalStorage("mahasiswa", null);
   const navigate = useNavigate();

   const getUser = useCallback(async () => {
      if (!fromLocation && user[0] === null) {
         navigate("/login", { replace: true, state: location });
         return;
      }
      user !== null && (await mahasiswa.get(`/mahasiswa/${user[0].id}`));
   }, []);

   useEffect(() => {
      getUser();
   }, []);

   return (
      <Container as="section" maxW="7xl" px={{ base: 0, md: 5 }}>
         <Navbar logout={() => logout()} onOpen={onOpen} />
         <DrawerNavigation
            image={
               mahasiswa.data !== null ? mahasiswa.data.profilePic : user_image
            }
            nim={mahasiswa.data !== null ? mahasiswa.data.nim : "loading..."}
            name={mahasiswa.data !== null ? mahasiswa.data.name : "loading..."}
            isOpen={isOpen}
            onClose={onClose}
         />
         <ProtectRoute>
            <Outlet />
         </ProtectRoute>
      </Container>
   );
};

const DrawerNavigation = ({ image, name, nim, isOpen, onClose, btnRef }) => {
   const styles = {
      linkDrawer: {
         display: "flex",
         gap: "10px",
         alignItems: "center",
         justify: "left",
         fontWeight: "600",
      },
   };
   return (
      <Drawer
         isOpen={isOpen}
         placement="left"
         onClose={onClose}
         finalFocusRef={btnRef}>
         <DrawerOverlay />
         <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Siakad Mahasiswa</DrawerHeader>
            <DrawerBody>
               {/* profile mahasiswa */}
               <VStack
                  gap={"10px"}
                  my="20px"
                  boxShadow={"md"}
                  rounded="lg"
                  py="20px">
                  <Image
                     src={image}
                     alt={"user-profile"}
                     boxSize={100}
                     rounded="full"
                  />
                  <Text>{name}</Text>
                  <Text>{nim}</Text>
                  <HStack>
                     <RouterDom to="profile">
                        <Button colorScheme="teal">Lihat Profile</Button>
                     </RouterDom>
                     <RouterDom to="photo">
                        <Button colorScheme="teal">Foto Profile</Button>
                     </RouterDom>
                  </HStack>
               </VStack>
               {/* end profile mahasiswa */}
               <VStack gap="10px" align="start" mt="10">
                  <Helmet>
                     <meta
                        name="description"
                        content="mahasiswa IAI Al Muhammad Cepu"
                     />
                     <title>mhs Al Muhammad Cepu</title>
                  </Helmet>
                  <ChakraLink
                     as={RouterDom}
                     to="dashboard"
                     w="full"
                     onClick={onClose}
                     rounded="sm"
                     _hover={{ bg: "green.50" }}>
                     <Button
                        onClick={onClose}
                        sx={styles.linkDrawer}
                        colorScheme={"trnasparent"}
                        color="black">
                        <HiHome />
                        Dashboard
                     </Button>
                  </ChakraLink>
                  {/* studies */}
                  <Accordion allowToggle gap="20px" rounded="sm" w="full">
                     <AccordionItem border={"none"} mb="10px">
                        <AccordionButton _hover={{ bg: "green.50" }}>
                           <Box
                              as="span"
                              flex="1"
                              textAlign="left"
                              sx={styles.linkDrawer}>
                              <BiBook />
                              Rencana & Hasil Studi
                           </Box>
                           <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel pb={4}>
                           <VStack gap={3} align="left">
                              <ChakraLink
                                 _hover={{ bg: "green.50" }}
                                 as={RouterDom}
                                 to="krs"
                                 w="full"
                                 p="2"
                                 onClick={onClose}
                                 sx={styles.linkDrawer}>
                                 <BsCardChecklist />
                                 Rencana Studi (KRS)
                              </ChakraLink>
                              <ChakraLink
                                 _hover={{ bg: "green.50" }}
                                 as={RouterDom}
                                 to="khs"
                                 w="full"
                                 p="2"
                                 onClick={onClose}
                                 sx={styles.linkDrawer}>
                                 <FaListAlt />
                                 Hasil Studi
                              </ChakraLink>
                              <ChakraLink
                                 _hover={{ bg: "green.50" }}
                                 as={RouterDom}
                                 to="transkrip"
                                 w="full"
                                 p="2"
                                 onClick={onClose}
                                 sx={styles.linkDrawer}>
                                 <MdOutlineListAlt />
                                 Transkrip Nilai
                              </ChakraLink>
                           </VStack>
                        </AccordionPanel>
                     </AccordionItem>
                     <AccordionItem border={"none"} mb="10px">
                        <AccordionButton _hover={{ bg: "green.50" }}>
                           <Box
                              as="span"
                              flex="1"
                              textAlign="left"
                              sx={styles.linkDrawer}>
                              <MdPayment />
                              Pembayaran
                           </Box>
                           <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel pb={4}>
                           <VStack gap={3} align="left">
                              <ChakraLink
                                 _hover={{ bg: "green.50" }}
                                 as={RouterDom}
                                 to="biaya"
                                 w="full"
                                 p="2"
                                 onClick={onClose}
                                 sx={styles.linkDrawer}>
                                 <BsCardChecklist />
                                 Info Biaya Kuliah
                              </ChakraLink>
                              <ChakraLink
                                 _hover={{ bg: "green.50" }}
                                 as={RouterDom}
                                 to="tagihan"
                                 w="full"
                                 p="2"
                                 onClick={onClose}
                                 sx={styles.linkDrawer}>
                                 <MdOutlineListAlt />
                                 Info Tagihan
                              </ChakraLink>
                           </VStack>
                        </AccordionPanel>
                     </AccordionItem>
                  </Accordion>
               </VStack>
            </DrawerBody>
         </DrawerContent>
      </Drawer>
   );
};

const Navbar = ({ onOpen, logout }) => {
   return (
      <HStack
         display="flex"
         justify="space-between"
         pos="sticky"
         top="0px"
         zIndex={50}
         bg="whiteAlpha.800"
         backdropFilter={"blur(4px)"}
         py="15px"
         px={{ base: 2, md: 5 }}
         align="center">
         <HStack gap="10px">
            <Button p="2" color="gray.500" onClick={onOpen}>
               <FaBars size={16} />
            </Button>
            <Heading
               fontSize={"20"}
               color="var(--primary)"
               display={{ base: "none", md: "block" }}>
               Universitas IAI AL Muhammad
            </Heading>
         </HStack>
         <Button colorScheme="red" onClick={logout}>
            Keluar
         </Button>
      </HStack>
   );
};

export default UserLayout;
