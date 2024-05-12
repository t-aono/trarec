import { Box, Divider } from "@chakra-ui/react";
import { PageLinks } from "../../molecules/PageLinks";

export const Footer = () => {
  return (
    <Box mt={5} pb={10} position="fixed" bottom={0} w="100%" backgroundColor="white">
      <Divider mb={5} />
      <PageLinks />
    </Box>
  );
};

export default Footer;
