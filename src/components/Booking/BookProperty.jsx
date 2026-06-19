"use client"
import { authClient } from "@/lib/auth-client";
import { Modal, Surface, Label, FieldError, Button, TextArea, TextField, Input } from "@heroui/react";
import { Calendar } from "lucide-react";
import toast from "react-hot-toast";

const BookProperty = ({ propertyId, propertyName, ownerName, ownerEmail, ownerId }) => {

    const { data: session } = authClient.useSession();
    const user = session?.user;

    const Booking = async (event) => {
        event.preventDefault();
        const LoadingToast = toast.loading('Processing your request...');

        if (!user) {
            toast.error('Please login and try again.', {
                id: LoadingToast
            });
            return;
        };


        const Data = {
            //  Booking data
            bookingDate: new Date(),
            bookingStatus: 'Pending',  //            Pending (initial),  Approved,  Rejected 
            transactionId: '',         // <---  ⚠️
            amountPaid: '',            // <---  ⚠️
            paymentStatus: 'Paid',     //            Paid, UnPaid


            //  Property Info
            propertyId: propertyId,
            propertyName: propertyName,


            //  Owner Info 
            ownerName: ownerName,
            ownerEmail: ownerEmail,
            ownerId: ownerId,


            //  Login Tenant Info
            tenantId: user?.id,
            tenantName: user?.name,
            tenantEmail: user?.email,


            //  Form data & user info
            moveInDate: event.target.moveInDate.value,
            contactNumber: event.target.contactNumber.value,
            userName: event.target.userName.value,
            userEmail: event.target.userEmail.value,
            additionalNotes: event.target.additionalNotes.value,
        };

        // console.log(Data)

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/all-bookings`, {
            method: "POST",
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(Data),
        });

        if (res.ok == true) {
            toast.success('Booking successful.', {
                id: LoadingToast
            });

            setTimeout(() => {
                window.location.reload();
            }, 2300);
        }
        else {
            toast.error('Something went wrong! Try again.', {
                id: LoadingToast
            });
        };
    };

    return (
        <div>
            <Modal>
                <Button className='w-full h-full py-3.5 px-6 rounded-xl font-bold bg-linear-to-r from-[#0a3d62] to-[#3498db]'>
                    <Calendar className="w-5 h-5" />Book Property
                </Button>

                <Modal.Backdrop>
                    <Modal.Container placement="auto">
                        <Modal.Dialog className="sm:max-w-xl mt-50">
                            <Modal.CloseTrigger />
                            <Modal.Header>
                                <Modal.Heading>Booking Info</Modal.Heading>
                            </Modal.Header>
                            <Modal.Body>
                                <Surface variant="default">
                                    <form onSubmit={Booking}
                                        className="p-5 space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                                            {/* Move-In Date */}
                                            <TextField
                                                name="moveInDate"
                                                isRequired>
                                                <Label>Move-In Date</Label>
                                                <Input
                                                    type="date"
                                                    placeholder="Move In Date"
                                                    className="rounded-2xl"
                                                />
                                                <FieldError />
                                            </TextField>


                                            {/* Contact Number */}
                                            <TextField
                                                name="contactNumber"
                                                type="tel"
                                                isRequired>
                                                <Label>Contact Number</Label>
                                                <Input
                                                    type="tel"
                                                    placeholder="Enter your contact Number"
                                                    className="rounded-2xl"
                                                />
                                                <FieldError />
                                            </TextField>


                                            {/* User Name */}
                                            <div className="md:col-span-2">
                                                <TextField
                                                    name="userName"
                                                    type="text"
                                                    isRequired>
                                                    <Label>Name</Label>
                                                    <Input
                                                        type="text"
                                                        placeholder="Enter your Name"
                                                        className="rounded-2xl"
                                                    />
                                                    <FieldError />
                                                </TextField>
                                            </div>


                                            {/* User Email */}
                                            <div className="md:col-span-2">
                                                <TextField
                                                    isRequired
                                                    name="userEmail"
                                                    type="email"
                                                    validate={(value) => {
                                                        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                                            return "Please enter a valid email address";
                                                        }
                                                        return null;
                                                    }}
                                                >
                                                    <Label>Email</Label>
                                                    <Input placeholder="Enter your Email" autoComplete="email" />
                                                    <FieldError />
                                                </TextField>
                                            </div>


                                            {/* Additional Notes */}
                                            <div className="md:col-span-2">
                                                <TextField
                                                    name="additionalNotes"
                                                    isRequired>
                                                    <Label>Additional Notes</Label>
                                                    <TextArea
                                                        placeholder="Additional Notes"
                                                        className="rounded-xl"
                                                    />
                                                    <FieldError />
                                                </TextField>
                                            </div>
                                        </div>

                                        <Modal.Footer>
                                            <Button type="submit" className="btn btn-[15px] flex gap-2  items-center justify-start font-bold text-white bg-linear-to-r from-[#0D0D33] to-[#0033FF]">Book Now</Button>
                                        </Modal.Footer>
                                    </form>
                                </Surface>
                            </Modal.Body>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>
        </div>
    );
};

export default BookProperty;