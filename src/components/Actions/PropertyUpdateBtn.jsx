'use client'
import { Button, FieldError, Input, Label, ListBox, Modal, Select, Surface, TextArea, TextField } from "@heroui/react";
import toast from "react-hot-toast";
import { GrDocumentUpdate } from "react-icons/gr";

const PropertyUpdateBtn = ({ PropertyData: property }) => {

    const UpdateInfo = async (event) => {
        const LoadingToast = toast.loading('Processing your request...');
        event.preventDefault();

        const title = event.target.title.value;
        const location = event.target.location.value;
        const propertyType = event.target.propertyType.value;
        const rentPrice = Number(event.target.rentPrice.value);
        const rentType = event.target.rentType.value;
        const size = Number(event.target.size.value);
        const bedrooms = Number(event.target.bedrooms.value);
        const bathrooms = Number(event.target.bathrooms.value);
        const description = event.target.description.value;

        const propertyData = {
            title: title,
            location: location,
            propertyType: propertyType,
            rentPrice: rentPrice,
            rentType: rentType,
            size: size,
            bedrooms: bedrooms,
            bathrooms: bathrooms,
            description: description,

            // TODO
            // status: "Pending",
            // rejectionFeedback: ""
        };

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/all-properties/${property?._id}`,
                {
                    method: "PATCH",
                    headers: {
                        "content-type": "application/json",
                    },

                    body: JSON.stringify(propertyData)
                });

            if (res.ok == true) {
                toast.success('Property data updated successfully!', {
                    id: LoadingToast
                });
                window.location.reload();
            }

            else {
                toast.error('Something went wrong! Try again.', {
                    id: LoadingToast
                });
            };
        } catch (error) {
            toast.error('An error occurred. Please try again.', {
                id: LoadingToast
            });
        }
    }

    return (
        <div>
            <Modal>
                <Button variant="ghost" className="hover:text-[#3498db] font-bold">
                    Update<GrDocumentUpdate />
                </Button>
                <Modal.Backdrop>
                    <Modal.Container placement="auto">
                        <Modal.Dialog className="sm:max-w-xl mt-50">
                            <Modal.CloseTrigger />
                            <Modal.Header>
                                <Modal.Heading>Update Property Info</Modal.Heading>
                            </Modal.Header>
                            <Modal.Body>
                                <Surface variant="default">
                                    <form onSubmit={UpdateInfo}
                                        className="p-5 space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                                            {/* Property Title */}
                                            <div className="md:col-span-2">
                                                <TextField
                                                    defaultValue={property?.title}
                                                    name="title"
                                                    isRequired>
                                                    <Label>Property Title</Label>
                                                    <Input
                                                        type="text"
                                                        maxLength={30}
                                                        placeholder="Enter property title"
                                                        className="rounded-2xl"
                                                    />
                                                    <FieldError />
                                                </TextField>
                                            </div>

                                            {/* Location */}
                                            <TextField
                                                defaultValue={property?.location}
                                                name="location"
                                                isRequired>
                                                <Label>Location</Label>
                                                <Input
                                                    type="text"
                                                    maxLength={30}
                                                    placeholder="e.g. Dhaka"
                                                    className="rounded-2xl"
                                                />
                                                <FieldError />
                                            </TextField>

                                            {/* Property Type */}
                                            <div>
                                                <Select
                                                    defaultValue={property?.propertyType}
                                                    name="propertyType"
                                                    isRequired
                                                    className="w-full"
                                                    placeholder="Select a property type"
                                                >
                                                    <Label>Property Type</Label>
                                                    <Select.Trigger className="rounded-2xl">
                                                        <Select.Value />
                                                        <Select.Indicator />
                                                    </Select.Trigger>
                                                    <Select.Popover>
                                                        <ListBox>

                                                            <ListBox.Item id="Apartment" textValue="Apartment">
                                                                Apartment
                                                                <ListBox.ItemIndicator />
                                                            </ListBox.Item>

                                                            <ListBox.Item id="House" textValue="House">
                                                                House
                                                                <ListBox.ItemIndicator />
                                                            </ListBox.Item>

                                                            <ListBox.Item id="Room" textValue="Room">
                                                                Room
                                                                <ListBox.ItemIndicator />
                                                            </ListBox.Item>

                                                            <ListBox.Item id="Studio" textValue="Studio">
                                                                Studio
                                                                <ListBox.ItemIndicator />
                                                            </ListBox.Item>

                                                            <ListBox.Item id="Commercial" textValue="Commercial">
                                                                Commercial
                                                                <ListBox.ItemIndicator />
                                                            </ListBox.Item>

                                                        </ListBox>
                                                    </Select.Popover>
                                                    <FieldError />
                                                </Select>
                                            </div>

                                            {/* Rent Price */}
                                            <TextField
                                                defaultValue={property?.rentPrice}
                                                name="rentPrice"
                                                type="number"
                                                isRequired>
                                                <Label>Rent Price ($)</Label>
                                                <Input
                                                    min={1}
                                                    max={100000000}
                                                    type="number"
                                                    placeholder="Enter rent price"
                                                    className="rounded-2xl"
                                                />
                                                <FieldError />
                                            </TextField>

                                            {/* Rent Type */}
                                            <div>
                                                <Select
                                                    defaultValue={property?.rentType}
                                                    name="rentType"
                                                    isRequired
                                                    className="w-full"
                                                    placeholder="Select rent type"
                                                >
                                                    <Label>Rent Type</Label>
                                                    <Select.Trigger className="rounded-2xl">
                                                        <Select.Value />
                                                        <Select.Indicator />
                                                    </Select.Trigger>
                                                    <Select.Popover>
                                                        <ListBox>

                                                            <ListBox.Item id="Monthly" textValue="Monthly">
                                                                Monthly
                                                                <ListBox.ItemIndicator />
                                                            </ListBox.Item>

                                                            <ListBox.Item id="Weekly" textValue="Weekly">
                                                                Weekly
                                                                <ListBox.ItemIndicator />
                                                            </ListBox.Item>

                                                            <ListBox.Item id="Daily" textValue="Daily">
                                                                Daily
                                                                <ListBox.ItemIndicator />
                                                            </ListBox.Item>

                                                        </ListBox>
                                                    </Select.Popover>
                                                    <FieldError />
                                                </Select>
                                            </div>

                                            {/* Size */}
                                            <TextField
                                                defaultValue={property?.size}
                                                name="size"
                                                type="number"
                                                isRequired>
                                                <Label>Size (sqft)</Label>
                                                <Input
                                                    min={1}
                                                    max={100000000}
                                                    type="number"
                                                    placeholder="Enter property size"
                                                    className="rounded-2xl"
                                                />
                                                <FieldError />
                                            </TextField>

                                            {/* Bedrooms and Bathrooms */}
                                            <div className="grid grid-cols-2 gap-4">
                                                <TextField
                                                    defaultValue={property?.bedrooms}
                                                    name="bedrooms"
                                                    type="number"
                                                    isRequired>
                                                    <Label>Bedrooms</Label>
                                                    <Input
                                                        min={1}
                                                        max={1000}
                                                        type="number"
                                                        placeholder="Beds"
                                                        className="rounded-2xl"
                                                    />
                                                    <FieldError />
                                                </TextField>

                                                <TextField
                                                    defaultValue={property?.bathrooms}
                                                    name="bathrooms"
                                                    type="number"
                                                    isRequired>
                                                    <Label>Bathrooms</Label>
                                                    <Input
                                                        min={1}
                                                        max={1000}
                                                        type="number"
                                                        placeholder="Baths"
                                                        className="rounded-2xl"
                                                    />
                                                    <FieldError />
                                                </TextField>
                                            </div>

                                            {/* Description */}
                                            <div className="md:col-span-2">
                                                <TextField
                                                    defaultValue={property?.description}
                                                    name="description"
                                                    isRequired>
                                                    <Label>Description</Label>
                                                    <TextArea
                                                        maxLength={200}
                                                        placeholder="Write details about the property..."
                                                        className="rounded-3xl"
                                                    />
                                                    <FieldError />
                                                </TextField>
                                            </div>
                                        </div>

                                        <Modal.Footer>
                                            <Button type="submit" className="btn btn-sm flex gap-2 items-center justify-start font-bold text-white bg-linear-to-r from-[#0a3d62] to-[#3498db]">Update</Button>
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

export default PropertyUpdateBtn;