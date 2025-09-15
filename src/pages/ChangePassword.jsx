import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Text,
  VStack
} from "@chakra-ui/react"
import { Field, Form, Formik } from "formik"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useBrandColors } from "../hooks/useBrandColors"
import { changePassword } from "../store/slices/authSlice"
import { changePasswordSchema } from "../utils/validationSchemas"

const ChangePassword = () => {
  const { bg, color, borderColor } = useBrandColors()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={4}
      py={8}
    >
      <Card
        w={{ base: "100%", sm: "480px", md: "520px" }}
        bg={bg}
        borderColor={borderColor}
        shadow="lg"
        rounded="2xl"
      >
        <CardHeader>
          <Text fontSize="2xl" fontWeight="bold" color={color}>
            Change Your Password
          </Text>
          <Text fontSize="md" color="gray.500" mt={1}>
            Keep your account secure by updating your password regularly.
          </Text>
        </CardHeader>

        <Formik
          initialValues={{
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
          }}
          validationSchema={changePasswordSchema}
          onSubmit={async (values, actions) => {
            try {
              await dispatch(changePassword(values)).unwrap()
              toast.success("Password changed successfully")
              actions.resetForm()
            } catch (error) {
              console.error("Change password error:", error)
              toast.error("Failed to change password")
            } finally {
              actions.setSubmitting(false)
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form style={{ width: "100%" }}>
              <CardBody p={{ base: 6, md: 8 }}>
                <VStack spacing={4} width="100%" align="stretch">
                  <Field name="currentPassword">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.currentPassword &&
                          form.touched.currentPassword
                        }
                      >
                        <FormLabel>Current Password</FormLabel>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Enter current password"
                          w="100%"
                        />
                        <FormErrorMessage>
                          {form.errors.currentPassword}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="newPassword">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.newPassword && form.touched.newPassword
                        }
                      >
                        <FormLabel>New Password</FormLabel>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Enter new password"
                          w="100%"
                        />
                        <FormErrorMessage>
                          {form.errors.newPassword}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="confirmPassword">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.confirmPassword &&
                          form.touched.confirmPassword
                        }
                      >
                        <FormLabel>Confirm New Password</FormLabel>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Confirm new password"
                          w="100%"
                        />
                        <FormErrorMessage>
                          {form.errors.confirmPassword}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </VStack>
              </CardBody>

              <CardFooter>
                <HStack spacing={4} w="100%" justify="flex-end">
                  <Button variant="outline" onClick={() => navigate('/profile')} >Cancel</Button>
                  <Button
                    type="submit"
                    variant="solid"
                    colorScheme="blue"
                    isLoading={isSubmitting}
                  >
                    Change Password
                  </Button>
                </HStack>
              </CardFooter>
            </Form>
          )}
        </Formik>
      </Card>
    </Box>
  )
}

export default ChangePassword
