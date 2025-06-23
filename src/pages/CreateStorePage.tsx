import React, { useState } from "react";
import LandingForm from "../features/CreateStore/LandingForm";
import Form1 from "../features/CreateStore/Form1";
import Form2 from "../features/CreateStore/Form2";
import { AddressFormData } from "../features/CreateStore/AddAddressModal";

const CreateStorePage = () => {
    const [step, SetStep] = useState(1);

    const [storeData, setStoreData] = useState({
        storeName: '',
        storeEmail: '',
        storePhone: '',
        address: null as AddressFormData | null,
        // more if needed
    });

    const handleFinalSubmit = () => {
        console.log("Dati da inviare:", storeData);
        // POST API
    };

    const goNext = () => SetStep(prev => prev + 1);
    const goBack = () => SetStep(prev => prev - 1);

    return (
        <form>
            {step === 1 && <LandingForm onNext={goNext} />}
            {step === 2 && <Form1 data={storeData} onChange={setStoreData} onNext={goNext}/>}
            {step === 3 && <Form2 data={storeData} onChange={setStoreData} onNext={goNext} onBack={goBack}/>}
        </form>
    );
};

export default CreateStorePage;

// onSubmit handleFinalSubmit