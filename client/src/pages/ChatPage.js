import { ChatState } from "../Context/ChatProvider";
import SideMenu from "../components/Chat/SideMenu";
import MyChats from "../components/Chat/MyChats";
import ChatBox from "../components/Chat/ChatBox";
import { Box, Flex } from "@chakra-ui/react";

const ChatPage = () => {
  const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      {user && <SideMenu />}
      <Flex
        display={"flex"}
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        p="10px"
      >
        <Box>{user && <MyChats />}</Box>
        <Box>{user && <ChatBox />}</Box>
      </Flex>
    </div>
  );
};

export default ChatPage;
