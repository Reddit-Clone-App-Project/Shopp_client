import React, { useState } from "react";
import LandingForm from "../features/CreateStore/LandingForm";
import Form1 from "../features/CreateStore/Form1";
import { AddressFormData } from "../features/CreateStore/AddAddressModal";

const CreateStorePage = () => {
    const [step, SetStep] = useState(1);

    const [storeData, setStoreData] = useState({
        storeName: "",
        address: null as AddressFormData | null,
        // altri campi se servono
    });

    const handleFinalSubmit = () => {
        console.log("Dati da inviare:", storeData);
        // qui puoi eseguire la POST all'API
    };

    const goNext = () => SetStep(prev => prev + 1);
    const goBack = () => SetStep(prev => prev - 1);

    return (
        <form>
            {step === 1 && <LandingForm onNext={goNext} />}
            {step === 2 && <Form1 data={storeData} onChange={setStoreData} onSubmit={handleFinalSubmit} />}
        </form>
    );
};

export default CreateStorePage;