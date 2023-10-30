import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { VStack } from "@chakra-ui/layout";
import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { ChatState } from "./../../Context/ChatProvider";

const Login = () => {
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const history = useHistory();
  const [show, setShow] = useState(false);

  const [email, setEmail] = useState();

  const [password, setPassword] = useState();
  const [Loading, setLoading] = useState(false);
  const { setUser } = ChatState();
  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );

      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error while Login",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing={"5px"}>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "Text" : "password"}
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width={"4.5rem"}>
            <Button h="1.75rem" size="4.5rem" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={Loading}
      >
        Login
      </Button>

      <Button
        variant={"solid"}
        colorScheme="red"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("123456");
        }}
      >
        Guest User Credentials
      </Button>
    </VStack>
  );
};
export default Login;

// import { Button } from "@chakra-ui/button";
// import { FormControl, FormLabel } from "@chakra-ui/form-control";
// import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
// import { VStack } from "@chakra-ui/layout";
// import { useState } from "react";
// import axios from "axios";
// import { useToast } from "@chakra-ui/react";
// import { useHistory } from "react-router-dom";
// import { ChatState } from "../../Context/ChatProvider";

// const Login = () => {
//   const [show, setShow] = useState(false);
//   const handleClick = () => setShow(!show);
//   const toast = useToast();
//   const [email, setEmail] = useState();
//   const [password, setPassword] = useState();
//   const [loading, setLoading] = useState(false);

//   const history = useHistory();
//   const { setUser } = ChatState();

//   const submitHandler = async () => {
//     setLoading(true);
//     if (!email || !password) {
//       toast({
//         title: "Please Fill all the Feilds",
//         status: "warning",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//       setLoading(false);
//       return;
//     }

//     try {
//       const config = {
//         headers: {
//           "Content-type": "application/json",
//         },
//       };

//       const { data } = await axios.post(
//         "/api/user/login",
//         { email, password },
//         config
//       );

//       toast({
//         title: "Login Successful",
//         status: "success",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//       setUser(data);
//       localStorage.setItem("userInfo", JSON.stringify(data));
//       setLoading(false);
//       history.push("/chats");
//     } catch (error) {
//       toast({
//         title: "Error Occured!",
//         description: error.response.data.message,
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//       setLoading(false);
//     }
//   };

//   return (
//     <VStack spacing="10px">
//       <FormControl id="email" isRequired>
//         <FormLabel>Email Address</FormLabel>
//         <Input
//           value={email}
//           type="email"
//           placeholder="Enter Your Email Address"
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </FormControl>
//       <FormControl id="password" isRequired>
//         <FormLabel>Password</FormLabel>
//         <InputGroup size="md">
//           <Input
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             type={show ? "text" : "password"}
//             placeholder="Enter password"
//           />
//           <InputRightElement width="4.5rem">
//             <Button h="1.75rem" size="sm" onClick={handleClick}>
//               {show ? "Hide" : "Show"}
//             </Button>
//           </InputRightElement>
//         </InputGroup>
//       </FormControl>
//       <Button
//         colorScheme="blue"
//         width="100%"
//         style={{ marginTop: 15 }}
//         onClick={submitHandler}
//         isLoading={loading}
//       >
//         Login
//       </Button>
//       <Button
//         variant="solid"
//         colorScheme="red"
//         width="100%"
//         onClick={() => {
//           setEmail("guest@example.com");
//           setPassword("123456");
//         }}
//       >
//         Get Guest User Credentials
//       </Button>
//     </VStack>
//   );
// };

// export default Login;
