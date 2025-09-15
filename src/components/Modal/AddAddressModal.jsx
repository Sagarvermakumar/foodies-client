import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  SimpleGrid,
  Textarea
} from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import { debounce } from 'lodash'
import { useCallback } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useBrandColors } from '../../hooks/useBrandColors'
import { useGeolocation } from '../../hooks/useGeolocation'
import { makeLoadingSelector } from '../../store/selectors/address.selector'
import { createAddress, getLocationByPincode, updateAddress } from '../../store/slices/addressSlice'
import { addressValidationSchema } from '../../utils/validationSchemas'
// import { } from '../../se '
const AddAddressModal = ({
  setEditingAddress,
  isOpen,
  onClose,
  editingAddress,
}) => {


  const { bg, color } = useBrandColors()
  const { coordinates } = useGeolocation();
  const pinAddress = useSelector(state => state.address.addressFromPin);
  const dispatch = useDispatch()
  const isCreatingAddress = useSelector(makeLoadingSelector('add'))
  const isUpdatingAddress = useSelector(makeLoadingSelector('update'))



  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl" isCentered >
      <ModalOverlay backdropFilter="blur(5px)" />
      <ModalContent
        bg={bg}
        color={color}
        p={4}
        backdropFilter="blur(4px)"
        boxShadow="0 0 20px 4px rgba(255, 255, 255, 0.2)"
        border="1px solid rgba(255, 255, 255, 0.1)"
      >
        <ModalHeader color="brand.primary">
          {editingAddress !== null ? 'Edit Address' : 'Add New Address'}
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              label: editingAddress?.label || 'Home',
              addressLine: editingAddress?.addressLine || '',
              street: editingAddress?.street || '',
              landmark: editingAddress?.landmark || '',
              city: editingAddress?.city || pinAddress.city || '',
              state: editingAddress?.state || pinAddress.state || '',
              pinCode: editingAddress?.pinCode || '',
              country: editingAddress?.country || 'India',
              location: editingAddress?.location || { type: 'Point', coordinates },
              contactName: editingAddress?.contactName || '',
              contactPhone: editingAddress?.contactPhone || '',
              instructions: editingAddress?.instructions || '',
            }}
            validationSchema={addressValidationSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              try {
                if (editingAddress) {
                  console.log("Updaig values : ", values)
                  await dispatch(
                    updateAddress({ id: editingAddress._id, ...values })
                  ).unwrap()
                  toast.success('Address updated successfully')
                } else {
                  console.log("Creating values : ", values)
                  await dispatch(createAddress(values)).unwrap()
                  toast.success('Address added successfully')
                }
                onClose()
                resetForm()
                setEditingAddress(null)
              } catch (error) {
                console.log('Error occurred : ', error)
                toast.error('Failed to save address')
              } finally {
                setSubmitting(false)

              }
            }
            }
            enableReinitialize={true}
          >
            {({ setFieldValue }) => (
              <Form id="address-form">
                <SimpleGrid columns={[1, 1, 2, 3]} spacing={{ base: 6, md: 8 }} align="stretch">

                  {/* Label */}
                  <Field name="label">
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.label && form.touched.label}>
                        <FormLabel>Address Label</FormLabel>
                        <Select {...field} bg={bg}>
                          {['Home', 'Work', 'Other'].map((lab) => (
                            <option key={lab} value={lab}>{lab}</option>
                          ))}
                        </Select>
                        <FormErrorMessage>{form.errors.label}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  {/* Address Line */}
                  <Field name="addressLine">
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.addressLine && form.touched.addressLine}>
                        <FormLabel>Address Line</FormLabel>
                        <Input {...field} placeholder="Flat / Building / Society" />
                        <FormErrorMessage>{form.errors.addressLine}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  {/* Street */}
                  <Field name="street">
                    {({ field }) => (
                      <FormControl>
                        <FormLabel>Street</FormLabel>
                        <Input {...field} placeholder="Street name" />
                      </FormControl>
                    )}
                  </Field>

                  {/* Landmark */}
                  <Field name="landmark">
                    {({ field }) => (
                      <FormControl>
                        <FormLabel>Landmark</FormLabel>
                        <Input {...field} placeholder="Nearby landmark" />
                      </FormControl>
                    )}
                  </Field>
                  {/* Pin Code */}

                  <Field name="pinCode">
                    {({ field, form }) => {
                      // Debounce function
                      const handlePincodeChange = useCallback(
                        debounce((value) => {
                          if (value.length === 6) {
                            setFieldValue("pinCode", value);
                            dispatch(getLocationByPincode(value));
                          }
                        }, 500),
                        []
                      );

                      return (
                        <FormControl isInvalid={form.errors.pinCode && form.touched.pinCode}>
                          <FormLabel>Pin Code</FormLabel>
                          <Input
                            {...field}
                            placeholder="6-digit PIN"
                            onChange={(e) => {
                              const { value } = e.target;
                              form.setFieldValue("pinCode", value); // Formik state update
                              handlePincodeChange(value);           // Debounced dispatch
                            }}
                          />
                          <FormErrorMessage>{form.errors.pinCode}</FormErrorMessage>
                        </FormControl>
                      );
                    }}
                  </Field>

                  {/* City */}
                  <Field name="city">
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.city && form.touched.city}>
                        <FormLabel>City</FormLabel>
                        <Input {...field} placeholder="City" />
                        <FormErrorMessage>{form.errors.city}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  {/* State */}
                  <Field name="state">
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.state && form.touched.state}>
                        <FormLabel>State</FormLabel>
                        <Input {...field} placeholder="State" />
                        <FormErrorMessage>{form.errors.state}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>



                  {/* Country */}
                  <Field name="country">
                    {({ field }) => (
                      <FormControl>
                        <FormLabel>Country</FormLabel>
                        <Input {...field} disabled />
                      </FormControl>
                    )}
                  </Field>

                  {/* Contact Name */}
                  <Field name="contactName">
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.contactName && form.touched.contactName}>
                        <FormLabel>Contact Name</FormLabel>
                        <Input {...field} placeholder="Person receiving order" />
                        <FormErrorMessage>{form.errors.contactName}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  {/* Contact Phone */}
                  <Field name="contactPhone">
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.contactPhone && form.touched.contactPhone}>
                        <FormLabel>Contact Phone</FormLabel>
                        <Input {...field} placeholder="10-digit phone" />
                        <FormErrorMessage>{form.errors.contactPhone}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  {/* Instructions */}
                  <Field name="instructions">
                    {({ field }) => (
                      <FormControl>
                        <FormLabel>Delivery Instructions</FormLabel>
                        <Textarea {...field} placeholder="E.g., Ring the bell twice" />
                      </FormControl>
                    )}
                  </Field>



                </SimpleGrid>
              </Form>
            )}
          </Formik>

        </ModalBody>
        <ModalFooter mt={4} >
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="red"
            type="submit"
            form="address-form"
            isLoading={editingAddress ? isUpdatingAddress : isCreatingAddress}
            loadingText={editingAddress ? "Updating..." : "Creating..."}

          >
            {editingAddress ? 'Update Address' : 'Add Address'}
          </Button>

        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default AddAddressModal
