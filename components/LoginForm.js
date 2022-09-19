import {
  Box,
  Heading,
  Text,
  Icon,
  Pressable,
  VStack,
  FormControl,
  WarningOutlineIcon,
  Input,
  Link,
  Button,
  HStack
} from 'native-base';
import React, { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const handleSubmit = () => {
    var emailValid = false;
    if (email.length == 0) {
      setEmailError("Email is required");
    }
    else if (email.length < 6) {
      setEmailError("Email should be minimum 6 characters");
    }
    else if (email.indexOf(' ') >= 0) {
      setEmailError('Email cannot contain spaces');
    }
    else {
      emailValid = true;
      setEmailError("");
    }

    var passwordValid = false;
    if (password.length == 0) {
      setPasswordError("Password is required");
    }
    else if (password.length < 6) {
      setPasswordError("Password should be minimum 6 characters");
    }
    else if (password.indexOf(' ') >= 0) {
      setPasswordError('Password cannot contain spaces');
    }
    else {
      passwordValid = true;
      setPasswordError("");
    }

    if (emailValid && passwordValid) {
      alert('Email: ' + email + '\nPassword: ' + password);
    }
  }

  return (
    <Box safeArea p="2" py="4" w="90%" maxW="290">
      <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }}>
        Welcome
      </Heading>
      <Heading mt="1" _dark={{
        color: "warmGray.200"
      }} color="coolGray.600" fontWeight="medium" size="xs">
        Sign in to continue!
      </Heading>

      <VStack space={3} mt="5">
        <FormControl isRequired isInvalid={emailError.length > 0}>
          <FormControl.Label>Email ID</FormControl.Label>
          <Input placeholder="Enter Email" onChangeText={text => setEmail(text)} />
          {emailError.length > 0 && <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {emailError}
          </FormControl.ErrorMessage>}
        </FormControl>
        <FormControl isRequired isInvalid={passwordError.length > 0}>
          <FormControl.Label>Password</FormControl.Label>
          <Input type={show ? "text" : "password"} InputRightElement={<Pressable onPress={() => setShow(!show)}>
            <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
          </Pressable>} placeholder="Enter Password" onChangeText={text => setPassword(text)} />
          {passwordError.length > 0 && <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {passwordError}
          </FormControl.ErrorMessage>}
          <Link _text={{
            fontSize: "xs",
            fontWeight: "500",
            color: "indigo.500"
          }} alignSelf="flex-end" mt="1">
            Forget Password?
          </Link>
        </FormControl>
        <Button mt="2" colorScheme="indigo" onPress={handleSubmit}>
          Sign in
        </Button>

        <HStack mt="6" justifyContent="center">
          <Text fontSize="sm" color="coolGray.600" _dark={{
            color: "warmGray.200"
          }}>
            I'm a new user.{" "}
          </Text>
          <Link _text={{
            color: "indigo.500",
            fontWeight: "medium",
            fontSize: "sm"
          }} href="#">
            Sign Up
          </Link>
        </HStack>
      </VStack>
    </Box>
  );
};